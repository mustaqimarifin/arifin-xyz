import { LoadingSpinner } from "@/components/Spinner";
import { MDX } from "@/components/mdx";
import { TADDViews } from "@/components/views";
import { formatDateXtra } from "@/utils/_date";
import { noteParam } from "@/utils/sortedContent";
import { allNotes } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = async () => noteParam.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
	const post = allNotes.find((p) => p.slug === params.slug);
	if (!post) {
		return;
	}

	const { title, date: publishedTime, summary: description, image } = post;
	const ogImage = image ? `https://arifin.xyz${image}` : `https://arifin.xyz/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `https://arifin.xyz/notes${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

const PostLayout = async ({ params: { slug } }) => {
	const post = allNotes.find((p) => p.slug === slug);

	if (!post) {
		notFound();
	}

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.title,
						datePublished: post.date,
						dateModified: post.date,
						description: post.summary,
						image: post.image ? `https://arifin.xyz${post.image}` : `https://arifin.xyz/og?title=${post.title}`,
						url: `https://arifin.xyz/notes${post.slug}`,
						author: {
							"@type": "Person",
							name: "Mustaqim Arifin",
						},
					}),
				}}
			/>
			<h1 className="post-title">{post.title}</h1>
			<div className="panel">
				<div className="date">{formatDateXtra(post.date)}</div>
				<Suspense fallback={<LoadingSpinner />}>
					<TADDViews slug={post.slug} />
				</Suspense>
			</div>
			<article>
				<MDX code={post.body.code} />
			</article>
		</section>
	);
};

export default PostLayout;
