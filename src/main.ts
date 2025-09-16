import express from "express"
import cors from "cors"
import { createContainer } from "./infrastructure/repositories/container/Container"
import { TaskController } from "./presentation/controllers/TaskController"
import { createTaskRoutes } from "./presentation/routes/taskRoutes"
import { TOKENS } from "./infrastructure/repositories/container/Container"

const app = express()
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error("Not allowed by CORS"))
    },
    credentials: true,
  }),
)
app.use(express.json())

// DIコンテナの作成
const container = createContainer()

// コントローラの作成
const taskController = new TaskController(
  container.get(TOKENS.CreateTaskUseCase),
  container.get(TOKENS.UpdateTaskStatusUseCase),
  container.get(TOKENS.ListTasksUseCase),
  container.get(TOKENS.GetTaskUseCase),
)

// ルートの設定
app.use("/api", createTaskRoutes(taskController))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
