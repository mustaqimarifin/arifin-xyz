import { auth } from "app/auth";
import { redirect } from "next/navigation";
import Form from "./form";
import { turso } from "../db/turso";

export const metadata = {
  title: "Admin",
};

export default async function GuestbookPage() {
  let session = await auth();
  if (session?.user?.email !== "me@arifin.xyz") {
    redirect("/");
  }

  const {rows} = await turso.execute(
    "SELECT * FROM guestbook ORDER BY created_at DESC LIMIT 100",
  );
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">admin</h1>
      <Form entries={rows} />
    </section>
  );
}
