import {
  type AnyPgColumn,
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  pgView,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import type { Tweet } from "react-tweet/api";
import { xId } from "./nanoid";
export const role = pgEnum("role", ["user", "admin", "blocked"]);
export const users = pgTable("user", {
  id: text("user_id")
    .primaryKey()
    .$defaultFn(() => xId()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: role("role").default("user"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const views = pgTable("view", {
  slug: text("slug").primaryKey(),
  count: integer("count").notNull(),
});

export const guestbook = pgTable("guestbook", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => xId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  parentId: text("parent_id").references((): AnyPgColumn => guestbook.id),
  body: text("body"),
  slug: text("slug"),
  date: timestamp("date").notNull().defaultNow(),
});

export const comments = pgTable(
  "comment",
  {
    id: serial("comment_id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    parentId: integer("parent_id").references((): AnyPgColumn => comments.id),
    slug: text("slug").notNull(),
    body: text("body"),
    date: timestamp("date").notNull().defaultNow(),
  },
  (c) => {
    return {
      commentSlugIdx: index("comment_slug_idx").on(c.slug),
      commentParentIdIdx: index("comment_parent_idx").on(c.parentId),
    };
  },
);

export const gbView = pgView("guestbook_view", {
  id: text("id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: integer("parent_id"),
  author: jsonb("author").$type<User>(),
}).existing();

export const commentWithAuthor = pgView("comment_with_author", {
  commentId: integer("comment_id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: integer("parent_id"),
  author: jsonb("author"),
}).existing();

export const commentsLinearView = pgView("comments_linear_view", {
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

export const commentsWithAuthorVotes = pgView("comments_with_author_votes", {
  commentId: integer("comment_id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: integer("parent_id"),
  author: jsonb("author"),
  votes: bigint("votes", { mode: "number" }),
  upvotes: bigint("upvotes", { mode: "number" }),
  downvotes: bigint("downvotes", { mode: "number" }),
});

export const commentsThread = pgView("comments_thread", {
  commentId: integer("comment_id"),
  slug: text("slug"),
  date: timestamp("date", { mode: "string" }),
  body: text("body"),
  userId: text("user_id"),
  parentId: integer("parent_id"),
  author: jsonb("author"),
  votes: bigint("votes", { mode: "number" }),
  upvotes: bigint("upvotes", { mode: "number" }),
  downvotes: bigint("downvotes", { mode: "number" }),
  depth: integer("depth"),
  path: integer("path"),
  pathVotesRecent: integer("pathVotesRecent"),
  pathLeastRecent: integer("pathLeastRecent"),
  pathMostRecent: integer("pathMostRecent"),
});
export const commentsThreadWithUserVote = pgView(
  "comments_thread_with_user_vote",
  {
    commentId: integer("comment_id"),
    slug: text("slug"),
    date: timestamp("date", { mode: "string" }),
    body: text("body"),
    userId: text("user_id"),
    parentId: integer("parent_id"),
    author: jsonb("author"),
    votes: bigint("votes", { mode: "number" }),
    upvotes: bigint("upvotes", { mode: "number" }),
    downvotes: bigint("downvotes", { mode: "number" }),
    depth: integer("depth"),
    path: integer("path"),
    pathVotesRecent: integer("pathVotesRecent"),
    pathLeastRecent: integer("pathLeastRecent"),
    pathMostRecent: integer("pathMostRecent"),
    userVoteValue: integer("userVoteValue"),
  },
);
export const stackType = pgEnum("stack_type", [
  "code",
  "productivity",
  "music",
  "misc",
]);

export const bookmarkType = pgEnum("bookmark_type", [
  "article",
  "blog",
  "video",
  "bodoh",
]);

//export const musicType = pgEnum('music_type', ['article', 'blog', 'video', 'bodoh'])

export const stacks = pgTable("stack", {
  id: serial("id").primaryKey(),
  type: stackType("type"),
  name: text("name"),
  url: text("url"),
  description: text("description"),
  featured: boolean("featured"),
  image: text("image"),
  date: timestamp("date").notNull().defaultNow(),
});

export const likes = pgTable(
  "likes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    commentId: integer("comment_id")
      .notNull()
      .references(() => comments.id, {
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

export const bookmarks = pgTable("bookmark", {
  id: serial("id").primaryKey(),
  type: bookmarkType("type"),
  name: text("name"),
  url: text("url"),
  description: text("description"),
  featured: boolean("featured"),
  image: text("image"),
  date: timestamp("date").notNull().defaultNow(),
});

export const votes = pgTable(
  "votes",
  {
    commentId: integer("comment_id")
      .notNull()
      .references(() => comments.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
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

export const tweets = pgTable("tweet", {
  key: text("key").primaryKey().notNull(),
  value: jsonb("value").$type<Tweet>().notNull(),
});

export type User = typeof users.$inferSelect; // return type when queried

export type Stack = typeof stacks.$inferSelect; // return type when queried
export type NewStack = typeof stacks.$inferInsert; // insert type

export type Comment = typeof comments.$inferSelect; // return type when queried
export type NewComment = typeof comments.$inferInsert; // insert type
export type PGTweet = typeof tweets.$inferSelect; // return type when queried
export type NewTweet = typeof tweets.$inferInsert; // insert type

export type Bookmark = typeof bookmarks.$inferSelect; // return type when queried
export type NewBookmark = typeof bookmarks.$inferInsert; // insert type
