//import Comments from '@/components/comments'
import { MDX } from "@/components/mdx";
import { CoverPix, PagePanel, Section } from "@/components/server";
import { TADDViews } from "@/db/actions";
import MDXLayout from "@/layouts/mdxLayout";
import { sortedNotes } from "@/utils/sortedContent";
import { allNotes } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = async () =>
  sortedNotes.map((p) => ({ slug: p.slug }));

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = sortedNotes.find((p) => p.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, date: publishedTime, summary: description, image } = post;
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

const NoteLayout = async ({ params: { slug } }) => {
  const post = allNotes.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Section className="!pt-0">
        <PagePanel
          title={post.title}
          date={post.date}
          readTime={post.readTime}
          tags={post.tags}
        />
      </Section>
      {post.image && <CoverPix src={post.image} alt={"Thumbnail"} />}
      <Section>
        <MDXLayout>
          <MDX code={post.body.code} />
          {/* {gb.map((p) => (
            <GBPost entry={p} key={p.id} {...p} />
          ))} */}
          {/*  <Comments slug={post.slug} /> */}
        </MDXLayout>
      </Section>
      <Suspense>
        <span id="ass" className="ass">
          <TADDViews slug={post.slug} />
        </span>
      </Suspense>
    </>
  );
};

export default NoteLayout;
