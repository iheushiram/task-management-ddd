import type { TaskRepository } from "../../domain/task/TaskRepository"
import type { Task } from "../../domain/task/Task"

export class ListTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return this.taskRepository.findAll()
  }
}
