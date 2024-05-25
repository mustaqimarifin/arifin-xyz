'use client'

import { useEffect, useRef, useState } from 'react'

import type { CommentProps } from './usePost'
import { useComments } from './useComments'
import type { Session } from 'next-auth'
import { timeAgo } from '@/utils/_date'
import { CommentForm } from './Form'
import { CommentList } from './List'
import { usePost } from './usePost'
import { Avatar } from '../client'
import { cx } from '@/utils'
const MAX_LINES = 10
const LINE_HEIGHT = 24 // in px
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT

interface CommentPops {
  comment: CommentProps
  session?: Session
}
//type Active = 'edit' | 'reply'

/* type ActiveState = {
  id: number
  type: Active
} */
export const CommentSolo3 = ({ comment, session }: CommentPops) => {
  const { parentId, id, body, author, date, slug, highlight } = comment
  const betterDate = date.toDateString()
  console.log(new Date('2024-05-21 08:41:13.782356').toLocaleString())
  //const session = useSession()
  //let role
  //const authorId = author.user_id
  const replyId = parentId ? parentId : id
  const { getReplies } = usePost()
  const replies = getReplies(id)

  //const [isReplying, setIsReplying] = useState(false)
  //const [_isEditing, setIsEditing] = useState(false)
  //const [activeComment, setActiveComment] = useState<null | ActiveState>(null)

  const { createComment, delComment } = useComments()

  /*   const handleEdit = async (body: string) => {
    return await editComment
      .mutateAsync({
        id,
        body,
        //date: new Date().,
      })
      .then(() => {
        setIsEditing(false)
      })
  }
 */
  const handleDelete = async () => {
    return await delComment.mutateAsync({
      id: id,
      userId: author.id,
    })
  }

  /*   const handleLike = async () => {
    if (!session) return
    return await toggleCommentLike.mutateAsync({
      commentId: id,
      // slug,
    })
  }
 */
  const handleReply = async (body: string) => {
    return await createComment
      .mutateAsync({
        body: body,
        parentId: replyId,
        slug: slug,
      })
      .then(() => {
        setShowReplyForm(false)
      })
  }

  //const canDelete = authorId === session?.author.user_id //&& replies.length === 0
  //const canReply = Boolean(authorId)
  const [hidden, setHidden] = useState(false)
  const [isOverflowExpanded, setIsOverflowExpanded] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const isAdmin = session?.user.role === 'admin'
  useEffect(() => {
    if (textRef?.current) {
      const el = textRef.current
      if (el.scrollHeight > MAX_HEIGHT) {
        setIsOverflow(true)
      }
    }
  }, [])

  /*   const deleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to remove comment?')) {
      try {
        await supabase.from('comments').delete().eq('id', comment.id);
        setComments(comments.filter((x) => x.id != comment.id));
      } catch (error) {
        console.log('error', error);
      }
      return {};
    }
  }; */

  /*   async function handleApprove() {
    const { data } = await supabase
      .from('comments')
      .update({
        isApproved: true
      })
      .eq('id', comment.id);
    // mutateComments(comment.mutateKey);
  }
  async function handleDeny() {
    const { data } = await supabase
      .from('comments')
      .update({
        isPublished: false,
        isApproved: false
      })
      .eq('id', comment.id);
  } */

  return (
    <div key={id} className="flex flex-col">
      {/*       <div className=" tweet rounded-lg border border-gray-200 dark:border-gray-800 px-6 py-4 my-4 w-full bg-white dark:bg-gray-900 flex flex-col transition duration-500 ease-in-out transform ">
       */}{' '}
      {/*         {!hidden && parent && (
          <div className="grid gap-x-2 comment-grid">
            <div className="w-6 relative">
              <div className="col-start-1 border-pink-700 border-t-2 border-l-2 rounded-tl box-border absolute -right-1 bottom-0 w-2/3 h-1/2" />
            </div>
            <div className="col-start-2 flex items-center leading-none mb-1 transform translate-y-1">
              <button
                className="text-xs text-gray-500 hover:underline focus-ring active:underline cursor-pointer focus:outline-none"
                aria-label={`View comment by ${parent.name}`}
              >
                @{parent.name}:
              </button>
              <div className="text-xs text-gray-800 ml-1 hover:text-gray-400 focus-ring active:text-gray-400 cursor-pointer focus:outline-none line-clamp-1">
                {parent.text}
              </div>
            </div>
          </div>
        )} */}
      <div
        className={cx('grid gap-x-3 comment-grid transition-opacity', {
          'gap-y-1': !hidden,
        })}
      >
        {highlight && (
          <>
            <div className="row-start-1 col-start-1 row-end-3 col-end-3 -m-1 opacity-5 bg-indigo-700 dark:bg-indigo-50 dark:border-gray-100 rounded pointer-events-none" />
          </>
        )}
        {!hidden ? (
          <>
            <div className="grid row-start-1 col-start-1 place-items-center overflow-hidden">
              <Avatar src={author?.image} isLoading={false} className="mr-3" />
            </div>
            <div className="row-start-2 row-end-5 col-start-1 col-end-2 row-span-auto flex justify-center my-1 px-1">
              <button
                className={cx(
                  'flex-grow flex justify-center border-none group focus-ring mb-1',
                  hidden
                )}
                onClick={() => setHidden(true)}
                aria-label={`Collapse comment by ${author}`}
              >
                <div
                  className={cx('w-0 h-full', {
                    'bg-gray-200 group-hover:bg-gray-500 group-active:bg-gray-500 dark:bg-gray-600 dark:group-hover:bg-gray-400 dark:group-active:bg-gray-400':
                      !highlight,
                    'bg-gray-300 group-hover:bg-gray-600 group-active:bg-gray-600 dark:bg-gray-600 dark:group-hover:bg-gray-400 dark:group-active:bg-gray-400':
                      highlight,
                  })}
                />
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setHidden(false)}
            className={
              'row-start-1 col-start-1 grid place-items-center text-amber focus-ring w-7 h-7'
            }
            aria-label={`Expand comment by ${author}`}
          >
            +{/*  <Plus className="w-4 h-4 text-gray-500" /> */}
          </button>
        )}
        <div className="row-start-1 col-start-2 self-center">
          {/*  {author.level !== 'NONE' ? (
            <div className="hidden text-xs leading-[18px] sm:inline-flex">
              <span className="color-box-border-info font-medium capitalize rounded-xl border px-[7px]">
                <Tag name={author.level} />
              </span>
            </div>
          ) : null} */}
          <div className="flex flex-grow items-end">
            <span
              className={cx('text-gray-700 dark:text-gray-100 ', {
                'text-sm font-medium': !hidden,
                'text-sm': hidden,
              })}
            >
              {!comment.isDeleted ? author.name : <>[Deleted]</>}{' '}
            </span>
            <span className="text-gray-300 place-self-center dark:text-gray-500 font-semibold text-sm mx-1 select-none">
              ·
            </span>{' '}
            <span className="text-gray-300 place-self-center dark:text-gray-500 font-semibold text-sm mx-1 select-none">
              {id}
            </span>{' '}
            ||
            <span className="text-gray-300 place-self-center dark:text-gray-500 font-semibold text-sm mx-1 select-none">
              {parentId}
            </span>
            <span
              className="flex place-self-center text-gray-400 text-sm font-light  justify-self-auto font-serif italic"
              suppressHydrationWarning
            >
              {timeAgo(betterDate)}
            </span>
            {/*   {session?.author.role! === 'admin' && (
              <button
                className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400 focus-ring border-none ml-5 leading-none"
                onClick={handlePin}
                aria-label={`Pin comment by ${author.name}`}>
                Pin comment
              </button>
            )} */}
          </div>
        </div>

        <div className={cx('row-start-2 col-start-2', { hidden })}>
          <section
            className={cx(
              'text-gray-700 dark:text-gray-50 leading-6 text-sm font-light pb-2',
              {
                'line-clamp-10': !isOverflowExpanded,
                hidden,
              }
            )}
            ref={textRef}
          >
            <div className=" text-zinc-800  dark:text-gray-100 ">{body}</div>
          </section>

          {isOverflow && (
            <button
              className="text-sm text-indigo-700 dark:text-indigo-400 hover:underline focus:underline focus-ring border border-transparent leading-none"
              onClick={() => setIsOverflowExpanded(!isOverflowExpanded)}
              aria-label={`Pin comment by ${author.name}`}
            >
              {isOverflowExpanded ? (
                <span>Show less</span>
              ) : (
                <span>Read more</span>
              )}
            </button>
          )}
          {!comment.isDeleted && (
            <div className="grid grid-flow-col auto-cols-min gap-x-3 transform -translate-x-1.5">
              <button
                className="text-xs flex items-center text-gray-600 dark:text-gray-400 "
                onClick={() => setShowReplyForm(!showReplyForm)}
                aria-label={
                  showReplyForm
                    ? `Hide reply form`
                    : `Reply to comment by ${author?.name}`
                }
              >
                {showReplyForm ? <span>Cancel</span> : <span>Reply</span>}
              </button>
              {isAdmin && (
                <>
                  <button
                    className="text-xs text-red-600 flex flex-row items-center"
                    onClick={handleDelete}
                    aria-label={`Delete comment by ${author?.name}`}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}

          {/*          {session && (
            <div className="grid grid-flow-col justify-start auto-cols-min gap-x-3 transform">
              <span
                className="text-xs flex items-center text-gray-600 dark:text-gray-100 border-none"
                onClick={() => setShowReplyForm(!showReplyForm)}
                aria-label={showReplyForm ? `Hide reply form` : `Reply to comment by ${author}`}>
                {showReplyForm ? (
                  <button className="text-gray-500 dark:text-gray-200 hover:text-red-300">Cancel&nbsp;&nbsp;</button>
                ) : (
                  <button className="text-gray-500 dark:text-gray-200 hover:text-indigo-300">Reply&nbsp;&nbsp;</button>
                )}

                {canDelete && (
                  <button
                    className="text-xs flex flex-row items-center text-gray-500 dark:text-gray-200 hover:text-yellow-300 border-none"
                    onClick={handleDelete}
                    aria-label={`Delete comment by ${author.name}`}>
                    &nbsp;Delete
                  </button>
                )}
              </span>
            </div>
          )} */}
        </div>

        <div
          className={cx(
            'row-start-3 row-span-2  transform -translate-x-2 -mr-2',
            { hidden }
          )}
        >
          {showReplyForm && (
            <div className="divide-pink-200 px-2 ">
              <CommentForm
                autoFocus
                submitLabel="Reply"
                onSubmit={handleReply}
                handleResetCallback={() => setShowReplyForm(!showReplyForm)}
                session={session}
              />
            </div>
          )}
          {replies?.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          ) &&
            replies?.length > 0 && (
              <div className={cx('pt-2 space-y-5')}>
                <CommentList comments={replies} />
              </div>
            )}
        </div>
      </div>
      {/*  </div> */}
    </div>
  )
}
