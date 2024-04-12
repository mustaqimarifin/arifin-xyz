import { auth } from "app/auth";
import { redirect } from "next/navigation";
import Form from "./form";
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

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">admin</h1>
      <Form entries={entries} />
    </section>
  );
}
