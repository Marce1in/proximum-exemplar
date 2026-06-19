import { z } from "zod";
import { getTaskForUser, listRecentTasksForUser } from "@/lib/services/tasks";
import { getOrCreateInternalUserFromClerkId } from "@/lib/services/users";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  recent: protectedProcedure.query(async ({ ctx }) => {
    const user = await getOrCreateInternalUserFromClerkId(ctx.auth.userId);
    return listRecentTasksForUser(user.id);
  }),

  byId: protectedProcedure
    .input(z.object({ taskId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const user = await getOrCreateInternalUserFromClerkId(ctx.auth.userId);
      return getTaskForUser(input.taskId, user.id);
    }),
});
