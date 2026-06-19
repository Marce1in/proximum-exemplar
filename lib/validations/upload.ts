import { z } from "zod";
import { env } from "@/lib/env";

export const createUploadUrlSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.string().trim().min(1).max(120),
  sizeBytes: z.number().int().positive().max(env.BLOB_UPLOAD_MAX_BYTES),
  projectId: z.string().uuid().optional(),
});

export const completeUploadSchema = z.object({
  artifactId: z.string().uuid(),
});
