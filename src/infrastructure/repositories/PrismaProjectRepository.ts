import { PrismaClient } from "../../../node_modules/.prisma/client/index"
import type { ProjectRepository } from "../../domain/project/ProjectRepository"
import { Project } from "../../domain/project/Project"
import { ProjectId } from "../../domain/project/ProjectId"
import { ProjectName } from "../../domain/project/ProjectName"
import { UserId } from "../../domain/user/UserId"
import { TaskId } from "../../domain/task/TaskId"

export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: ProjectId): Promise<Project | null> {
    try {
      const projectRecord = await this.prisma.project.findUnique({
        where: { id: id.getValue() },
        include: {
          members: {
            select: { userId: true },
          },
          tasks: {
            select: { id: true },
          },
        },
      })

      if (!projectRecord) {
        return null
      }

      return this.toDomainModel(projectRecord)
    } catch (error) {
      throw new Error(`Failed to find project by id: ${error}`)
    }
  }

  async findByOwnerId(ownerId: UserId): Promise<Project[]> {
    try {
      const projectRecords = await this.prisma.project.findMany({
        where: { ownerId: ownerId.getValue() },
        include: {
          members: {
            select: { userId: true },
          },
          tasks: {
            select: { id: true },
          },
        },
      })

      return projectRecords.map((record) => this.toDomainModel(record))
    } catch (error) {
      throw new Error(`Failed to find projects by owner id: ${error}`)
    }
  }

  async findByMemberId(memberId: UserId): Promise<Project[]> {
    try {
      const projectRecords = await this.prisma.project.findMany({
        where: {
          members: {
            some: {
              userId: memberId.getValue(),
            },
          },
        },
        include: {
          members: {
            select: { userId: true },
          },
          tasks: {
            select: { id: true },
          },
        },
      })

      return projectRecords.map((record) => this.toDomainModel(record))
    } catch (error) {
      throw new Error(`Failed to find projects by member id: ${error}`)
    }
  }

  async save(project: Project): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        // プロジェクトの基本情報をupsert
        await tx.project.upsert({
          where: { id: project.getId().getValue() },
          create: {
            id: project.getId().getValue(),
            name: project.getName().getValue(),
            ownerId: project.getOwnerId().getValue(),
            createdAt: project.getCreatedAt(),
            updatedAt: project.getUpdatedAt(),
          },
          update: {
            name: project.getName().getValue(),
            updatedAt: project.getUpdatedAt(),
          },
        })

        // 既存のメンバーシップを削除
        await tx.projectMember.deleteMany({
          where: { projectId: project.getId().getValue() },
        })

        // 新しいメンバーシップを作成
        const memberData = project.getMemberIds().map((memberId) => ({
          projectId: project.getId().getValue(),
          userId: memberId.getValue(),
        }))

        if (memberData.length > 0) {
          await tx.projectMember.createMany({
            data: memberData,
          })
        }

        // タスクの関連付けはTaskエンティティ側で管理するため、
        // ここではproject_idの更新のみ行う
        const currentTaskIds = project.getTaskIds().map((id) => id.getValue())

        // 既存のタスクからプロジェクトIDを削除
        await tx.task.updateMany({
          where: {
            projectId: project.getId().getValue(),
            id: {
              notIn: currentTaskIds,
            },
          },
          data: {
            projectId: null,
          },
        })

        // 新しいタスクにプロジェクトIDを設定
        if (currentTaskIds.length > 0) {
          await tx.task.updateMany({
            where: {
              id: {
                in: currentTaskIds,
              },
            },
            data: {
              projectId: project.getId().getValue(),
            },
          })
        }
      })
    } catch (error) {
      throw new Error(`Failed to save project: ${error}`)
    }
  }

  async delete(id: ProjectId): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        // 関連するタスクのプロジェクトIDをnullに設定
        await tx.task.updateMany({
          where: { projectId: id.getValue() },
          data: { projectId: null },
        })

        // プロジェクトメンバーの削除（CASCADE設定により自動削除されるが明示的に実行
        await tx.projectMember.deleteMany({
          where: { projectId: id.getValue() },
        })

        // プロジェクトの削除
        await tx.project.delete({
          where: { id: id.getValue() },
        })
      })
    } catch (error) {
      throw new Error(`Failed to delete project: ${error}`)
    }
  }

  private toDomainModel(record: any): Project {
    const memberIds = record.members.map(
      (member: any) => new UserId(member.userId),
    )
    const taskIds = record.tasks.map((task: any) => new TaskId(task.id))

    return Project.reconstruct(
      new ProjectId(record.id),
      new ProjectName(record.name),
      new UserId(record.ownerId),
      memberIds,
      taskIds,
      record.createdAt,
      record.updatedAt,
    )
  }
}
