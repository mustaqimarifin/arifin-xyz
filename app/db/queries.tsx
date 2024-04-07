"use server";

import { unstable_noStore as noStore } from "next/cache";
import { turso } from "./postgres";
import { tursoURL } from "../utils/env";

export async function getGuestbookEntries() {
  if (!tursoURL) {
    return [];
  }
  noStore();
  const { rows } = await turso.execute(
    "SELECT * FROM guestbook ORDER BY created_at DESC LIMIT 100",
  );
  //console.log(posts.rows)
  return rows;
}
