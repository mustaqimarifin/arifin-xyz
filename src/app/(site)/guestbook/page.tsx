import styles from "$$/page/gb.module.css";
import { Avatar } from "@/components/client";
import { Header } from "@/components/server";
import { db } from "@/db";
import { auth } from "@/db/auth";
import { gbView } from "@/db/pg-schema";
import { desc } from "drizzle-orm";

import { SignIn, SignOut } from "./buttons";
import Form from "./form";

export const metadata = {
  title: "Guestbook",
  description: "sup?!",
};

export default async function GuestbookPage() {
  return (
    <section>
      <Header title={metadata.title} description={metadata.description} />
      <div className={styles.page}>
        <GuestbookForm />
        <GuestbookEntries />
      </div>
    </section>
  );
}

async function GuestbookForm() {
  const session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  const rows = await db
    .select()
    .from(gbView)
    .limit(100)
    .orderBy(desc(gbView.date));
  /*   const rows = await db
    .select()
    .from(guestbook)
    .leftJoin(users, eq(users.id, guestbook.userId))
    .limit(100)
    .orderBy(desc(guestbook.date)); */

  if (rows.length === 0) {
    return null;
  }

  return rows.map((entry) => (
    <div key={entry.id} className={styles["entry-ow"]}>
      <div className={styles["entry-iw"]}>
        <div className="inline-flex mr-4">
          <Avatar src={entry.author?.image!} className="rounded-full" />
        </div>
        <span className="mr-4 text-pretty">{entry.author?.name}:</span>
        {entry.body}
      </div>
    </div>
  ));
}
