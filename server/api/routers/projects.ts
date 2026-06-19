import { z } from "zod";
import {
  createProjectForUser,
  deleteProjectForUser,
  listProjectsForUser,
} from "@/lib/services/projects";
import { getOrCreateInternalUserFromClerkId } from "@/lib/services/users";
import { createProjectSchema } from "@/lib/validations/project";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const user = await getOrCreateInternalUserFromClerkId(ctx.auth.userId);
    return listProjectsForUser(user.id);
  }),

  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getOrCreateInternalUserFromClerkId(ctx.auth.userId);
      return createProjectForUser({
        ownerUserId: user.id,
        name: input.name,
        description: input.description,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getOrCreateInternalUserFromClerkId(ctx.auth.userId);
      return deleteProjectForUser({
        projectId: input.projectId,
        ownerUserId: user.id,
      });
    }),
});
