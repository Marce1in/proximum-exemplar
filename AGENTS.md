# Agent Rules

- Main brand color: `#2B985E`.
- Use `pnpm`.
- Do not add Prisma.
- Do not add Express, NestJS, Fastify, GraphQL, Kubernetes, or a separate backend.
- Keep the backend inside Next.js App Router.
- Use Server Components for server-side reads by default.
- Use Server Actions for simple form mutations.
- Use tRPC only for typed client-side app APIs, dashboard widgets, mutations, and polling.
- Do not use tRPC for Clerk webhooks, binary uploads, cron routes, or AI streaming.
- Use Drizzle for database access.
- Use Neon Postgres in production.
- Map Clerk users to internal `users.id` rows before writing application-owned data.
- Use Upstash Redis in production.
- Use Redis only for cache, locks, rate limits, and ephemeral coordination.
- Do not use Redis as the durable task queue.
- Use Vercel Blob for object storage.
- Store binary bytes in object storage, not Postgres.
- Use Vercel AI SDK with OpenRouter by default. Keep Gemini as a
  direct-provider option.
- Do not add WebSockets by default.
- Use Vercel Cron for scheduled background task draining.
- Use Vercel Git Integration for deployment.
- Use GitHub Actions only for CI checks.
- Do not run business jobs in CI/CD.
- Do not commit secrets, `.env`, `.env.local`, or `.env.docker`.
