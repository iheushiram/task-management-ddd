import * as express from "express"
import { createContainer } from "./infrastructure/repositories/container/Container"
import { TaskController } from "./presentation/controllers/TaskController"
import { createTaskRoutes } from "./presentation/routes/taskRoutes"
import { TOKENS } from "./infrastructure/repositories/container/Container"

const app = express()
app.use(express.json())

// DIコンテナの作成
const container = createContainer()

// コントローラの作成
const taskController = new TaskController(
  container.get(TOKENS.CreateTaskUseCase),
  container.get(TOKENS.UpdateTaskStatusUseCase),
)

// ルートの設定
app.use("/api", createTaskRoutes(taskController))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
