import { Header } from '@/components/server'
import styles from '$$/page/gb.module.css'

import { getGuestbookEntries, pg_ink } from '@/db/actions'
import { Avatar } from '@/components/client'
import { SignIn, SignOut } from './buttons'
import { auth } from '@/db/auth'
import Form from './form'

export const metadata = {
  title: 'Guestbook',
  description: 'sup?!',
}

export default async function GuestbookPage() {
  await pg_ink('guestbook')

  return (
    <section>
      <Header title={metadata.title} description={metadata.description} />
      <div className={styles.page}>
        <GuestbookForm />
        <GuestbookEntries />
      </div>
    </section>
  )
}

async function GuestbookForm() {
  const session = await auth()

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  )
}

async function GuestbookEntries() {
  const rows = await getGuestbookEntries()
  if (rows.length === 0) {
    return null
  }

  return rows.map((entry) => (
    <div key={entry.id} className={styles['entry-ow']}>
      <div className={styles['entry-iw']}>
        <div className="inline-flex mr-4">
          <Avatar src={entry.author.image} className="rounded-full" />
        </div>
        <span className="mr-4 text-pretty">{entry.author.name}:</span>
        {entry.body}
      </div>
    </div>
  ))
}
