import NoteLayout from "@/app/components/NoteLayout";
import { LoadingSpinner } from "@/app/components/Spinner";
import Tag from "@/app/components/Tag";
import { formatDate } from "@/utils/_date";
import { notes } from "@/utils/sortedContent";
import Link from "next/link";
import { Suspense } from "react";
import { TViews } from "../../components/views";

export const metadata = {
	title: "Notes",
	description: "Read my thoughts on software development, design, and more.",
};

const RSCNoteLayout = () => {
	return (
		<NoteLayout notes={notes} />
		/* 	<section className="h-dvh">
			<div className="font-black text-3xl mb-8">Notes</div>
			<ul>
				{notes.map((post) => (
					<li key={post.slug}>
						<Link className="flex flex-col space-y-1 mb-6  " href={`/notes/${post.slug}`}>
							<div className=" flex flex-col  ">
								<h2 className="text-neutral-900 dark:text-neutral-100">{post.title}</h2>
								<div className="flex-1 mr-4 text-neutral-600 dark:text-neutral-400 font-mono font-bold tabular-nums text-xs uppercase">
									{formatDate(post.date)}
									<Suspense fallback={<p className="h-6" />}>
										<TViews slug={post.slug} />
									</Suspense>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section> */
	);
};

export default RSCNoteLayout;
