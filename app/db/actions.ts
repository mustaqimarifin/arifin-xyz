"use server";

import { auth } from "app/auth";
import { type Session } from "next-auth";
import { turso } from "./postgres";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { rdx } from "./redis";
import { xId } from "./nanoid";

export async function increment(slug: string) {
  noStore();
  await rdx.incr(["pageviews", slug].join(":"));
}

export async function inc(slug: string) {
  noStore();
  await turso.execute({
    sql: "INSERT INTO views (slug, count) VALUES (?, 1) ON CONFLICT (slug) DO UPDATE SET count = views.count + 1",
    args: [slug],
  });
}

async function getSession(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function saveGuestbookEntry(formData: FormData) {
  const session = await getSession();
  const email = session.user?.email as string;
  const created_by = session.user?.name as string;
  const avatar = session.user?.image as string;

  const id = xId();
  if (!session.user) {
    throw new Error("Unauthorized");
  }

  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);

  await turso.batch(
    [
      {
        sql: "INSERT INTO guestbook (id, email, body, created_by, created_at, avatar) VALUES (?,?,?,?,?,?)",
        args: [id, email, body, created_by, Date.now(), avatar],
      },
    ],
    "write",
  );

  revalidatePath("/guestbook");

  const data = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "guestbook@arifin.xyz",
      to: "me@arifin.xyz",
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

  if (email !== "me@arifin.xyz") {
    throw new Error("Unauthorized");
  }

  const selectedEntriesAsNumbers = selectedEntries.map(Number);
  const arrayLiteral = `{${selectedEntriesAsNumbers.join(",")}}`;

  /*   await sql`
    DELETE FROM guestbook
    WHERE id = ANY(${arrayLiteral}::int[])
  `; */

  await turso.batch(
    [
      {
        sql: "delete from guestbook where id = ?",
        args: [`ANY(${arrayLiteral}::int[])`],
      },
    ],
    "write",
  );

  revalidatePath("/admin");
  revalidatePath("/guestbook");
}
