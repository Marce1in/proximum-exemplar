import { projectsRouter } from "@/server/api/routers/projects";
import { tasksRouter } from "@/server/api/routers/tasks";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  tasks: tasksRouter,
});

export type AppRouter = typeof appRouter;
