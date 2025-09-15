import type { TaskRepository } from "../../domain/task/TaskRepository"
import { TaskId } from "../../domain/task/TaskId"
import { TaskStatus, type TaskStatusType } from "../../domain/task/TaskStatus"
import { UserId } from "../../domain/user/UserId"

export interface UpdateTaskStatusCommand {
  taskId: string
  status: TaskStatusType
  userId: string
}

export class UpdateTaskStatuUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(command: UpdateTaskStatusCommand): Promise<void> {
    const taskId = new TaskId(command.taskId)
    const newStatus = new TaskStatus(command.status)
    const userId = new UserId(command.userId)

    const task = await this.taskRepository.findById(taskId)
    if (!task) {
      throw new Error("Task not found")
    }

    // 権限確認（簡略化 - 実際はドメインサービスで行う）
    if (!task.getAssigneeId().equals(userId)) {
      throw new Error("Only the assignee can change task status")
    }

    // ステータスの変更
    task.changeStatus(newStatus)

    // 永続化
    await this.taskRepository.save(task)
  }
}
