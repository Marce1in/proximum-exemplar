import { and, eq } from "drizzle-orm";
import { artifacts } from "@/db/schema";
import { db } from "@/lib/runtime/db";
import { getObjectMetadata } from "@/lib/runtime/storage";
import { getCurrentInternalUserOrThrow } from "@/lib/services/users";
import { completeUploadSchema } from "@/lib/validations/upload";

export async function POST(req: Request) {
  const user = await getCurrentInternalUserOrThrow();
  const input = completeUploadSchema.parse(await req.json());

  const [artifact] = await db
    .select()
    .from(artifacts)
    .where(
      and(
        eq(artifacts.id, input.artifactId),
        eq(artifacts.ownerUserId, user.id),
      ),
    )
    .limit(1);

  if (!artifact) {
    return Response.json(
      { error: { message: "Artifact not found" } },
      { status: 404 },
    );
  }

  let metadata: Awaited<ReturnType<typeof getObjectMetadata>>;

  try {
    metadata = await getObjectMetadata(artifact.objectKey);
  } catch {
    return Response.json(
      { error: { message: "Uploaded object not found" } },
      { status: 400 },
    );
  }

  if (metadata.size !== artifact.sizeBytes) {
    return Response.json(
      { error: { message: "Uploaded object size does not match artifact" } },
      { status: 400 },
    );
  }

  const [updatedArtifact] = await db
    .update(artifacts)
    .set({
      status: "uploaded",
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(artifacts.id, input.artifactId),
        eq(artifacts.ownerUserId, user.id),
      ),
    )
    .returning();

  return Response.json({
    data: {
      artifactId: updatedArtifact.id,
      status: updatedArtifact.status,
    },
  });
}
