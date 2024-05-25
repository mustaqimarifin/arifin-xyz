'use client'
import styles from '$$/page/gb.module.css'

import { saveGuestbookEntry } from '@/db/actions'
import { useFormStatus } from 'react-dom'
import { useRef } from 'react'
import { cx } from '@/utils'

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      className={styles.form}
      ref={formRef}
      action={async (formData) => {
        await saveGuestbookEntry(formData)
        formRef.current?.reset()
      }}
    >
      <input
        aria-label="Your message"
        placeholder="Your message..."
        name="entry"
        type="text"
        required
        className={styles.input}
      />
      <SubmitButton name="gb" />
    </form>
  )
}

type Btn = 'gb' | 'delete' | 'comment' | 'reply' | 'contact' | 'newsletter'
type Label = ['Sign', 'Post', 'Reply', 'Send', 'Join']

type Submit = {
  name: Btn
  submitLabel?: Label
  isActive?: boolean
}
export function SubmitButton({ name, submitLabel, isActive }: Submit) {
  const { pending } = useFormStatus()
  switch (name) {
    case 'gb':
      return (
        <button className={styles.submit} disabled={pending} type="submit">
          {submitLabel?.[0]}
        </button>
      )
    case 'comment':
      return (
        <button className={styles.submit} disabled={pending} type="submit">
          Post
        </button>
      )
    case 'reply':
      return (
        <button className={styles.submit} disabled={pending} type="submit">
          Reply
        </button>
      )
    case 'delete':
      return (
        <button
          className={cx([
            styles['submit-del'],
            {
              'bg-red-300/50 dark:bg-red-700/50': isActive,
            },
          ])}
          disabled={pending}
          type="submit"
        >
          Delete Entries
        </button>
      )
    case 'contact':
      return (
        <button
          disabled={pending}
          type="submit"
          className={cx(styles['submit-contact'])}
        >
          Send
        </button>
      )
    case 'newsletter':
      return (
        <button
          className={cx(styles['submit-newsletter'])}
          type="submit"
          disabled={pending}
        >
          Join
        </button>
      )
  }
}
