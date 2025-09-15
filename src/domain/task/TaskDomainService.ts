import { Task } from "./Task"
import { Project } from "../project/Project"
import { UserId } from "../user/UserId"
import type { TaskRepository } from "./TaskRepository"

export class TaskDomainService {
  constructor(private taskRepository: TaskRepository) {}

  // ビジネスルール：プロジェクトメンバーのみがタスクを作成できる
  async canUserCreateTaskInProject(
    userId: UserId,
    project: Project,
  ): Promise<boolean> {
    return project.isMember(userId)
  }

  // ビジネスルール：ユーザがタスクを編集できるかの判定
  canUserEditTask(userId: UserId, task: Task, project: Project): boolean {
    // タスクの担当またはプロジェクトオーナーのみ編集可能
    return task.getAssigneeId().equals(userId) || project.isOwner(userId)
  }

  // 複雑なビジネスロジック：優先度の高いタスクを取得
  async getHighPriorityOverdueTasks(project: Project): Promise<Task[]> {
    const tasks = await this.taskRepository.findByProjectId(project.getId())
    return tasks.filter(
      (task) => task.isOverdue() && task.getPriority().getValue() === "HIGH",
    )
  }
}
