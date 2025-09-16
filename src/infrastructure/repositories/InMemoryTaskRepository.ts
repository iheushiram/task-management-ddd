import type { TaskRepository } from "../../domain/task/TaskRepository"
import { Task } from "../../domain/task/Task"
import { TaskId } from "../../domain/task/TaskId"
import { ProjectId } from "../../domain/project/ProjectId"
import { UserId } from "../../domain/user/UserId"

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Map<string, Task> = new Map()

  async findById(id: TaskId): Promise<Task | null> {
    return this.tasks.get(id.getValue()) || null
  }

  async findAll(): Promise<Task[]> {
    return Array.from(this.tasks.values())
  }

  async findByProjectId(projectId: ProjectId): Promise<Task[]> {
    // 実際の実装では、TaskとProjectの関連を適切に管理する必要があります
    return Array.from(this.tasks.values()).filter((task) => {
      // ここはプロジェクトとタスクの関連を確認するロジックが必要
      return true
    })
  }

  async findByAssigneeId(assigneeId: UserId): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter((task) =>
      task.getAssigneeId().equals(assigneeId),
    )
  }

  async save(task: Task): Promise<void> {
    this.tasks.set(task.getId().getValue(), task)
  }

  async delete(id: TaskId): Promise<void> {
    this.tasks.delete(id.getValue())
  }
}
