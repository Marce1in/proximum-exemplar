import "server-only";

import { appRouter } from "@/server/api/root";
import { createCallerFactory, createTRPCContext } from "@/server/api/trpc";

const createCaller = createCallerFactory(appRouter);

export async function getServerCaller() {
  return createCaller(await createTRPCContext());
}
