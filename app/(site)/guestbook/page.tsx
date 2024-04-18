import { db } from "@/db";
import { guestbook, users } from "@/db/schema";
import { auth } from "app/auth";
import { desc, eq } from "drizzle-orm";
import { Suspense } from "react";
import { Avatar } from "../../components/Avatar";
import { SignIn, SignOut } from "./buttons";
import Form from "./form";

export const metadata = {
	title: "Guestbook",
	description: "Sign my guestbook and leave your mark.",
};

export default async function GuestbookPage() {
	return (
		<section>
			<h1 className=" mb-4 text-3xl font-black tracking-tight text-black md:text-5xl dark:text-white">Leave a Text!</h1>{" "}
			<div className="w-full flex flex-col space-y-1 mb-4 h-dvh ">
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
		.from(guestbook)
		.leftJoin(users, eq(users.id, guestbook.userId))
		.limit(100)
		.orderBy(desc(guestbook.date));

	if (rows.length === 0) {
		return null;
	}

	return rows.map((entry) => (
		<div key={entry.guestbook.id} className=" flex flex-col items-center justify-between space-x-4 space-y-1 mb-4">
			<div className="flex items-center  w-full text-sm break-words">
				<div className="inline-flex mr-4">
					<Avatar user={entry.user} src={entry.user?.image} quality={100} className="rounded-full" />
				</div>
				<span className="text-neutral-600 dark:text-neutral-400 mr-4">{entry.user?.name}:</span>
				{entry.guestbook.body}
			</div>
		</div>
	));
}
