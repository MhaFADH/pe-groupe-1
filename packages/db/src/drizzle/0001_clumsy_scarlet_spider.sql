CREATE TABLE "treasure_hints_user" (
	"user_id" uuid NOT NULL,
	"hint_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "treasure_hints_user_user_id_hint_id_pk" PRIMARY KEY("user_id","hint_id")
);
--> statement-breakpoint
CREATE TABLE "treasure_hints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL
);
--> statement-breakpoint
ALTER TABLE "treasure_hunts" ADD COLUMN "location" text NOT NULL;--> statement-breakpoint
ALTER TABLE "treasure_hints_user" ADD CONSTRAINT "treasure_hints_user_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hints_user" ADD CONSTRAINT "treasure_hints_user_hint_id_treasure_hints_id_fk" FOREIGN KEY ("hint_id") REFERENCES "public"."treasure_hints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunts" DROP COLUMN "world_type";--> statement-breakpoint
DROP TYPE "public"."world_type";