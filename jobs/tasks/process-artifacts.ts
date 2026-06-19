import { and, eq } from "drizzle-orm";
import { backgroundTasks } from "@/db/schema";
import { db } from "@/lib/runtime/db";

type JobContext = {
  taskIndex: number;
  taskCount: number;
};

export async function processArtifacts(context: JobContext) {
  console.info(JSON.stringify({ event: "artifact_worker_started", context }));

  const tasks = await db
    .select()
    .from(backgroundTasks)
    .where(
      and(
        eq(backgroundTasks.type, "artifact.process"),
        eq(backgroundTasks.status, "queued"),
      ),
    )
    .limit(10);

  for (const task of tasks) {
    const [claimedTask] = await db
      .update(backgroundTasks)
      .set({ status: "running", startedAt: new Date() })
      .where(
        and(
          eq(backgroundTasks.id, task.id),
          eq(backgroundTasks.status, "queued"),
        ),
      )
      .returning();

    if (!claimedTask) {
      continue;
    }

    try {
      await db
        .update(backgroundTasks)
        .set({
          status: "succeeded",
          result: { processedAt: new Date().toISOString() },
          finishedAt: new Date(),
        })
        .where(eq(backgroundTasks.id, task.id));
    } catch (error) {
      await db
        .update(backgroundTasks)
        .set({
          status: "failed",
          error: error instanceof Error ? error.message : String(error),
          finishedAt: new Date(),
        })
        .where(eq(backgroundTasks.id, task.id));
    }
  }

  console.info(JSON.stringify({ event: "artifact_worker_finished", context }));
}
