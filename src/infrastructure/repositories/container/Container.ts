import { InMemoryProjectRepository } from "../InMemoryProjectRepository"
import { InMemoryTaskRepository } from "../InMemoryTaskRepository"
import { TaskDomainService } from "../../../domain/task/TaskDomainService"
import { CreateTaskUseCase } from "../../../application/task/CreateTaskUseCase"
import { UpdateTaskStatuUseCase } from "../../../application/task/UpdateTaskStatusUseCase"
import { ListTasksUseCase } from "../../../application/task/ListTasksUseCase"
import { GetTaskUseCase } from "../../../application/task/GetTaskUseCase"

interface Container {
  get<T>(token: symbol): T
  bind<T>(token: symbol, implementation: T): void
}

class SimpleContainer implements Container {
  private bindings = new Map<symbol, any>()

  bind<T>(token: symbol, implementation: T): void {
    this.bindings.set(token, implementation)
  }

  get<T>(token: symbol): T {
    const implementation = this.bindings.get(token)
    if (!implementation) {
      throw new Error(`No bindings found for token: ${token.toString()}`)
    }
    return implementation
  }
}

// トークンの定義
export const TOKENS = {
  TaskRepository: Symbol("TaskRepository"),
  ProjectRepository: Symbol("ProjectRepository"),
  TaskDomainService: Symbol("TaskDomainService"),
  CreateTaskUseCase: Symbol("CreateTaskUseCase"),
  UpdateTaskStatusUseCase: Symbol("UpdateTaskStatusUseCase"),
  ListTasksUseCase: Symbol("ListTasksUseCase"),
  GetTaskUseCase: Symbol("GetTaskUseCase"),
} as const

export function createContainer(): Container {
  const container = new SimpleContainer()

  // リポジトリの登録
  container.bind(TOKENS.TaskRepository, new InMemoryTaskRepository())
  container.bind(TOKENS.ProjectRepository, new InMemoryProjectRepository())

  // ドメインサービスの登録
  container.bind(
    TOKENS.TaskDomainService,
    new TaskDomainService(container.get(TOKENS.TaskRepository)),
  )

  // アプリケーションサービスの登録
  container.bind(
    TOKENS.CreateTaskUseCase,
    new CreateTaskUseCase(
      container.get(TOKENS.TaskRepository),
      container.get(TOKENS.ProjectRepository),
      container.get(TOKENS.TaskDomainService),
    ),
  )

  container.bind(
    TOKENS.UpdateTaskStatusUseCase,
    new UpdateTaskStatuUseCase(container.get(TOKENS.TaskRepository)),
  )

  container.bind(
    TOKENS.ListTasksUseCase,
    new ListTasksUseCase(container.get(TOKENS.TaskRepository)),
  )

  container.bind(
    TOKENS.GetTaskUseCase,
    new GetTaskUseCase(container.get(TOKENS.TaskRepository)),
  )

  return container
}
