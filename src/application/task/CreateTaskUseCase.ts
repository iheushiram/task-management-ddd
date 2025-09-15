import type { TaskRepository } from "../../domain/task/TaskRepository"
import type { ProjectRepository } from "../../domain/project/ProjectRepository"
import { TaskDomainService } from "../../domain/task/TaskDomainService"
import { Task } from "../../domain/task/Task"
import { TaskTitle } from "../../domain/task/TaskTitle"
import { Priority } from "../../domain/task/Priority"
import { UserId } from "../../domain/user/UserId"
import { ProjectId } from "../../domain/project/ProjectId"

export interface CreateTaskCommand {
  title: string
  assigneeId: string
  projectId: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  dueDate?: Date | undefined
}

export class CreateTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private projectRepository: ProjectRepository,
    private taskDomainService: TaskDomainService,
  ) {}

  async execute(command: CreateTaskCommand): Promise<{ taskId: string }> {
    // 値オブジェクトの作成
    const title = new TaskTitle(command.title)
    const assigneeId = new UserId(command.assigneeId)
    const projectId = new ProjectId(command.projectId)
    const priority = command.priority
      ? new Priority(command.priority)
      : Priority.medium()

    // プロジェクトの存在確認
    const project = await this.projectRepository.findById(projectId)
    if (!project) {
      throw new Error("Project not found")
    }

    // ビジネスルールの検証
    const canCreate = await this.taskDomainService.canUserCreateTaskInProject(
      assigneeId,
      project,
    )
    if (!canCreate) {
      throw new Error("User is not authorized to create tasks in this project")
    }

    // タスクの作成
    const task = Task.create(title, assigneeId, priority, command.dueDate)

    // プロジェクトにタスクを追加（集約の整合性）
    project.addTask(task.getId())

    // 永続化
    await this.taskRepository.save(task)
    await this.projectRepository.save(project)

    return { taskId: task.getId().getValue() }
  }
}
