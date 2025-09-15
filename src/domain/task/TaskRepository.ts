import { Task } from "./Task"
import { TaskId } from "./TaskId"
import { ProjectId } from "../project/ProjectId"
import { UserId } from "../user/UserId"

export interface TaskRepository {
  findById(id: TaskId): Promise<Task | null>
  findByProjectId(projectId: ProjectId): Promise<Task[]>
  findByAssigneeId(assigneeId: UserId): Promise<Task[]>
  save(task: Task): Promise<void>
  delete(id: TaskId): Promise<void>
}
