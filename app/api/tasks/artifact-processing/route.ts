import { z } from "zod";
import { backgroundTasks } from "@/db/schema";
import { db } from "@/lib/runtime/db";
import { getCurrentInternalUserOrThrow } from "@/lib/services/users";

const schema = z.object({
  artifactId: z.string().uuid(),
});

export async function POST(req: Request) {
  const user = await getCurrentInternalUserOrThrow();
  const input = schema.parse(await req.json());

  const [task] = await db
    .insert(backgroundTasks)
    .values({
      type: "artifact.process",
      status: "queued",
      createdByUserId: user.id,
      payload: { artifactId: input.artifactId },
    })
    .returning();

  return Response.json({
    data: {
      taskId: task.id,
      status: task.status,
      runner: "vercel-cron",
      queued: true,
    },
  });
}
