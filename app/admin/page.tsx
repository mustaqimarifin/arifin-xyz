import { auth } from "app/auth";
import { redirect } from "next/navigation";
import Form from "./form";
import { db } from "@/db";
import { guestbook, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getGuestbookEntries } from "@/db/actions";

export const metadata = {
  title: "Admin",
};

export default async function GuestbookPage() {
  let session = await auth();
  if (session?.user?.email !== "mustaqim.arifin@gmail.com") {
    redirect("/");
  }

  let entries = await getGuestbookEntries();
  /* const rows = await db
    .select()
    .from(guestbook)
    .leftJoin(users, eq(users.id, guestbook.userId))
    .limit(100)
    .orderBy(desc(guestbook.date)); */
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">admin</h1>
      <Form entries={entries} />
    </section>
  );
}
