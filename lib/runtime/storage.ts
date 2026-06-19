import "server-only";

import { del, head, issueSignedToken, list, presignUrl } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { env } from "@/lib/env";

export const BLOB_STORAGE_PROVIDER = "vercel-blob";

const blobAccess = "private" as const;

export function createObjectKey(input: {
  ownerUserId: string;
  fileName: string;
}) {
  const safeFileName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `users/${input.ownerUserId}/${randomUUID()}-${safeFileName}`;
}

function expiresIn(minutes: number) {
  return Date.now() + minutes * 60 * 1000;
}

export async function createPresignedUploadUrl(input: {
  key: string;
  contentType: string;
  contentLength: number;
}) {
  const validUntil = expiresIn(5);
  const signedToken = await issueSignedToken({
    token: env.BLOB_READ_WRITE_TOKEN,
    pathname: input.key,
    operations: ["put"],
    allowedContentTypes: [input.contentType],
    maximumSizeInBytes: input.contentLength,
    validUntil,
  });

  const { presignedUrl } = await presignUrl(signedToken, {
    access: blobAccess,
    operation: "put",
    pathname: input.key,
    allowedContentTypes: [input.contentType],
    maximumSizeInBytes: input.contentLength,
    validUntil,
  });

  return presignedUrl;
}

export async function createPresignedReadUrl(key: string) {
  const validUntil = expiresIn(10);
  const signedToken = await issueSignedToken({
    token: env.BLOB_READ_WRITE_TOKEN,
    pathname: key,
    operations: ["get"],
    validUntil,
  });

  const { presignedUrl } = await presignUrl(signedToken, {
    access: blobAccess,
    operation: "get",
    pathname: key,
    validUntil,
  });

  return presignedUrl;
}

export async function getObjectMetadata(key: string) {
  return head(key, { token: env.BLOB_READ_WRITE_TOKEN });
}

export async function assertObjectExists(key: string) {
  await getObjectMetadata(key);
}

export async function deleteObject(key: string) {
  await del(key, { token: env.BLOB_READ_WRITE_TOKEN });
}

export async function checkObjectStoreAccess() {
  const result = await list({
    limit: 1,
    prefix: "__healthcheck__/",
    token: env.BLOB_READ_WRITE_TOKEN,
  });

  return {
    objectCount: result.blobs.length,
    hasMore: result.hasMore,
  };
}
