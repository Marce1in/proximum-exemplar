"use server";

import { revalidatePath } from "next/cache";
import {
  createProjectForUser,
  deleteProjectForUser,
} from "@/lib/services/projects";
import { getCurrentInternalUserOrThrow } from "@/lib/services/users";
import { createProjectSchema } from "@/lib/validations/project";

export async function createProjectAction(formData: FormData) {
  const user = await getCurrentInternalUserOrThrow();
  const input = createProjectSchema.parse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
  });

  await createProjectForUser({
    ownerUserId: user.id,
    name: input.name,
    description: input.description,
  });

  revalidatePath("/dashboard");
}

export async function deleteProjectAction(formData: FormData) {
  const user = await getCurrentInternalUserOrThrow();
  const projectId = String(formData.get("projectId") ?? "");

  await deleteProjectForUser({
    ownerUserId: user.id,
    projectId,
  });

  revalidatePath("/dashboard");
}
