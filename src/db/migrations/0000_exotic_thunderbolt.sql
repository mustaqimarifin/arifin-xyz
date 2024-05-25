-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
DO
  $$ BEGIN
 CREATE TYPE "public"."ROLE" AS ENUM('BLOCKED', 'USER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 CREATE TYPE "public"."bookmark_type" AS ENUM('article', 'blog', 'video', 'bodoh');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 CREATE TYPE "public"."stack_type" AS ENUM('code', 'productivity', 'music', 'misc');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'blocked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "session" (
    "id" text PRIMARY KEY DEFAULT nanoid() NOT NULL,
    "user_id" text NOT NULL,
    "expires" timestamp
    with
      time zone NOT NULL,
      "session_token" text NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "bookmark" (
    "id" text DEFAULT nanoid() NOT NULL,
    "type" "bookmark_type",
    "name" text,
    "url" text,
    "description" text,
    "featured" boolean,
    "image" text,
    "date" timestamp
    with
      time zone DEFAULT now() NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "tweet" ("key" text PRIMARY KEY NOT NULL, "value" jsonb NOT NULL);

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "view" (
    "slug" text PRIMARY KEY NOT NULL,
    "count" integer NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "usr" (
    "id" text PRIMARY KEY DEFAULT nanoid() NOT NULL,
    "name" text,
    "email" text,
    "email_verified" timestamp
    with
      time zone,
      "image" text,
      "role" "ROLE" DEFAULT 'USER' NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "comment" (
    "id" text DEFAULT nanoid() NOT NULL,
    "user_id" text NOT NULL,
    "parent_id" text,
    "slug" text NOT NULL,
    "body" text,
    "date" timestamp
    with
      time zone DEFAULT now() NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "guestbook" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,
    "body" text,
    "date" timestamp
    with
      time zone DEFAULT now() NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "verification_token" (
    "identifier" text NOT NULL,
    "expires" timestamp
    with
      time zone NOT NULL,
      "token" text NOT NULL,
      CONSTRAINT "verification_token_pkey" PRIMARY KEY("identifier", "token")
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "account" (
    "id" text DEFAULT nanoid() NOT NULL,
    "user_id" text NOT NULL,
    "type" text NOT NULL,
    "provider" text NOT NULL,
    "provider_acc_id" text NOT NULL,
    "refresh_token" text,
    "access_token" text,
    "expires_at" bigint,
    "id_token" text,
    "scope" text,
    "session_state" text,
    "token_type" text,
    CONSTRAINT "account_pkey" PRIMARY KEY("provider", "provider_acc_id")
  );

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."usr"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."usr"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "guestbook" ADD CONSTRAINT "guestbook_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."usr"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."usr"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE INDEX
  IF NOT EXISTS "comment_slug_idx" ON "comment" ("slug");

--> statement-breakpoint
CREATE INDEX
  IF NOT EXISTS "comment_user_idx" ON "comment" ("user_id");