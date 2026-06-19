import { artifacts } from "@/db/schema";
import { db } from "@/lib/runtime/db";
import {
  BLOB_STORAGE_PROVIDER,
  createObjectKey,
  createPresignedUploadUrl,
} from "@/lib/runtime/storage";
import { getProjectForUser } from "@/lib/services/projects";
import { getCurrentInternalUserOrThrow } from "@/lib/services/users";
import { createUploadUrlSchema } from "@/lib/validations/upload";

export async function POST(req: Request) {
  const user = await getCurrentInternalUserOrThrow();
  const input = createUploadUrlSchema.parse(await req.json());

  if (input.projectId) {
    const project = await getProjectForUser({
      projectId: input.projectId,
      ownerUserId: user.id,
    });

    if (!project) {
      return Response.json(
        { error: { message: "Project not found" } },
        { status: 404 },
      );
    }
  }

  const key = createObjectKey({
    ownerUserId: user.id,
    fileName: input.fileName,
  });

  const uploadUrl = await createPresignedUploadUrl({
    key,
    contentType: input.contentType,
    contentLength: input.sizeBytes,
  });

  const [artifact] = await db
    .insert(artifacts)
    .values({
      ownerUserId: user.id,
      projectId: input.projectId ?? null,
      bucket: BLOB_STORAGE_PROVIDER,
      objectKey: key,
      originalFileName: input.fileName,
      contentType: input.contentType,
      sizeBytes: input.sizeBytes,
      status: "pending_upload",
    })
    .returning();

  return Response.json({
    data: {
      artifactId: artifact.id,
      key,
      uploadUrl,
      uploadMethod: "PUT",
    },
  });
}
