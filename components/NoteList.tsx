import { fetcher } from "@/utils";
import { formatDate } from "@/utils/_date";
import { Suspense } from "react";
import useSWR from "swr";
import { TViewCounter } from "../app/(site)/notes/view-counter";
import { Link } from "./link";

type Views = {
	slug: string;
	count: number;
};

/* export default function NoteList(props) {
	const { slug, title, date } = props;
	const { data: views } = useSWR<Views[]>(`/api/views`, fetcher);

	return (
		<Link className="flex flex-col space-y-1 mb-6" href={`/notes/${slug}`}>
			<div className=" flex flex-col">
				<h2 className="text-neutral-900 dark:text-neutral-100">{title}</h2>
				<div className="flex-1 space-y-1 justify-between items-center  text-neutral-600 dark:text-neutral-400 font-bold font-mono tabular-nums text-xs uppercase">
					{formatDate(date)}
					<Suspense>
						<TViewCounter allViews={views} slug={slug} />
					</Suspense>
				</div>
			</div>
		</Link>
	);
} */

export default function NoteList(props) {
	const { slug, title, date } = props;
	const { data: views } = useSWR<Views[]>(`/api/views`, fetcher);

	return (
		<Link className="nl1" href={`/notes/${slug}`}>
			<div className="nl2">
				<h2>{title}</h2>
				<div className="panel">
					{formatDate(date)}
					<Suspense>
						<TViewCounter allViews={views} slug={slug} />
					</Suspense>
				</div>
			</div>
		</Link>
	);
}