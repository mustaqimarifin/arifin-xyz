do $$ declare
    r record;
begin
    for r in (select tablename from pg_tables where schemaname = 'public') loop
        execute 'drop table if exists ' || quote_ident(r.tablename) || ' cascade';
    end loop;
end $$;

---

DO $$ BEGIN CREATE TYPE bookmark_type AS ENUM('article', 'blog', 'video', 'bodoh');
EXCEPTION
WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN CREATE TYPE "ROLE" AS ENUM('BLOCKED', 'USER', 'ADMIN');
EXCEPTION
WHEN duplicate_object THEN null;
END $$;


DO $$ BEGIN CREATE TYPE stack_type AS ENUM('code', 'productivity', 'music', 'misc');
EXCEPTION
WHEN duplicate_object THEN null;
END $$;

CREATE TABLE verification_token (
    identifier TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL,
    PRIMARY KEY (identifier, token)
);

CREATE TABLE accounts (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE sessions (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    "sessionToken" TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id SERIAL,
    name TEXT,
    email TEXT,
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    role "ROLE" NOT NULL DEFAULT 'USER',
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS comments (
    id TEXT NOT NULL DEFAULT nanoid (),
    "userId" INTEGER NOT NULL,
    "parentId" TEXT,
    slug TEXT NOT NULL,
    body TEXT,
    date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS bookmarks (
    id TEXT NOT NULL DEFAULT nanoid (),
    type bookmark_type,
    name TEXT,
    url TEXT,
    description TEXT,
    featured BOOLEAN,
    image TEXT,
    date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS stacks (
    id TEXT NOT NULL DEFAULT nanoid (),
    type stack_type,
    name TEXT,
    url TEXT,
    description TEXT,
    featured BOOLEAN,
    image TEXT,
    date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS tweets (
    key TEXT PRIMARY KEY NOT NULL,
    value jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS views (
    slug TEXT PRIMARY KEY NOT NULL,
    COUNT INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS guests (
    id serial PRIMARY KEY NOT NULL,
    "userId" INTEGER NOT NULL,
    body TEXT,
    date TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
ALTER TABLE
    comments
ADD
    CONSTRAINT comment_user_id_fk FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
ALTER TABLE
    comments
ADD
    CONSTRAINT comment_parent_fk FOREIGN KEY ("parentId") REFERENCES comments(id) ON DELETE no action ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
ALTER TABLE
    guests
ADD
    CONSTRAINT guestbook_user_id_fk FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
ALTER TABLE
    sessions
ADD
    CONSTRAINT session_user_id_fk FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
ALTER TABLE
    accounts
ADD
    CONSTRAINT account_user_id_fk FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS comment_slug_idx ON comments (slug);

CREATE INDEX IF NOT EXISTS comment_user_idx ON comments ("userId");

CREATE MATERIALIZED VIEW guestview AS
SELECT
    g.id,
    g."date",
    g.body,
    g."userId",
    JSONB_BUILD_OBJECT(
        'id',
        u."id",
        'name',
        u.name,
        'email',
        u.email,
        'image',
        u.image,
        'role',
        u.role
    ) AS author
FROM
    guests g
    INNER JOIN users u ON g."userId" = u."id";

CREATE MATERIALIZED VIEW commentview AS
SELECT
    g.id,
    g."date",
    g.body,
    g."parentId",
    g.slug,
    JSONB_BUILD_OBJECT(
        'id',
        u."id",
        'name',
        u.name,
        'image',
        u.image,
        'role',
        u.role
    ) AS author
FROM
    comments g
    INNER JOIN users u ON g."userId" = u."id";
