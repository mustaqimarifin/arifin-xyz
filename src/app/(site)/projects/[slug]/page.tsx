import { MDX } from "@/components/mdx";
import { TADDViews } from "@/db/actions";
import { formatDateXtra } from "@/utils/_date";
import { projectParam } from "@/utils/sortedContent";
import { allProjects } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = async () =>
  projectParam.map((p) => ({ slug: p.slug }));

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allProjects.find((p) => p.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, year: publishedTime, description, image } = post;
  const ogImage = image
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
  const post = allProjects.find((p) => p.slug === slug);

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
            datePublished: post.year,
            dateModified: post.year,
            description: post.description,
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
            {formatDateXtra(post.year)}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          <TADDViews slug={post.slug} />
        </Suspense>
      </div>
      <article className="mdx">
        <MDX code={post.body.code} />
      </article>
    </section>
  );
};

export default PostLayout;
