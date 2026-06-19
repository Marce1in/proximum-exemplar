import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { projects } from "@/db/schema";
import { db } from "@/lib/runtime/db";
import { createProjectSchema } from "@/lib/validations/project";

export type CreateProjectInput = {
  ownerUserId: string;
  name: string;
  description?: string;
};

export async function listProjectsForUser(userId: string) {
  return db
    .select()
    .from(projects)
    .where(eq(projects.ownerUserId, userId))
    .orderBy(desc(projects.createdAt));
}

export async function getProjectForUser(input: {
  projectId: string;
  ownerUserId: string;
}) {
  const [project] = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.id, input.projectId),
        eq(projects.ownerUserId, input.ownerUserId),
      ),
    )
    .limit(1);

  return project ?? null;
}

export async function createProjectForUser(input: CreateProjectInput) {
  const parsed = createProjectSchema.parse({
    name: input.name,
    description: input.description,
  });

  const [project] = await db
    .insert(projects)
    .values({
      ownerUserId: input.ownerUserId,
      name: parsed.name,
      description: parsed.description || null,
    })
    .returning();

  return project;
}

export async function deleteProjectForUser(input: {
  projectId: string;
  ownerUserId: string;
}) {
  const [project] = await db
    .delete(projects)
    .where(
      and(
        eq(projects.id, input.projectId),
        eq(projects.ownerUserId, input.ownerUserId),
      ),
    )
    .returning();

  return project ?? null;
}
