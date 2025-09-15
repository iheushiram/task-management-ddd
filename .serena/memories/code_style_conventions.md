# Code Style and Conventions

## TypeScript Configuration
- **Target**: ESNext
- **Module**: ESNext  
- **Strict mode**: Enabled
- **Source maps**: Enabled
- **Stricter checking**: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`

## Code Formatting (Prettier)
- **Semicolons**: Disabled (`"semi": false`)
- **Default Prettier rules** for other formatting

## DDD Architecture Patterns

### Value Objects
- Extend `ValueObject<T>` base class
- Include validation logic in `validate()` method
- Immutable by design
- Example: `TaskTitle`, `TaskId`, `Priority`

### Entities
- Private constructor pattern
- Static factory methods: `create()` and `reconstruct()`
- Domain logic methods for behavior
- Getter methods for accessing properties
- Example: `Task` entity with domain methods like `changeTitle()`, `isOverdue()`

### Repository Pattern
- Interface in domain layer
- Implementation in infrastructure layer
- Both in-memory and Prisma implementations provided

### Naming Conventions
- **Classes**: PascalCase
- **Methods**: camelCase  
- **Private fields**: camelCase with `private` modifier
- **Constants**: UPPER_SNAKE_CASE for DI tokens
- **Files**: PascalCase for classes, camelCase for others

### Comments
- Japanese comments used for domain logic explanations
- English for technical implementation notes
- Factory method comments included

### File Organization
- Clear separation by DDD layers (domain, application, infrastructure, presentation)
- Each bounded context in separate directories
- Test files in `__tests__` subdirectories