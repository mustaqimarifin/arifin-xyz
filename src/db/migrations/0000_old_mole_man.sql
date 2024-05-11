DO
  $$ BEGIN
 CREATE TYPE "bookmark_type" AS ENUM('article', 'blog', 'video', 'bodoh');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin', 'blocked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 CREATE TYPE "stack_type" AS ENUM('code', 'productivity', 'music', 'misc');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "account" (
    "user_id" text NOT NULL,
    "type" text NOT NULL,
    "provider" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text,
    CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider", "providerAccountId")
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "bookmark" (
    "id" serial PRIMARY KEY NOT NULL,
    "type" "bookmark_type",
    "name" text,
    "url" text,
    "description" text,
    "featured" boolean,
    "image" text,
    "date" timestamp DEFAULT now() NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "comment" (
    "comment_id" serial PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,
    "parent_id" integer,
    "slug" text NOT NULL,
    "body" text,
    "date" timestamp DEFAULT now() NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "guestbook" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "slug" text,
    "user_id" text NOT NULL,
    "body" text,
    "date" timestamp DEFAULT now() NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "session" (
    "sessionToken" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,
    "expires" timestamp NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "stack" (
    "id" serial PRIMARY KEY NOT NULL,
    "type" "stack_type",
    "name" text,
    "url" text,
    "description" text,
    "featured" boolean,
    "image" text,
    "date" timestamp DEFAULT now() NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "tweet" ("key" varchar(255), "value" text);

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "user" (
    "user_id" text PRIMARY KEY NOT NULL,
    "name" text,
    "email" text NOT NULL,
    "emailVerified" timestamp,
    "image" text,
    "role" "role" DEFAULT 'user'
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "verificationToken" (
    "identifier" text NOT NULL,
    "token" text NOT NULL,
    "expires" timestamp NOT NULL,
    CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier", "token")
  );

--> statement-breakpoint
CREATE TABLE
  IF NOT EXISTS "view" (
    "slug" text PRIMARY KEY NOT NULL,
    "count" integer NOT NULL
  );

--> statement-breakpoint
CREATE INDEX
  IF NOT EXISTS "comment_slug_idx" ON "comment" ("slug");

--> statement-breakpoint
CREATE INDEX
  IF NOT EXISTS "comment_parent_idx" ON "comment" ("parent_id");

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_parent_id_comment_comment_id_fk" FOREIGN KEY ("parent_id") REFERENCES "comment"("comment_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "guestbook" ADD CONSTRAINT "guestbook_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO
  $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;