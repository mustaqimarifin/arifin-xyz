'use client'

import { getComments } from '@/db/actions'
import type { UserRole } from '@/db/auth'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export type CommentProps = {
  id: string
  body: string
  slug: string
  date: Date
  parentId: string | null
  userId?: string
  author: {
    id: string
    name: string
    image: string
    role: UserRole
  }
  isDeleted?: boolean
  commentId?: string
  likedByMe?: boolean
  highlight?: boolean
  replies?: CommentProps[]
  likeCount?: number
  continueThread?: boolean
}

export type Guestbook = {
  id: number
  body: string
  date: Date
  author: {
    id: string
    name: string
    image: string
  }
}

export interface PostProps {
  slug: string
}

export const usePost = () => {
  const path = usePathname()
  const slug = path.split('/')[2]
  //console.log(slug)

  const { data: comments } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => await getComments(slug),
  })

  console.log(comments)
  const commentsByMormonId = useMemo(() => {
    //let data: CommentProps[] = []
    const group: { [key: string]: CommentProps[] } = {}
    // biome-ignore lint/complexity/noForEach: <explanation>
    comments?.forEach((c) => {
      group[String(c.parentId)] ||= []
      group[String(c.parentId)].push(c as CommentProps)
    })
    return group
  }, [comments])

  return {
    rootComments: commentsByMormonId['null'] || [],
    getReplies: (parentId: string) => commentsByMormonId[parentId] || [],
  }
}

/*   const commentsByParentId = useMemo(() => {
    const group: {[key: string]: CommentProps[]} = {}
    // biome-ignore lint/complexity/noForEach: <explanation>
    comments?.forEach((c) => {
      group[String(c.parentId)] ||= []
      group[String(c.parentId)].push(c as CommentProps)
    })
    return group
  }, [comments]) */
