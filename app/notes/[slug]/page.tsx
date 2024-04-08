import type { Metadata } from "next";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { postParam } from "app/utils/sortedContent";
import { formatDateXtra } from "@/app/utils/_date";
import { allNotes } from "contentlayer/generated";
import { AddViews, TADDViews } from "@/app/components/views";

export const generateStaticParams = async () =>
  postParam.map((p) => ({ slug: p.slug }));

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allNotes.find((p) => p.slug === params.slug);
  if (!post) {
    return;
  }

  let { title, date: publishedTime, summary: description, image } = post;
  let ogImage = image
    ? `https://arifin.xyz${image}`
    : `https://arifin.xyz/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://arifin.xyz/notes/${post.slug}`,
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
            image: post.image
              ? `https://arifin.xyz${post.image}`
              : `https://arifin.xyz/og?title=${post.title}`,
            url: `https://arifin.xyz/notes/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Mustaqim Arifin",
            },
          }),
        }}
      />
      <h1 className="text-2xl max-w-[650px]">{post.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDateXtra(post.date)}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          <TADDViews slug={post.slug} />
        </Suspense>
      </div>
      <article>
        <CustomMDX code={post.body.code} />
      </article>
    </section>
  );
};

export default PostLayout;
