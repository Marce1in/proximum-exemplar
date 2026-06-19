import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import type { JobContext } from "./registry";

function loadLocalEnv() {
  for (const envFile of [".env.local", ".env"]) {
    if (!existsSync(envFile)) continue;
    loadEnvFile(envFile);
    return;
  }
}

function getJobContext(): JobContext {
  return {
    taskIndex: Number(process.env.JOB_TASK_INDEX ?? "0"),
    taskCount: Number(process.env.JOB_TASK_COUNT ?? "1"),
  };
}

async function getJobs() {
  const { jobs } = await import("./registry");
  return jobs;
}

async function main() {
  loadLocalEnv();

  const jobs = await getJobs();
  const jobName = process.argv[2];

  if (!jobName) {
    throw new Error(
      `Missing job name. Available jobs: ${Object.keys(jobs).join(", ")}`,
    );
  }

  const job = jobs[jobName as keyof typeof jobs];

  if (!job) {
    throw new Error(
      `Unknown job "${jobName}". Available jobs: ${Object.keys(jobs).join(", ")}`,
    );
  }

  const context = getJobContext();

  console.info(
    JSON.stringify({
      event: "job_started",
      jobName,
      taskIndex: context.taskIndex,
      taskCount: context.taskCount,
    }),
  );

  await job(context);

  console.info(
    JSON.stringify({
      event: "job_finished",
      jobName,
      taskIndex: context.taskIndex,
      taskCount: context.taskCount,
    }),
  );
}

main().catch((error) => {
  console.error(
    JSON.stringify({
      event: "job_failed",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }),
  );

  process.exit(1);
});
