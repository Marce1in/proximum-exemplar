import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";

export async function getCurrentClerkAuth() {
  return auth();
}

export async function getCurrentClerkUserIdOrThrow() {
  const { userId } = await auth.protect();
  return userId;
}

export async function getCurrentClerkUserOrThrow() {
  await auth.protect();

  const user = await currentUser();

  if (!user) {
    throw new Error("Authenticated Clerk user was not found");
  }

  return user;
}
