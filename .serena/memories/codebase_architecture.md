# Codebase Architecture

## DDD Layer Structure

### Domain Layer (`src/domain/`)
**Core business logic and domain concepts**

- **Shared**: Base classes and common domain concepts
  - `ValueObject<T>`: Base class for value objects
  - `DomainEvent`: Base class for domain events
  - `DateRange`: Shared value object

- **Task Context** (`src/domain/task/`):
  - `Task`: Main aggregate root with business logic
  - `TaskId`, `TaskTitle`, `TaskStatus`, `Priority`: Value objects
  - `TaskRepository`: Repository interface
  - `TaskDomainService`: Domain services
  - `events/`: Domain events (`TaskCreatedEvent`, `TaskCompletedEvent`)
  - `__tests__/`: Domain unit tests

- **Project Context** (`src/domain/project/`):
  - `Project`: Project aggregate
  - `ProjectId`, `ProjectName`, `ProjectDescription`: Value objects
  - `ProjectRepository`: Repository interface

- **User Context** (`src/domain/user/`):
  - `UserId`, `UserName`, `Email`: Value objects

### Application Layer (`src/application/`)
**Use cases and application services**

- `task/CreateTaskUseCase`: Task creation use case
- `task/UpdateTaskStatusUseCase`: Task status update use case

### Infrastructure Layer (`src/infrastructure/`)
**Technical implementation details**

- **Repositories**: Data persistence implementations
  - `InMemoryTaskRepository`: In-memory implementation for testing
  - `InMemoryProjectRepository`: In-memory project storage
  - `PrismaProjectRepository`: PostgreSQL implementation via Prisma
  - `container/Container`: DI container setup with tokens
  - `database/seed.ts`: Database seeding script

### Presentation Layer (`src/presentation/`)
**HTTP API and external interfaces**

- `controllers/TaskController`: HTTP request handling
- `routes/taskRoutes`: Express route definitions

## Key Architectural Patterns

### Dependency Injection
- Uses simple DI container with token-based registration
- TOKENS constant defines available services
- Controllers receive dependencies through constructor injection

### Repository Pattern
- Abstract interfaces in domain layer
- Multiple implementations (in-memory, Prisma)
- Switchable via DI container

### Domain Events
- Event-driven architecture support
- Events defined in domain layer
- Raised when domain state changes

### Aggregate Pattern
- `Task` is main aggregate root
- Encapsulates business rules and invariants
- Controls access to internal entities

## Database Schema (Prisma)
- PostgreSQL database with UUID primary keys  
- Users, Projects, Tasks, ProjectMembers tables
- Proper foreign key relationships and constraints
- Snake_case database naming with @map annotations