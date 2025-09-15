# Tech Stack and Dependencies

## Core Technologies
- **Language**: TypeScript (ESNext target)
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL 15 (via Docker)
- **ORM**: Prisma 6.16.1
- **Cache**: Redis 7 (via Docker)

## Development Tools
- **Testing**: Jest 30.1.3 with ts-jest
- **Code Formatting**: Prettier 3.6.2
- **Type Checking**: TypeScript 5.9.2
- **Package Manager**: npm
- **Containerization**: Docker Compose

## Key Dependencies
- `@prisma/client`: Database client
- `dotenv`: Environment configuration
- `express`: Web framework
- `helmet`: Security middleware

## Development Dependencies
- `@types/*`: Type definitions
- `@typescript-eslint/*`: TypeScript ESLint support
- `jest` & `@types/jest`: Testing framework
- `nodemon`: Development server
- `ts-node`: TypeScript execution

## Module System
- Uses ES Modules (`"type": "module"` in package.json)
- ESNext module compilation target
- Extensible module pattern for imports (.js extensions in imports)