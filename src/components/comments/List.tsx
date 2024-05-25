'use client'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { CommentProps } from './usePost'
import { CommentSolo3 } from './Single3'
import type { Session } from 'next-auth'

interface CommentListProps {
  comments: CommentProps[]
  session?: Session
}

export const CommentList = ({ comments }: CommentListProps) => {
  const [parent] = useAutoAnimate<HTMLDivElement>()

  return (
    <div ref={parent}>
      {comments?.map((comment) => (
        <div key={comment.id} className="my-2 last:mb-0">
          <CommentSolo3 comment={comment} />
        </div>
      ))}
    </div>
  )
}
