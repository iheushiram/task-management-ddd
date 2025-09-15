import type { Request, Response } from "express"
import { CreateTaskUseCase } from "../../application/task/CreateTaskUseCase"
import { UpdateTaskStatuUseCase } from "../../application/task/UpdateTaskStatusUseCase"

export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private updateTaskStatusUseCase: UpdateTaskStatuUseCase,
  ) {}

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const command = {
        title: req.body.title,
        assigneeId: req.body.assigneeId,
        projectId: req.body.projectId,
        priority: req.body.priority,
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
      }

      const result = await this.createTaskUseCase.execute(command)
      res.status(201).json(result)
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
}
