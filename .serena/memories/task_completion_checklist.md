# Task Completion Checklist

## When a development task is completed, ensure you:

### Code Quality Checks
1. **TypeScript Compilation**: Run `npx tsc --noEmit` to check for type errors
2. **Code Formatting**: Run `npx prettier --write .` to format code consistently
3. **Testing**: Run `npm test` to ensure all tests pass

### Development Workflow  
1. **Database Schema**: If database changes made, run `npm run db:push` or `npm run db:migrate`
2. **Prisma Client**: If schema changed, run `npm run db:gerenate` to update client
3. **Manual Testing**: Start application with `npx ts-node src/main.ts` and test endpoints

### Code Review Considerations
1. **DDD Patterns**: Ensure proper separation of concerns across domain/application/infrastructure layers
2. **Domain Logic**: Keep business rules in domain entities and services
3. **Value Object Usage**: Use value objects for domain concepts with validation
4. **Repository Interface**: Keep domain interfaces independent of infrastructure
5. **Dependency Direction**: Ensure dependencies flow inward (infrastructure → application → domain)

### Notes
- **No ESLint configured**: Consider adding ESLint for additional code quality checks
- **No automated dev server**: Application must be started manually or with nodemon
- **Test Coverage**: Jest configured with coverage reporting to `coverage_dir`
- **Docker Services**: Ensure PostgreSQL and Redis are running if needed for integration tests

### Environment Setup Verification
- `.env` file configured with proper `DATABASE_URL`
- Docker services running: `docker-compose up -d`
- Dependencies installed: `npm install`