"use server";

import { TViewCounter, ViewCounter } from "@/components/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { Session } from "next-auth";
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
  revalidatePath,
} from "next/cache";
import { env } from "site.config";
import { z } from "zod";
import { db } from ".";
import { auth } from "./auth";
import {
  type Comment,
  type NewComment,
  commentWithAuthor,
  comments,
  commentsLinearView,
  commentsThread,
  commentsThreadWithUserVote,
  commentsWithAuthorVotes,
  gbView,
  guestbook,
  likes,
  users,
  views,
} from "./pg-schema";

const getViews = cache(
  async (): Promise<{ slug: string; count: number }[]> => {
    const res = await db.select().from(views);

    return res as Views[];
  },
  ["views"],
  {
    revalidate: 86400,
  },
);

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!db) {
    return [];
  }
  noStore();
  const res = await db.select().from(views);
  //console.log(res)
  return res as Views[];
}

export async function TViews({ slug }: { slug: string }) {
  const views = await getViews();
  return <TViewCounter allViews={views} slug={slug} />;
}

export async function TADDViews({ slug }: { slug: string }) {
  const views = await ink(slug);
  //const views = await getViewsCount();
  return <ViewCounter views={views} />;
}

async function ink(slug: string) {
  noStore();
  const res = await db
    .insert(views)
    .values({ count: 1, slug: slug })
    .onConflictDoUpdate({
      target: views.slug,
      set: { count: sql`${views.count} + 1` },
    })
    .returning({ count: views.count });

  return res[0].count;
}

type Views = {
  slug: string;
  count: number;
};

async function getSession(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

const formSchema = z.object({
  parentId: z.string().optional(),
  slug: z.string(),
  body: z.string(),
});

export async function saveGuestbookEntry(formData: FormData) {
  const session = await getSession();
  const userId = session.userId;
  const email = session.user?.email as string;
  const zdata = formSchema.parse(Object.fromEntries(formData));

  //let id = xId();
  if (!session.user) {
    throw new Error("Unauthorized");
  }
  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);
  //let data = { body , userId }

  await db
    .insert(guestbook)
    .values({ ...zdata, userId })
    .returning();

  /*   await turso.execute(
    
      {
        sql: "INSERT INTO guestbookB (userId, body, created_at) VALUES (?,?,?)",
        args: [userId, body, Date.now()],
      },
    
    
  ); */

  revalidatePath("/guestbook");

  const data = await fetch(env.resendAdd, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendSecret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "mus@arifin.xyz",
      to: "mus@arifin.xyz",
      subject: "New Guestbook Entry",
      html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
    }),
  });

  const response = await data.json();
  console.log("Email sent", response);
}

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  const session = await getSession();
  const email = session.user?.email as string;

  if (email !== env.adminEmail) {
    throw new Error("Unauthorized");
  }

  const selectedEntriesAsNumbers = selectedEntries.map(Number);
  const arrayLiteral = `{${selectedEntriesAsNumbers.join(",")}}`;

  /*   await sql`
    DELETE FROM guestbook
    WHERE id = ANY(${arrayLiteral}::int[])
  `; */
  await db
    .delete(guestbook)
    .where(eq(guestbook.id, sql`ANY(${arrayLiteral}::int[])`))
    .returning();
  /*  await turso.batch(
    [
      {
        sql: "delete from guestbookB where id = ?",
        args: [`ANY(${arrayLiteral}::int[])`],
      },
    ],
    "write",
  ); */

  revalidatePath("/admin");
  revalidatePath("/guestbook");
}

type GB = {
  slug?: string;
};
export async function getGuestbookEntries() {
  if (!db) {
    return [];
  }

  noStore();
  return db.select().from(gbView); //.where(eq(gbView.slug, slug)).limit(100).orderBy(desc(gbView.date))
}

/* 
export async function getComments(slug) {
  const x = await db.select().from(comments).leftJoin(users, eq(users.id, comments.userId)).where(eq(comments.slug, slug))
  console.log(x)
  return x
} */

export async function getComments(slug) {
  const x = await db
    .select()
    .from(commentWithAuthor)
    .where(eq(commentWithAuthor.slug, slug));
  console.log(x);
  return x;
}

/* export async function addComment() {
  let formData: FormData
  const session = await getSession()
  const userId = session.userId
  const entry = formData.get('entry')?.toString() || ''
  const body = entry.slice(0, 1000)
  const data = formSchema.parse(Object.fromEntries(formData))

  let zdata = {userId: userId, body: body, slug: data.slug, parentId: data.parentId}

  const x = await db.insert(comments).values(zdata).returning()
  return {...x}
} */
const insertCommentSchema = createInsertSchema(comments).pick({
  //userId: true,
  body: true,
  slug: true,
  parentId: true,
});
type InsertComment = z.infer<typeof insertCommentSchema>;
export const addComment = async (payload: InsertComment) => {
  const session = await getSession();
  const comment = insertCommentSchema.parse(payload);

  const query = await db
    .insert(comments)
    .values({ body: comment.body, slug: comment.slug, userId: session.userId })
    .returning();

  return query;
};

export const deleteComment = async ({ id }) => {
  //const comment = insertCommentSchema.parse(payload)

  await db.delete(comments).where(eq(comments.id, id));
};

const updateCommentSchema = createInsertSchema(comments).pick({
  //userId: true,
  body: true,
  id: true,
});
type UpComment = z.infer<typeof updateCommentSchema>;
export const updateComment = async (payload: UpComment) => {
  const session = await getSession();
  const comment = updateCommentSchema.parse(payload);

  await db
    .update(comments)
    .set({ body: comment.body })
    .where(eq(comments.id, comment.id!));
};

const toggleSchema = createSelectSchema(likes).pick({
  commentId: true,
});
type ToggleLike = z.infer<typeof toggleSchema>;

export const toggleLikes = async (payload: ToggleLike) => {
  const session = await getSession();
  const toggle = toggleSchema.parse(payload);

  const like = await db
    .select()
    .from(likes)
    .where(
      and(eq(users.id, session.userId), eq(comments.id, toggle.commentId)),
    );

  if (like === null) {
    return await db
      .insert(likes)
      .values({ commentId: toggle.commentId, userId: session.userId })
      .then(() => {
        return { addLike: true };
      });
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return await db
      .delete(likes)
      .where(
        and(eq(users.id, session.userId), eq(comments.id, toggle.commentId)),
      )
      .then(() => {
        return { addLike: false };
      });
  }
};
