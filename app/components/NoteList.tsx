import { fetcher } from "@/utils";
import { formatDate } from "@/utils/_date";
import Link from "next/link";
import { Suspense } from "react";
import useSWR from "swr";
import { TViewCounter } from "../(site)/notes/view-counter";

type Views = {
	slug: string;
	count: number;
};

export default function NoteList({ title, date, slug }) {
	const { data: views } = useSWR<Views[]>(`/api/views`, fetcher);

	return (
		<Link className="flex flex-col space-y-1 mb-6  " href={`/notes/${slug}`}>
			<div className=" flex flex-col  ">
				<h2 className="text-neutral-900 dark:text-neutral-100">{title}</h2>
				<div className="flex-1 mr-4 text-neutral-600 dark:text-neutral-400 font-mono font-bold tabular-nums text-xs uppercase">
					{formatDate(date)}
					<Suspense>
						<TViewCounter allViews={views} slug={slug} />
					</Suspense>
				</div>
			</div>
		</Link>
	);
}
