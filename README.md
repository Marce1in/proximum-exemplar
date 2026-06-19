# Proximum Exemplar

Full-stack Next.js template hosted on Vercel with the backend kept inside the
App Router.

## Stack

- Next.js 16, React 19, TypeScript, pnpm, Tailwind CSS, shadcn/ui
- Clerk authentication
- Drizzle ORM with Neon Postgres
- tRPC with TanStack Query for typed client-side app APIs
- Upstash Redis for cache, locks, rate limits, and ephemeral coordination
- Vercel Blob for object storage
- Vercel AI SDK with OpenRouter as the primary provider and Gemini as an
  alternate provider
- Vercel Cron for background task draining
- GitHub Actions for CI checks
- Vercel Git Integration for deployment

## Prerequisites

- Node.js 24, matching Vercel's supported default runtime
- pnpm 11
- Docker and Docker Compose for local Postgres/Redis
- Clerk application for authentication
- Vercel project connected to this repository
- Vercel Blob store connected to the project
- Neon Postgres database connected through Vercel Marketplace
- Upstash Redis database connected through Vercel Marketplace
- OpenRouter API key for AI streaming

## Local Development

Canonical env templates:

- `.env.example` for host-based local development.
- `.env.docker.example` for Docker Compose development, using container service
  hostnames.

Ignored working env files:

- `.env.local`, usually generated with `vercel env pull .env.local`.
- `.env.docker`, copied from `.env.docker.example` before running Docker
  Compose.

Do not add other `.env*` files. Production env values live in Vercel.

Start local Postgres and Redis with Docker:

```bash
cp .env.docker.example .env.docker
docker compose up --build
```

The Docker dev image uses `node:24-alpine`. If the default host ports are
already taken, override them when starting Compose:

```bash
APP_PORT=3100 POSTGRES_PORT=55432 REDIS_PORT=56379 docker compose up --build
```

Services:

- Next.js: http://localhost:3000
- Postgres: `localhost:5432`
- Redis: `localhost:6379`

Vercel Blob requires a real Blob token. For local development, pull Vercel envs
or set `BLOB_READ_WRITE_TOKEN` manually:

```bash
vercel env pull .env.local
pnpm install
pnpm db:push
pnpm dev
```

Useful scripts:

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm build
pnpm jobs:dev artifacts:process
```

Drizzle Studio runs in the tools profile:

```bash
docker compose --profile tools up
```

## Service Console

The homepage is a live service console. It verifies Clerk, Neon Postgres,
Upstash Redis, Vercel Blob, Vercel Cron, and the OpenRouter model catalog on
each request, without running paid AI generations.

## Database

The schema lives in `db/schema.ts`. Production uses Neon Postgres through
`DATABASE_URL`; local development can use Docker Postgres.

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:push
```

Application-owned rows use internal `users.id` values. Clerk IDs are stored only
as external identity mappings in `users.clerkUserId`.

## Object Storage

Uploads use Vercel Blob. The app keeps file bytes out of Postgres and stores
only artifact metadata in the `artifacts` table.

Runtime upload flow:

```txt
POST /api/uploads/presign
PUT <returned uploadUrl>
POST /api/uploads/complete
```

`/api/uploads/complete` verifies the Blob object exists before marking the
artifact as uploaded.

## Clerk

Create a Clerk application and configure local development:

```txt
Sign-in URL: http://localhost:3000/sign-in
Sign-up URL: http://localhost:3000/sign-up
After sign-in URL: http://localhost:3000/dashboard
After sign-up URL: http://localhost:3000/dashboard
```

Set these env vars locally and in Vercel:

```txt
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PROXY_URL
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
```

For production, add the deployed Vercel URL to Clerk's allowed origins and
redirect URLs. This app uses in-app Clerk pages at `/sign-in` and `/sign-up`.
Leave `NEXT_PUBLIC_CLERK_PROXY_URL` empty unless a matching proxy URL is
configured for the Clerk production domain.

## AI Provider

Use OpenRouter by default through the Vercel AI SDK provider adapter:

```env
AI_PROVIDER="openrouter"
OPENROUTER_DEFAULT_MODEL="deepseek/deepseek-v4-flash"
OPENROUTER_API_KEY="..."
```

The homepage checks OpenRouter by loading the model catalog, which verifies the
API key and selected model without spending inference tokens on every page view.

Gemini is still supported when explicitly selected.

Use Gemini:

```env
AI_PROVIDER="gemini"
AI_DEFAULT_MODEL="gemini-2.5-flash"
GOOGLE_GENERATIVE_AI_API_KEY="..."
```

Interactive chat streams through `POST /api/ai/chat`.

## Background Tasks

User-facing routes enqueue task rows in Postgres. Vercel Cron calls:

```txt
GET /api/cron/background-tasks
```

The cron route requires `Authorization: Bearer ${CRON_SECRET}` and uses Redis
locking to prevent overlapping executions. The schedule is defined in
`vercel.json`; it is daily for Vercel Hobby compatibility. On Pro, change it to
`* * * * *` if tasks need minute-level draining.

For local manual runs:

```bash
pnpm jobs:dev artifacts:process
pnpm jobs:dev ai:batch
pnpm jobs:dev cache:warm
pnpm jobs:dev reports:generate
```

## Production Setup

Configure these Vercel environment variables:

```txt
NEXT_PUBLIC_APP_URL
DATABASE_URL
DATABASE_POOL_MAX
REDIS_URL
BLOB_READ_WRITE_TOKEN
BLOB_UPLOAD_MAX_BYTES
CRON_SECRET
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PROXY_URL
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
AI_PROVIDER
OPENROUTER_API_KEY
OPENROUTER_DEFAULT_MODEL
AI_DEFAULT_MODEL
GOOGLE_GENERATIVE_AI_API_KEY
```

Recommended production providers:

- Neon Postgres through Vercel Marketplace
- Upstash Redis through Vercel Marketplace, using the Redis protocol URL as
  `REDIS_URL`
- Vercel Blob private store connected to the project

Deployment is handled by Vercel Git Integration. GitHub Actions runs lint,
format check, typecheck, and `vercel build` using Vercel project settings.
