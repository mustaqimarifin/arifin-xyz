import { Form, RootComments } from '@/components/comments'
import noteSchema from 'schema/noteSchema.json'

import { CoverPix, PagePanel, Section, ViewCounter } from '@/components/server'
import CommentSkeleton from '@/components/comments/Skeleton'
import { SignIn, SignOut } from '../../guestbook/buttons'
import { allNotes } from 'content-collections'
import MDXLayout from '@/layouts/mdxLayout'
import { notFound } from 'next/navigation'
import meta from '@/meta/metadata.json'
import { MDX } from '@/components/mdx'
import { pg_ink } from '@/db/actions'
import type { Metadata } from 'next'
import { auth } from '@/db/auth'
import { Suspense } from 'react'

type NoteProps = {
  params: {
    slug: string
  }
}

async function CommentState() {
  const session = await auth()
  return session?.user ? (
    <>
      <Form session={session} />
      <SignOut />
    </>
  ) : (
    <>
      <SignIn />
    </>
  )
}

export const generateStaticParams = async () =>
  noteSchema.map((p) => ({ slug: p.slug }))

export async function generateMetadata({
  params: { slug },
}: NoteProps): Promise<Metadata | undefined> {
  const post = meta.find((p) => p.slug === slug)
  if (!post) {
    return
  }

  const { title, date: publishedTime, summary: description, image } = post
  const ogImage = image
    ? `https://arifin.xyz${image}`
    : `https://arifin.xyz/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://arifin.xyz/notes/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

const NoteLayout = async ({ params }: NoteProps) => {
  const views = await pg_ink(params.slug)

  const post = allNotes.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
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
      {post.image && <CoverPix src={post.image} alt={'Thumbnail'} />}
      <Section>
        <MDXLayout>
          <MDX code={post.content} />
        </MDXLayout>
        <Suspense fallback={<CommentSkeleton />}>
          <h2 className="text-xl pt-3 text-black dark:text-gray-50 font-bold">
            Comments
          </h2>
          <CommentState />
          <RootComments />
        </Suspense>
        <Suspense>
          <ViewCounter views={views.count} />
        </Suspense>
      </Section>
    </>
  )
}

export default NoteLayout
