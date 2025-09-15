import { Router } from "express"
import { TaskController } from "../controllers/TaskController"

export function createTaskRoutes(taskController: TaskController): Router {
  const router = Router()

  router.post("/tasks", (req, res) => taskController.createTask(req, res))
  router.put("/tasks/:taskId/status", (req, res) =>
    taskController.updateTaskStatus(req, res),
  )

  return router
}
