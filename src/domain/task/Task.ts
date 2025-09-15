import { TaskId } from "./TaskId"
import { TaskTitle } from "./TaskTitle"
import { TaskStatus } from "./TaskStatus"
import { Priority } from "./Priority"
import { UserId } from "../user/UserId"

export class Task {
  private constructor(
    private readonly id: TaskId,
    private title: TaskTitle,
    private status: TaskStatus,
    private priority: Priority,
    private readonly assigneeId: UserId,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private dueDate?: Date,
  ) {}

  static create(
    title: TaskTitle,
    assigneeId: UserId,
    priority: Priority = Priority.medium(),
    dueDate?: Date,
  ): Task {
    const now = new Date()
    return new Task(
      TaskId.generate(),
      title,
      TaskStatus.todo(),
      priority,
      assigneeId,
      now,
      now,
      dueDate,
    )
  }

  // factory method
  static reconstruct(
    id: TaskId,
    title: TaskTitle,
    status: TaskStatus,
    priority: Priority,
    assigneeId: UserId,
    createdAt: Date,
    updatedAt: Date,
    dueDate?: Date,
  ): Task {
    return new Task(
      id,
      title,
      status,
      priority,
      assigneeId,
      createdAt,
      updatedAt,
      dueDate,
    )
  }

  // ドメインロジック
  changeTitle(newTitle: TaskTitle): void {
    this.title = newTitle
    this.updatedAt = new Date()
  }

  changeStatus(newStatus: TaskStatus): void {
    if (!this.status.canTransitionTodo(newStatus)) {
      throw new Error(
        `Cannot transition from ${this.status.getValue()} to ${newStatus.getValue()}`,
      )
    }
    this.status = newStatus
    this.updatedAt = new Date()
  }

  changePriority(newPriority: Priority): void {
    this.priority = newPriority
    this.updatedAt = new Date()
  }

  changeDueDate(newDueDate?: Date): void {
    this.dueDate = newDueDate
    this.updatedAt = new Date()
  }

  // ビジネスルール：期限切れかどうかの判断
  isOverdue(): boolean {
    if (!this.dueDate) return false
    return new Date() > this.dueDate && !this.status.equals(TaskStatus.done())
  }

  // getter
  getId(): TaskId {
    return this.id
  }
  getTitle(): TaskTitle {
    return this.title
  }
  getStatus(): TaskStatus {
    return this.status
  }
  getPriority(): Priority {
    return this.priority
  }
  getAssigneeId(): UserId {
    return this.assigneeId
  }
  getCreatedAt(): Date {
    return this.createdAt
  }
  getUpdatedAt(): Date {
    return this.updatedAt
  }
  getDueDate(): Date | undefined {
    return this.dueDate
  }
}
