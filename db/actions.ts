"use server";
import { env } from "@/site.config.mjs";
import { auth } from "app/auth";
import { desc, eq, sql } from "drizzle-orm";
import type { Session } from "next-auth";
import { unstable_cache as cache, unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from ".";
import { guestbook, users, views } from "./schema";

export const getViews = cache(
	async (): Promise<{ slug: string; count: number }[]> => {
		const res = await db.select().from(views);

		return res as Views[];
	},
	["views"],
	{
		revalidate: 86400,
	},
);

export async function getViewsCount(): Promise<{ slug: string; count: number }[]> {
	if (!db) {
		return [];
	}
	noStore();
	const res = await db.select().from(views);
	//console.log(res)
	return res as Views[];
}

export async function ink(slug: string) {
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

export async function saveGuestbookEntry(formData: FormData) {
	const session = await getSession();
	const userId = session.userId;
	const email = session.user?.email as string;
	//let avatar = session.user?.image as string;

	//let id = xId();
	if (!session.user) {
		throw new Error("Unauthorized");
	}
	const entry = formData.get("entry")?.toString() || "";
	const body = entry.slice(0, 500);
	//let data = { body , userId }

	await db.insert(guestbook).values({ body: body, userId: userId, date: new Date() }).returning();

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

export async function getGuestbookEntries() {
	if (!db) {
		return [];
	}

	noStore();
	return db
		.select()
		.from(guestbook)
		.leftJoin(users, eq(users.id, guestbook.userId))
		.limit(100)
		.orderBy(desc(guestbook.date));
}
