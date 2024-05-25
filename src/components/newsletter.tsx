'use client'

import { useFormState } from 'react-dom'

import { SubmitButton } from '@/app/(site)/guestbook/form'
import { subscribe } from '@/db/actions'
import type { FC } from 'react'
import { cx } from '@/utils'

export const Newsletter: FC = () => {
  const [state, formAction] = useFormState(subscribe as never, {
    message: '',
  })

  return (
    <>
      <form action={formAction} className="relative max-w-96">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          aria-label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="jane@acme.com"
          pattern=".+@.+\..+"
          required
          className={cx(
            'rounded-full text-sm py-2.5 pl-4 pr-[94px] w-full',
            'bg-neutral-100 text-neutral-950 placeholder:text-neutral-500 outline-orange-500',
            'dark:bg-neutral-900 dark:text-white dark:placeholder-text-neutral-600'
          )}
        />
        <SubmitButton name="newsletter" />
      </form>
      {state.message ? (
        <p aria-live="polite" className="mt-4 text-sm block m-0">
          {state.message}
        </p>
      ) : null}
    </>
  )
}
