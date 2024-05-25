import { Header, Section } from '@/components/server'
import { pg_ink } from '@/db/actions'
import type { Metadata } from 'next'

const title = 'Contact'
const description =
  "Let me know what's on your mind and I'll get back to you as soon as possible."

export const metadata: Metadata = {
  title,
  description,
}

export default async function Contact() {
  await pg_ink('contact')

  return (
    <Section>
      <Header title={title} description={description} />
      {/*  <div className="mt-8 grid gap-8">
        <ContactForm />
      </div> */}
    </Section>
  )
}
