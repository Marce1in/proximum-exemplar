import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { backgroundTasks } from "@/db/schema";
import { db } from "@/lib/runtime/db";

export async function getTaskForUser(taskId: string, userId: string) {
  const [task] = await db
    .select()
    .from(backgroundTasks)
    .where(
      and(
        eq(backgroundTasks.id, taskId),
        eq(backgroundTasks.createdByUserId, userId),
      ),
    )
    .limit(1);

  return task ?? null;
}

export async function listRecentTasksForUser(userId: string) {
  return db
    .select()
    .from(backgroundTasks)
    .where(eq(backgroundTasks.createdByUserId, userId))
    .orderBy(desc(backgroundTasks.createdAt))
    .limit(10);
}
