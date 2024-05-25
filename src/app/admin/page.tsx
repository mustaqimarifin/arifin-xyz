import { getGuestbookEntries } from '@/db/actions'
import { Header } from '@/components/server'
import { redirect } from 'next/navigation'
import { auth } from '@/db/auth'
import Form from './form'

export const metadata = {
  title: 'Admin',
}

export default async function GuestbookPage() {
  const session = await auth()
  if (session?.user?.email !== 'mustaqim.arifin@gmail.com') {
    redirect('/')
  }

  const entries = await getGuestbookEntries()

  return (
    <section>
      <Header title={metadata.title} />
      <Form entries={entries} />
    </section>
  )
}
