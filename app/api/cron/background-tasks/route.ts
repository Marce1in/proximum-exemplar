import { randomUUID } from "node:crypto";
import { env } from "@/lib/env";
import { redis } from "@/lib/runtime/redis";
import { jobs, type JobContext } from "@/jobs/registry";

export const runtime = "nodejs";
export const maxDuration = 60;

const lockKey = "locks:cron:background-tasks";
const lockTtlSeconds = 55;

async function releaseLock(lockValue: string) {
  await redis.eval(
    `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
end
return 0
`,
    1,
    lockKey,
    lockValue,
  );
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const lockValue = randomUUID();
  const lock = await redis.set(lockKey, lockValue, "EX", lockTtlSeconds, "NX");

  if (lock !== "OK") {
    return Response.json({
      data: {
        skipped: true,
        reason: "lock-held",
      },
    });
  }

  const context: JobContext = {
    taskIndex: 0,
    taskCount: 1,
  };
  const results: Array<{ jobName: string; status: "succeeded" | "failed" }> =
    [];

  try {
    for (const [jobName, job] of Object.entries(jobs)) {
      try {
        await job(context);
        results.push({ jobName, status: "succeeded" });
      } catch (error) {
        console.error(
          JSON.stringify({
            event: "cron_job_failed",
            jobName,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
        results.push({ jobName, status: "failed" });
      }
    }
  } finally {
    await releaseLock(lockValue);
  }

  const failed = results.some((result) => result.status === "failed");

  return Response.json(
    {
      data: {
        skipped: false,
        results,
      },
    },
    { status: failed ? 500 : 200 },
  );
}
