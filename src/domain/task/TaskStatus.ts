import { ValueObject } from "../shared/ValueObject"

export type TaskStatusType = "TODO" | "IN_PROGRESS" | "DONE"

export class TaskStatus extends ValueObject<TaskStatusType> {
  protected validate(value: TaskStatusType): void {
    const validStatuses: TaskStatusType[] = ["TODO", "IN_PROGRESS", "DONE"]
    if (!validStatuses.includes(value)) {
      throw new Error("Invalid task status")
    }
  }

  static todo(): TaskStatus {
    return new TaskStatus("TODO")
  }

  static inProgress(): TaskStatus {
    return new TaskStatus("IN_PROGRESS")
  }

  static done(): TaskStatus {
    return new TaskStatus("DONE")
  }

  canTransitionTodo(newStatus: TaskStatus): boolean {
    const currentStatus = this.getValue()
    const targetStatus = newStatus.getValue()

    // ビジネスルール：ステータス遷移のルール
    if (currentStatus === "TODO") {
      return targetStatus === "IN_PROGRESS"
    }
    if (currentStatus === "IN_PROGRESS") {
      return targetStatus === "DONE" || targetStatus === "TODO"
    }
    if (currentStatus === "DONE") {
      return targetStatus === "IN_PROGRESS"
    }
    return false
  }
}
