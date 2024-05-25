'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type { Session } from '@auth/core/types'
import { usePathname } from 'next/navigation'
import { useComments } from './useComments'
import { CommentList } from './List'
import { CommentForm } from './Form'
import { usePost } from './usePost'

export const Form = ({ session }: { session: Session }) => {
  const path = usePathname()
  const slug = path.split('/')[2]
  const [error, setError] = useState('')
  const { createComment } = useComments()
  const { isPending } = createComment

  const submitComment = async (body: string) => {
    if (body.trim().length === 0) {
      setError('You need to specify a text!')
      return
    }

    if (body.trim().length < 4) {
      setError('text is too short!')
      return
    }

    return await createComment
      .mutateAsync({
        body,
        slug,
      })
      .then(() => {
        setError('')
      })
  }

  return (
    <>
      <CommentForm
        onSubmit={submitComment}
        loading={isPending}
        error={error}
        session={session}
      />
    </>
  )
}

export const RootComments = () => {
  const { rootComments } = usePost()

  const [load, setLoad] = useState(false)

  const LoadComments = useCallback(() => {
    setLoad(false)
  }, [])

  // Reload on theme change
  useEffect(() => {
    LoadComments()
  }, [LoadComments])
  return (
    <div className="text-gray-700 dark:text-gray-300">
      {load && <button onClick={LoadComments}>Load Comments</button>}
      <CommentList comments={rootComments} />
    </div>
  )
}
