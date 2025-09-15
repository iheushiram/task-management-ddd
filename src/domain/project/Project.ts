import { ProjectId } from "./ProjectId"
import { ProjectName } from "./ProjectName"
import { UserId } from "../user/UserId"
import { Task } from "../task/Task"
import { TaskId } from "../task/TaskId"

export class Project {
  private constructor(
    private readonly id: ProjectId,
    private name: ProjectName,
    private readonly ownerId: UserId,
    private readonly memberIds: Set<UserId>,
    private readonly taskIds: Set<TaskId>,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(name: ProjectName, ownerId: UserId): Project {
    const now = new Date()
    const memberIds = new Set<UserId>()
    memberIds.add(ownerId) // オーナーは自動的にメンバーになる

    return new Project(
      ProjectId.generate(),
      name,
      ownerId,
      memberIds,
      new Set<TaskId>(),
      now,
      now,
    )
  }

  // factory method
  static reconstruct(
    id: ProjectId,
    name: ProjectName,
    ownerId: UserId,
    memberIds: UserId[],
    taskIds: TaskId[],
    createdAt: Date,
    updatedAt: Date,
  ): Project {
    return new Project(
      id,
      name,
      ownerId,
      new Set(memberIds),
      new Set(taskIds),
      createdAt,
      updatedAt,
    )
  }

  // domain logic
  changeName(newName: ProjectName): void {
    this.name = newName
    this.updatedAt = new Date()
  }

  addMember(memberId: UserId): void {
    if (this.memberIds.has(memberId)) {
      throw new Error("User is already a member of project")
    }
    this.memberIds.add(memberId)
    this.updatedAt = new Date()
  }

  removeMember(memberId: UserId): void {
    if (memberId.equals(this.ownerId)) {
      throw new Error("Cannot remove project owner")
    }
    if (this.memberIds.has(memberId)) {
      throw new Error("User is not a member of this project")
    }
    this.memberIds.delete(memberId)
    this.updatedAt = new Date()
  }

  addTask(taskId: TaskId): void {
    this.taskIds.add(taskId)
    this.updatedAt = new Date()
  }

  removeTask(taskId: TaskId): void {
    this.taskIds.delete(taskId)
    this.updatedAt = new Date()
  }

  // ビジネスルール：メンバーかどうかの確認
  isMember(userId: UserId): boolean {
    return this.memberIds.has(userId)
  }

  isOwner(userId: UserId): boolean {
    return this.ownerId.equals(userId)
  }

  // getter
  getId(): ProjectId {
    return this.id
  }
  getName(): ProjectName {
    return this.name
  }
  getOwnerId(): UserId {
    return this.ownerId
  }
  getMemberIds(): UserId[] {
    return Array.from(this.memberIds)
  }
  getTaskIds(): TaskId[] {
    return Array.from(this.taskIds)
  }
  getCreatedAt(): Date {
    return this.createdAt
  }
  getUpdatedAt(): Date {
    return this.updatedAt
  }
}
