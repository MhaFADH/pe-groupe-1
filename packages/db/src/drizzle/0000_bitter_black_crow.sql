CREATE TYPE "public"."validation_key" AS ENUM('hunt_discovery', 'passphrase', 'landmark');--> statement-breakpoint
CREATE TYPE "public"."world_type" AS ENUM('real', 'cartographic');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('player', 'organizer', 'partner', 'admin');--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('intern', 'extern');--> statement-breakpoint
CREATE TYPE "public"."winning_rarity" AS ENUM('common', 'rare', 'epic', 'legendary');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('artefact', 'discount', 'hardware');--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"key" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "images_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "mfa_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"otp_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "treasure_hunt_images" (
	"treasure_hunt_id" uuid,
	"image_id" integer,
	CONSTRAINT "treasure_hunt_images_treasure_hunt_id_image_id_pk" PRIMARY KEY("treasure_hunt_id","image_id")
);
--> statement-breakpoint
CREATE TABLE "treasure_hunt_landmarks" (
	"treasure_hunt_id" uuid,
	"user_id" uuid,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	CONSTRAINT "treasure_hunt_landmarks_treasure_hunt_id_user_id_latitude_longitude_pk" PRIMARY KEY("treasure_hunt_id","user_id","latitude","longitude")
);
--> statement-breakpoint
CREATE TABLE "treasure_hunt_participants" (
	"treasure_hunt_id" uuid,
	"user_id" uuid,
	"last_attempt" timestamp,
	"current_step" integer,
	CONSTRAINT "treasure_hunt_participants_treasure_hunt_id_user_id_pk" PRIMARY KEY("treasure_hunt_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "treasure_hunt_steps" (
	"treasure_hunt_id" uuid NOT NULL,
	"order" integer NOT NULL,
	"clue" text NOT NULL,
	"validation_key" "validation_key" NOT NULL,
	"validation_data" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "treasure_hunt_winnings" (
	"treasure_hunt_id" uuid,
	"winning_id" integer,
	"coins" integer DEFAULT 0 NOT NULL,
	"condition_of_award" text NOT NULL,
	CONSTRAINT "treasure_hunt_winnings_treasure_hunt_id_winning_id_pk" PRIMARY KEY("treasure_hunt_id","winning_id")
);
--> statement-breakpoint
CREATE TABLE "treasure_hunts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"world_type" "world_type" NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"max_participants" integer,
	"participation_fees" integer DEFAULT 0 NOT NULL,
	"digging_time" integer DEFAULT 60 NOT NULL,
	"digging_cost" integer,
	"is_private" boolean DEFAULT false NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"grade" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"winner_id" uuid,
	"creator_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_winnings" (
	"user_id" uuid,
	"winning_id" integer,
	"obtained_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_winnings_user_id_winning_id_pk" PRIMARY KEY("user_id","winning_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "role" NOT NULL,
	"nickname" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"age" date,
	"coins" integer DEFAULT 0 NOT NULL,
	"is_mfa_enabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"image_id" integer,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "winnings" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" "category" NOT NULL,
	"type" "type" NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"rarity" "winning_rarity" DEFAULT 'common' NOT NULL,
	"data" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mfa_tokens" ADD CONSTRAINT "mfa_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_images" ADD CONSTRAINT "treasure_hunt_images_treasure_hunt_id_treasure_hunts_id_fk" FOREIGN KEY ("treasure_hunt_id") REFERENCES "public"."treasure_hunts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_images" ADD CONSTRAINT "treasure_hunt_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_landmarks" ADD CONSTRAINT "treasure_hunt_landmarks_treasure_hunt_id_treasure_hunts_id_fk" FOREIGN KEY ("treasure_hunt_id") REFERENCES "public"."treasure_hunts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_landmarks" ADD CONSTRAINT "treasure_hunt_landmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_participants" ADD CONSTRAINT "treasure_hunt_participants_treasure_hunt_id_treasure_hunts_id_fk" FOREIGN KEY ("treasure_hunt_id") REFERENCES "public"."treasure_hunts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_participants" ADD CONSTRAINT "treasure_hunt_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_steps" ADD CONSTRAINT "treasure_hunt_steps_treasure_hunt_id_treasure_hunts_id_fk" FOREIGN KEY ("treasure_hunt_id") REFERENCES "public"."treasure_hunts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_winnings" ADD CONSTRAINT "treasure_hunt_winnings_treasure_hunt_id_treasure_hunts_id_fk" FOREIGN KEY ("treasure_hunt_id") REFERENCES "public"."treasure_hunts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunt_winnings" ADD CONSTRAINT "treasure_hunt_winnings_winning_id_winnings_id_fk" FOREIGN KEY ("winning_id") REFERENCES "public"."winnings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunts" ADD CONSTRAINT "treasure_hunts_winner_id_users_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treasure_hunts" ADD CONSTRAINT "treasure_hunts_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_winnings" ADD CONSTRAINT "user_winnings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_winnings" ADD CONSTRAINT "user_winnings_winning_id_winnings_id_fk" FOREIGN KEY ("winning_id") REFERENCES "public"."winnings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;