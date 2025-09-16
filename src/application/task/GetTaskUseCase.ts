import type { TaskRepository } from "../../domain/task/TaskRepository"
import type { Task } from "../../domain/task/Task"
import { TaskId } from "../../domain/task/TaskId"

export class GetTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findById(new TaskId(taskId))
    if (!task) {
      throw new Error("Task not found")
    }
    return task
  }
}
