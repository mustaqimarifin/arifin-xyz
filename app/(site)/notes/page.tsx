import { formatDate } from "@/utils/_date";
import { notes } from "@/utils/sortedContent";
import Link from "next/link";
import { Suspense } from "react";
import { TViews } from "../../components/views";

export const metadata = {
	title: "Notes",
	description: "Read my thoughts on software development, design, and more.",
};
//export const generateStaticParams = async () => notes.map((p) => ({ slug: p.slug }));

const NoteLayout = () => {
	//const noates = notes.find((p) => p.slug === slug);
	return (
		<section>
			<div className="font-black text-3xl mb-8 ">Notes</div>
			{notes?.map((post) => (
				<Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/notes/${post.slug}`}>
					<div className="w-full flex flex-col ">
						<h2 className="text-neutral-900 dark:text-neutral-100">{post.title}</h2>
						<div className="flex-1 mr-4 text-neutral-600 dark:text-neutral-400 font-mono font-bold  tabular-nums text-xs uppercase">
							{formatDate(post.date)}
							<Suspense fallback={<p className="h-6" />}>
								<TViews slug={post.slug} />
							</Suspense>
						</div>
					</div>
				</Link>
			))}
		</section>
	);
};

export default NoteLayout;
