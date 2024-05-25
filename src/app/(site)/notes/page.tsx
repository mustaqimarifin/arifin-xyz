import { Header, Link } from '@/components/server'
import noteSchema from 'schema/noteSchema.json'
import type { Note } from 'content-collections'
import styles from '$$/page/notes.module.css'
import { dayAndMonth } from '@/utils/_date'
import type { Metadata } from 'next'
const title = 'Notes'
const description = 'Thoughts, ideas, and opinions.'

export const metadata: Metadata = {
  title,
  description,
}

const Post = (post: { title: string; date: string; slug: string }) => {
  const { title, date, slug } = post

  return (
    <Link className={styles['note-link']} key={slug} href={`/notes/${slug}`}>
      <div className={styles.title}>{title}</div>
      {/*       <div className="">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
       */}{' '}
      <hr className={styles.rule} />
      <div className={styles.date}>{dayAndMonth(date)}</div>
    </Link>
  )
}

export default function Note() {
  return (
    <section className="h-dvh">
      <Header title={title} description={description} />
      <div className="mt-8 grid gap-4">
        {/*   <div className="space-y-4 text-justify">
          {years.map((year) => (
            <section key={year} className="animate space-y-4">
              <div className="font-semibold font-mono text-right text-black dark:text-white">
                {year}
              </div>
              <div>
                <ul className="flex flex-col gap-4">
                  {notes[year].map((post) => (
                    <li key={post.date}>
                      <Post key={post.slug} {...post} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div> */}
        {noteSchema.map((post) => (
          <Post key={post.slug} {...post} />
        ))}
      </div>
    </section>
  )
}
