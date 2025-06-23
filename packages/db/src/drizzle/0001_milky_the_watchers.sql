ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'player';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "nickname" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "auth0_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "picture" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_auth0Id_unique" UNIQUE("auth0_id");