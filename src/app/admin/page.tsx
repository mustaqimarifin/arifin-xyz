import { Header } from "@/components/server";
import { getGuestbookEntries } from "@/db/actions";
import { auth } from "@/db/auth";
import { redirect } from "next/navigation";
import Form from "./form";

export const metadata = {
  title: "Admin",
};

export default async function GuestbookPage() {
  const session = await auth();
  if (session?.user?.email !== "mustaqim.arifin@gmail.com") {
    redirect("/");
  }

  const entries = await getGuestbookEntries();

  return (
    <section>
      <Header title={metadata.title} />
      <Form entries={entries} />
    </section>
  );
}
