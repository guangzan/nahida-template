<p align="center">
  <img src="./assets/logo.png" alt="Nahida Template - Full-Stack Development" width="138" style="border-radius:20px" />
</p>

<div align="center">
  <h1>Nahida Template</h1>
  <p><em>A full-stack monorepo template built with modern technologies.</em></p>
</div>

<p align="center">
  <a href="https://github.com/guangzan/nahida-template/stargazers"><img src="https://img.shields.io/github/stars/guangzan/nahida-template?style=flat-square" alt="Stars"></a>
  <a href="https://github.com/guangzan/nahida-template/releases"><img src="https://img.shields.io/github/v/tag/guangzan/nahida-template?label=version&style=flat-square" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
  <a href="https://github.com/guangzan/nahida-template/commits"><img src="https://img.shields.io/github/commit-activity/m/guangzan/nahida-template?style=flat-square" alt="Commits"></a>
</p>

## Features

- 🚀 **High-Performance Backend** - Built with Elysia.js, featuring OpenAPI docs and type-safe APIs
- 🎨 **Modern Frontend** - Next.js 15 with React 19, Tailwind CSS, and shadcn/ui components
- 🔒 **Type-Safe Development** - Full TypeScript support with end-to-end type safety
- 🔐 **Authentication Ready** - Better Auth integration for secure user management
- 🗄️ **Database Integration** - Drizzle ORM with PostgreSQL support
- ⚡ **Developer Experience** - Hot reload, linting, and automated code formatting with Ultracite

## Quick Start

**Prerequisites:**

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- [Docker](https://docker.com/) (for containerized deployment)

**Install dependencies:**

```bash
bun install
```

**Environment Setup:**

Copy the environment variables template and configure your values:

```bash
cp .env.example .env
```

Required environment variables:

- `DATABASE_URL`: PostgreSQL database connection string
- `BETTER_AUTH_SECRET`: Secret key for Better Auth
- `BETTER_AUTH_URL`: Base URL for your application
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret

**Start development server:**

```bash
bun run dev
```

**Build for production:**

```bash
bun run build
```

**Run linting and checks:**

```bash
bun run check
```

**Docker deployment:**

```bash
bun run docker
```

## Tech Stack

### Backend

- **Framework:** [Elysia.js](https://elysiajs.com/) - High-performance Bun web framework
- **Language:** TypeScript with strict type checking
- **API Documentation:** OpenAPI/Swagger integration
- **Authentication:** [Better Auth](https://better-auth.com/) - Modern auth solution
- **Database:** [Drizzle ORM](https://orm.drizzle.team/) - Type-safe SQL queries
- **Validation:** Built-in Elysia validation with type inference

### Frontend

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **React:** React 19 with latest features
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Components:** [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible components
- **State Management:** [TanStack Query](https://tanstack.com/query) for server state
- **Type Safety:** End-to-end TypeScript with generated client

### Development Tools

- **Runtime:** [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Linting:** [Biome](https://biomejs.dev/) - Fast linter and formatter
- **AI-Ready Code:** [Ultracite](https://ultracite.ai/) - AI-friendly code formatting
- **Git Hooks:** [Lefthook](https://github.com/evilmartians/lefthook) - Fast git hooks
- **Monorepo:** Native Bun workspaces

## Project Structure

```
nahida-template/
├── backend/              # Elysia.js API server
│   ├── src/
│   │   ├── api/v1/       # API routes (ping, todo)
│   │   ├── db/           # Database schemas and connections
│   │   ├── libs/         # Third-party integrations
│   │   └── utils/        # Utility functions
│   └── drizzle/          # Database migrations
├── frontend/             # Next.js web application
│   ├── src/
│   │   ├── app/          # Next.js app router pages
│   │   ├── components/   # Reusable UI components
│   │   └── lib/          # Client-side utilities
│   └── public/           # Static assets
├── packages/             # Shared packages
│   └── client/           # Generated API client
└── scripts/              # Build and deployment scripts
```

## Features in Detail

### High-Performance Backend API

```bash
$ bun run dev
# Starts backend server on http://localhost:3001
# API docs available at http://localhost:3001/openapi
```

- **Auto-generated OpenAPI docs** with Swagger UI
- **Type-safe endpoints** with Elysia.js
- **Built-in validation** and error handling
- **Database integration** with Drizzle ORM
- **Authentication** with Better Auth (OAuth, email/password)

### Modern Frontend Application

```bash
$ bun run dev
# Starts frontend on http://localhost:3000
# Hot reload and fast refresh enabled
```

- **React 19** with latest concurrent features
- **App Router** for nested layouts and loading states
- **Server Components** for optimal performance
- **Tailwind CSS** for responsive design
- **shadcn/ui** components with dark mode support

### Todo Application Example

The template includes a complete todo application demonstrating:

- CRUD operations with type-safe API calls
- Real-time updates with TanStack Query
- User authentication and authorization
- Database relationships and migrations

```typescript
// Example API usage
const { data: todos } = await client.api.v1.todo.get()
```

## Development Tips

- **Use `bun run dev`** to start both frontend and backend simultaneously
- **Check API docs** at `/openapi` endpoint for available routes
- **Run `bun run check`** before committing to ensure code quality
- **Use `bun run docker`** for production-ready container builds
- **Database migrations** are handled automatically with Drizzle

## Deployment

### Docker Deployment

```bash
# Build and run with Docker
bun run docker
```

### Manual Deployment

```bash
# Build both frontend and backend
bun run build

# Start production servers
# Backend: cd backend && bun run start
# Frontend: cd frontend && bun run start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Run checks: `bun run check`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## Support

- **Issues:** [GitHub Issues](https://github.com/guangzan/nahida-template/issues)

## License

MIT License - feel free to use this template for your projects.
