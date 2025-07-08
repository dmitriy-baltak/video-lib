# VEED Video Library Dashboard

A full-stack application for browsing and managing a video library with grid layout, sorting functionality, and video creation capabilities.

## Tech Stack

### Backend
- **Node.js** with TypeScript
- **Fastify** - High-performance web framework
- **Prisma** - Type-safe ORM with PostgreSQL
- **gRPC** - For internal service communication
- **Zod** - Schema validation
- **Vitest** - Testing framework

### Frontend
- **Next.js 15** with TypeScript and App Router
- **React 19** with React Hook Form
- **Redux Toolkit** with RTK Query for state management
- **Tailwind CSS** with shadcn/ui components
- **Zod** - Client-side validation

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Start PostgreSQL:
```bash
docker-compose up -d
```

Setup database and seed data:
```bash
npx prisma migrate dev
npx prisma db seed
```

Create `.env` file if doesn't exist:
```
DATABASE_URL="postgresql://user:password@localhost:5432/videodb"
PORT=3007
GRPC_PORT=50051
IS_LOCAL=true
```

Start the server:
```bash
npm run dev
```

### Frontend Setup

Create `.env` file if doesn't exist:
```
NEXT_PUBLIC_API_URL=http://localhost:3007
```

```bash
cd frontend
npm install
npm run dev
```

The app will be available at http://localhost:3008

## Features

- **Video Grid Display** - Responsive grid layout with lazy-loaded images
- **Sorting** - Sort videos by creation date (newest/oldest)
- **Video Creation** - Add new videos with title and tags
- **Real-time Updates** - Automatic refresh after creating videos
- **Loading States** - Skeleton loaders for better UX
- **Error Handling** - Graceful error states with retry functionality

## API Endpoints

- `GET /videos?sortBy=newest|oldest` - List all videos
- `POST /videos` - Create a new video

## Testing

Backend:
```bash
cd backend
npm test
```

Frontend:
```bash
cd frontend
npm test
```

## Future Improvements

### Performance
- Implement pagination for large video collections
- Add Redis caching layer for frequently accessed data
- Optimize image loading with CDN integration
- Implement virtual scrolling for massive lists

### Security
- Missing input sanitization for XSS/injection prevention
- Configure CORS policy (currently allows all origins)
- Add API rate limiting and security headers
- Add request validation middleware

### Documentation & API
- Add OpenAPI documentation for REST endpoints
- Add documentation and style linting to gRPC proto files
- Add API versioning strategy

### Technical
- Add comprehensive test coverage (E2E, integration tests)
- Implement proper logging and monitoring (e.g., Datadog)
- Setup CI/CD pipeline
- Add database connection pooling for scale
- Add health checks
- Migrate to monorepo setup with shared types, linting, validation schemas between frontend and backend
- Add proper configuration management
