ALTER TABLE "users" RENAME COLUMN "workos_user_id" TO "clerk_user_id";--> statement-breakpoint
DROP INDEX "users_workos_user_id_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "users_clerk_user_id_idx" ON "users" USING btree ("clerk_user_id");