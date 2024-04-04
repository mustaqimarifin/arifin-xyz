"use server";

import { unstable_noStore as noStore } from "next/cache";
import { turso } from "./postgres";

export async function getGuestbookEntries() {
  if (!process.env.TURSO_URL) {
    return [];
  }
  noStore();
  const { rows } = await turso.execute(
    "SELECT * FROM guestbook ORDER BY created_at DESC LIMIT 100",
  );
  //console.log(posts.rows)
  return rows;
}

export async function getViewsCount() {
  if (!process.env.TURSO_URL) {
    return [];
  }
  noStore();
  return await turso.execute("SELECT * FROM views").then(({ rows }) => {
    {
      rows[0].slug, rows[0].count;
    }
    [];
  });
}
