import "server-only";

import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { getCurrentClerkUserOrThrow } from "@/lib/auth";
import { db } from "@/lib/runtime/db";

type ClerkUser = Awaited<ReturnType<typeof getCurrentClerkUserOrThrow>>;

function getDisplayName(user: ClerkUser) {
  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.fullName ||
    null
  );
}

function getPrimaryEmail(user: ClerkUser) {
  return (
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress
  );
}

export async function getOrCreateInternalUserFromClerk(clerkUser: ClerkUser) {
  const email = getPrimaryEmail(clerkUser);

  if (!email) {
    throw new Error("Authenticated Clerk user does not have an email address");
  }

  const [internalUser] = await db
    .insert(users)
    .values({
      clerkUserId: clerkUser.id,
      email,
      name: getDisplayName(clerkUser),
    })
    .onConflictDoUpdate({
      target: users.clerkUserId,
      set: {
        email,
        name: getDisplayName(clerkUser),
        updatedAt: new Date(),
      },
    })
    .returning();

  return internalUser;
}

export async function upsertUserFromClerk(clerkUser: ClerkUser) {
  return getOrCreateInternalUserFromClerk(clerkUser);
}

export async function getOrCreateInternalUserFromClerkId(clerkUserId: string) {
  const existingUser = await getInternalUserByClerkId(clerkUserId);

  if (existingUser) {
    return existingUser;
  }

  const clerkUser = await getCurrentClerkUserOrThrow();

  if (clerkUser.id !== clerkUserId) {
    throw new Error("Authenticated Clerk user did not match requested user ID");
  }

  return getOrCreateInternalUserFromClerk(clerkUser);
}

export async function getCurrentInternalUserOrThrow() {
  const clerkUser = await getCurrentClerkUserOrThrow();
  return getOrCreateInternalUserFromClerk(clerkUser);
}

export async function getInternalUserByClerkId(clerkUserId: string) {
  const [internalUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1);

  return internalUser ?? null;
}
