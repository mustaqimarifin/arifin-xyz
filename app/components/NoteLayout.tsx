"use client";
import { useState } from "react";

import NoteList from "./NoteList";
import { PageTitle } from "./PageTitle";

export default function NoteLayout({ posts, notes, years }) {
	const [searchValue, setSearchValue] = useState("");
	const filterednotes = posts?.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));

	return (
		<section className="h-dvh">
			<div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
				<PageTitle>Notes</PageTitle>
				<p className="mb-4 text-neutral-900 dark:text-neutral-100">
					{`I've been writing online since 2014, mostly about web development and tech careers.
            In total, I've written ${notes.length} articles on this site.
            Use the search below to filter by title.`}
				</p>
				<div className="relative w-full mb-4">
					<input
						aria-label="Search articles"
						type="text"
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search articles"
						className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-pink-500 focus:border-pink-500 dark:bg-stone-600 dark:text-gray-100"
					/>
					<svg
						className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<div className="mt-8 mb-2" />
				{!filterednotes.length && <p className="mb-4 text-gray-600 dark:text-gray-400">No posts found.</p>}
				{years.map((year) => (
					<section key={year} className="space-y-4">
						<div className="font-semibold font-mono text-sm text-black dark:text-gray-300 hover:dark:text-pink-300">
							{year}
						</div>
						<div>
							<ul className="flex flex-col gap-4">
								{notes[year].map((post) => (
									<li key={post.slug}>
										<NoteList {...post} />
									</li>
								))}
							</ul>
						</div>
					</section>
				))}
			</div>
		</section>
	);
}
