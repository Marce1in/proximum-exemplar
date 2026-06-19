import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  DATABASE_URL: z.string().min(1),
  DATABASE_POOL_MAX: z.coerce
    .number()
    .int()
    .positive()
    .default(process.env.NODE_ENV === "production" ? 1 : 5),

  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).default("/sign-in"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).default("/sign-up"),
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z
    .string()
    .min(1)
    .default("/dashboard"),
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z
    .string()
    .min(1)
    .default("/dashboard"),

  REDIS_URL: z.string().min(1),

  BLOB_READ_WRITE_TOKEN: z.string().min(1),
  BLOB_UPLOAD_MAX_BYTES: z.coerce.number().int().positive().default(10_485_760),
  CRON_SECRET: z.string().min(16),

  AI_PROVIDER: z.enum(["gemini", "openrouter"]).default("openrouter"),
  AI_DEFAULT_MODEL: z.string().min(1).default("gemini-2.5-flash"),
  OPENROUTER_API_KEY: z.string().optional().default(""),
  OPENROUTER_DEFAULT_MODEL: z
    .string()
    .min(1)
    .default("deepseek/deepseek-v4-flash"),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional().default(""),
});

export const env = envSchema.parse({
  ...process.env,
  DATABASE_URL: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  REDIS_URL: process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL,
});
