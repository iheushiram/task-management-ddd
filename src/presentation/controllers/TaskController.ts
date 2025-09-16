import type { Request, Response } from "express"
import { CreateTaskUseCase } from "../../application/task/CreateTaskUseCase"
import { UpdateTaskStatuUseCase } from "../../application/task/UpdateTaskStatusUseCase"
import { ListTasksUseCase } from "../../application/task/ListTasksUseCase"
import { GetTaskUseCase } from "../../application/task/GetTaskUseCase"
import type { Task } from "../../domain/task/Task"

type TaskResponse = {
  id: string
  title: string
  status: "todo" | "in_progress" | "done"
  priority: "low" | "medium" | "high"
  assigneeId: string
  createdAt: string
  updatedAt: string
  dueDate?: string
}

export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private updateTaskStatusUseCase: UpdateTaskStatuUseCase,
    private listTasksUseCase: ListTasksUseCase,
    private getTaskUseCase: GetTaskUseCase,
  ) {}

  private toTaskResponse(task: Task): TaskResponse {
    const status = task.getStatus().getValue().toLowerCase() as TaskResponse["status"]
    const priority = task
      .getPriority()
      .getValue()
      .toLowerCase() as TaskResponse["priority"]

    const response: TaskResponse = {
      id: task.getId().getValue(),
      title: task.getTitle().getValue(),
      status,
      priority,
      assigneeId: task.getAssigneeId().getValue(),
      createdAt: task.getCreatedAt().toISOString(),
      updatedAt: task.getUpdatedAt().toISOString(),
    }

    const dueDate = task.getDueDate()
    if (dueDate) {
      response.dueDate = dueDate.toISOString()
    }

    return response
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const command = {
        title: req.body.title,
        assigneeId: req.body.assigneeId,
        projectId: req.body.projectId,
        priority: req.body.priority,
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
      }

      const task = await this.createTaskUseCase.execute(command)
      res.status(201).json({ task: this.toTaskResponse(task) })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  async updateTaskStatus(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params
      const { status, userId } = req.body

      // taskId の存在チェック
      if (!taskId) {
        res.status(400).json({ error: "Task ID is requried" })
        return
      }

      if (!status || !userId) {
        res.status(400).json({ error: "Missing required fields" })
        return
      }

      const command = {
        taskId,
        status,
        userId,
      }

      await this.updateTaskStatusUseCase.execute(command)
      res.status(200).json({ message: "Task status updated successfully" })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  async getTasks(_req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.listTasksUseCase.execute()
      const payload = tasks.map((task) => this.toTaskResponse(task))
      res.status(200).json(payload)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }

  async getTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params
      if (!taskId) {
        res.status(400).json({ error: "Task ID is required" })
        return
      }

      const task = await this.getTaskUseCase.execute(taskId)
      res.status(200).json(this.toTaskResponse(task))
    } catch (error) {
      if ((error as Error).message === "Task not found") {
        res.status(404).json({ error: "Task not found" })
        return
      }
      res.status(400).json({ error: (error as Error).message })
    }
  }
}
