"use client";
import { useState } from "react";

import { allCoreContent, sortPosts } from "@/utils/sortedContent";
//import type { Note } from "contentlayer/generated";
import NoteList from "./NoteList";
import { PageTitle } from "./PageTitle";

export default function NoteLayout({ posts }) {
	const [searchValue, setSearchValue] = useState("");
	const sortedPosts = allCoreContent(sortPosts(posts));
	const filterednotes = sortedPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));

	return (
		<section className="h-dvh">
			<div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-4 ">
				<PageTitle>Notes</PageTitle>
				<p className="mb-4 prose text-gray-600 dark:text-gray-400">
					{`I've been writing online since 2014, mostly about web development and tech careers.
            In total, I've written ${posts.length} articles on this site.
            Use the search below to filter by title.`}
				</p>
				<div className="relative w-full mb-4">
					<input
						aria-label="Search articles"
						type="text"
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search articles"
						className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-gray-100"
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
				{/*         {!searchValue && (
          <>
            <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
              Most Popular
            </h3>
            <BlogPost
              title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
              summary="A deep-dive on everything I've learned in the past year building style guides, design systems, component libraries, and their best practices."
              slug="style-guides-component-libraries-design-systems"
            />
            <BlogPost
              title="How Stripe Designs Beautiful Websites"
              summary="Examining the tips and tricks used to make Stripe's website design a notch above the rest."
              slug="how-stripe-designs-beautiful-websites"
            />
            <BlogPost
              title="Creating a Monorepo with Lerna & Yarn Workspaces"
              summary="In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process."
              slug="monorepo-lerna-yarn-workspaces"
            />
          </>
        )} */}
				<h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
					All Posts
				</h3>
				{!filterednotes.length && <p className="mb-4 text-gray-600 dark:text-gray-400">No posts found.</p>}
				{filterednotes.map((post) => (
					<NoteList key={post.slug} {...post} />
				))}
			</div>
		</section>
	);
}
