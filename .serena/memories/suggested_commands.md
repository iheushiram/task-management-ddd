# Suggested Development Commands

## Database Commands
```bash
# Generate Prisma client
npm run db:gerenate

# Push schema to database
npm run db:push

# Run database migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio

# Seed database with initial data
npm run db:seed
```

## Testing
```bash
# Run all tests
npm test

# Run tests with Jest directly
npx jest
```

## Docker Services
```bash
# Start PostgreSQL and Redis services
docker-compose up -d

# Stop services
docker-compose down

# View service logs
docker-compose logs postgres
docker-compose logs redis
```

## Development Server
```bash
# Start the application (manual start)
npx ts-node src/main.ts

# Run with nodemon for development (if configured)
npx nodemon src/main.ts
```

## Code Quality
```bash
# Format code with Prettier
npx prettier --write .

# Check TypeScript compilation
npx tsc --noEmit
```

## System Utilities (Linux/WSL2)
- `ls`: List directory contents
- `find`: Find files and directories
- `grep` / `rg`: Search in files (ripgrep recommended)
- `git`: Version control operations
- `cd`: Change directory

## Important Notes
- No ESLint configuration detected - consider adding for code quality
- No npm dev script configured - application started manually
- Database URL should be configured in `.env` file based on `.env.sample`