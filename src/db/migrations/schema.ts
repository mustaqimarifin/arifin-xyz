import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  foreignKey,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const bookmarkType = pgEnum("bookmark_type", [
  "bodoh",
  "video",
  "blog",
  "article",
]);
export const role = pgEnum("role", ["blocked", "admin", "user"]);
export const stackType = pgEnum("stack_type", [
  "misc",
  "music",
  "productivity",
  "code",
]);

export const bookmark = pgTable("bookmark", {
  id: serial("id").primaryKey().notNull(),
  type: bookmarkType("type"),
  name: text("name"),
  url: text("url"),
  description: text("description"),
  featured: boolean("featured"),
  image: text("image"),
  date: timestamp("date", { mode: "string" }).defaultNow().notNull(),
});

export const session = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.userId, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "string" }).notNull(),
});

export const stack = pgTable("stack", {
  id: serial("id").primaryKey().notNull(),
  type: stackType("type"),
  name: text("name"),
  url: text("url"),
  description: text("description"),
  featured: boolean("featured"),
  image: text("image"),
  date: timestamp("date", { mode: "string" }).defaultNow().notNull(),
});

export const view = pgTable("view", {
  slug: text("slug").primaryKey().notNull(),
  count: integer("count").notNull(),
});

export const user = pgTable("user", {
  userId: text("user_id").primaryKey().notNull(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "string" }),
  image: text("image"),
  role: role("role").default("user"),
});

export const comment = pgTable(
  "comment",
  {
    commentId: serial("comment_id").primaryKey().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.userId, { onDelete: "cascade" }),
    parentId: integer("parent_id"),
    slug: text("slug").notNull(),
    body: text("body"),
    date: timestamp("date", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      slugIdx: index("comment_slug_idx").on(table.slug),
      parentIdx: index("comment_parent_idx").on(table.parentId),
      commentParentIdCommentCommentIdFk: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.commentId],
        name: "comment_parent_id_comment_comment_id_fk",
      }),
    };
  },
);

export const tweet = pgTable("tweet", {
  key: text("key").primaryKey().notNull(),
  value: jsonb("value").notNull(),
});

export const commentsLinearView = pgTable("comments_linear_view", {
  commentId: integer("comment_id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: integer("parent_id"),
  author: jsonb("author"),
  parent: jsonb("parent"),
  replies: jsonb("replies"),
});

export const commentWithAuthor = pgTable("comment_with_author", {
  commentId: integer("comment_id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: integer("parent_id"),
  author: jsonb("author"),
});

export const commentsWithAuthorVotes = pgTable("comments_with_author_votes", {
  commentId: integer("comment_id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: integer("parent_id"),
  author: jsonb("author"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  votes: bigint("votes", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  upvotes: bigint("upvotes", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  downvotes: bigint("downvotes", { mode: "number" }),
});

export const commentsThread = pgTable("comments_thread", {
  commentId: integer("comment_id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: integer("parent_id"),
  author: jsonb("author"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  votes: bigint("votes", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  upvotes: bigint("upvotes", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  downvotes: bigint("downvotes", { mode: "number" }),
  depth: integer("depth"),
  path: integer("path"),
  pathVotesRecent: integer("pathVotesRecent"),
  pathLeastRecent: integer("pathLeastRecent"),
  pathMostRecent: integer("pathMostRecent"),
});

export const commentsThreadWithUserVote = pgTable(
  "comments_thread_with_user_vote",
  {
    commentId: integer("comment_id"),
    slug: text("slug"),
    date: timestamp("date", { mode: "string" }),
    body: text("body"),
    userId: text("user_id"),
    parentId: integer("parent_id"),
    author: jsonb("author"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    votes: bigint("votes", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    upvotes: bigint("upvotes", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    downvotes: bigint("downvotes", { mode: "number" }),
    depth: integer("depth"),
    path: integer("path"),
    pathVotesRecent: integer("pathVotesRecent"),
    pathLeastRecent: integer("pathLeastRecent"),
    pathMostRecent: integer("pathMostRecent"),
    userVoteValue: integer("userVoteValue"),
  },
);

export const guestbook = pgTable(
  "guestbook",
  {
    id: text("id").primaryKey().notNull(),
    parentId: text("parent_id"),
    slug: text("slug"),
    userId: text("user_id")
      .notNull()
      .references(() => user.userId, { onDelete: "cascade" }),
    body: text("body"),
    date: timestamp("date", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      gbParentIdGbIdFk: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: "gb_parent_id_gb_id_fk",
      }),
    };
  },
);

export const guestbookView = pgTable("guestbook_view", {
  id: text("id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: text("parent_id"),
  author: jsonb("author"),
});

export const likes = pgTable(
  "likes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.userId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    commentId: integer("comment_id")
      .notNull()
      .references(() => comment.commentId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      likesPkey: primaryKey({
        columns: [table.userId, table.commentId],
        name: "likes_pkey",
      }),
    };
  },
);

export const verificationToken = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      verificationTokenIdentifierTokenPk: primaryKey({
        columns: [table.identifier, table.token],
        name: "verificationToken_identifier_token_pk",
      }),
    };
  },
);

export const votes = pgTable(
  "votes",
  {
    commentId: integer("comment_id")
      .notNull()
      .references(() => comment.commentId),
    userId: text("user_id")
      .notNull()
      .references(() => user.userId),
    value: integer("value").notNull(),
  },
  (table) => {
    return {
      votesPkey: primaryKey({
        columns: [table.commentId, table.userId],
        name: "votes_pkey",
      }),
    };
  },
);

export const account = pgTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.userId, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => {
    return {
      accountProviderProviderAccountIdPk: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: "account_provider_providerAccountId_pk",
      }),
    };
  },
);
