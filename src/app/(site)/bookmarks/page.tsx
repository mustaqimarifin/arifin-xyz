import { unstable_cache as cache } from 'next/cache'
import { sortAZ } from '@/utils/sortedContent'
import styles from '$$/page/notes.module.css'
import { Header } from '@/components/server'
import MDXLayout from '@/layouts/mdxLayout'
import { pg_ink } from '@/db/actions'
import type { Metadata } from 'next'
import { cx } from '@/utils'
import { db } from '@/db'

const title = 'Bookmarks'
const description = 'From across the Internetz'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title,
  description,
}

const Post = (post: Bookmark) => {
  const { name, type, url } = post

  return (
    <a className={styles['note-link']} key={name} href={url}>
      <div className={styles.title}>{name}</div>
      <hr className={styles.rule} />
      <div className={cx(styles.date, 'italic')}>{type}</div>
    </a>
  )
}

const Bookmarks = async () => {
  await pg_ink('bookmarks')

  const items = await getBookmarks()

  return (
    <>
      <section className="h-dvh">
        <Header title={title} description={description} />
        <MDXLayout>
          <div className="mt-8 grid gap-4">
            {items.map((post) => (
              <Post key={post.name} {...post} />
            ))}
          </div>
        </MDXLayout>
      </section>
    </>
  )
}

export default Bookmarks

type Bookmark = {
  date: Date
  id: string
  name: string
  type: 'article' | 'blog' | 'video' | 'bodoh' | null
  url: string
  description: string | null
  featured: boolean | null
  image: string | null
}

const getBookmarks = cache(
  async (): Promise<Bookmark[]> => {
    const { rows } = await db.query<Bookmark>(`select * from bookmarks`)
    return sortAZ(rows)
  },
  ['bookmarks'],
  {
    revalidate: 86400,
  }
)
