import {
  type JSX,
  type SVGProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { Session } from '@auth/core/types'
import s from './comments.module.css'
import Avatar from './Avatar'
import { cx } from '@/utils'

const PHolder = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const autosize = (target: HTMLTextAreaElement): void => {
  target.style.height = 'initial'
  target.style.height = `${+target.scrollHeight}px`
}

export interface CommentFormProps {
  autoFocus?: boolean
  loading?: boolean
  initialValue?: string
  session?: Session
  reply?: boolean

  error?: string
  onSubmit: (x: string) => Promise<void>
  onClick?: () => void
  parentId?: string
  placeholder?: string
  submitLabel?: string
  handleResetCallback?: () => void
  hideEarlyCallback?: () => void
}

export const CommentForm = ({
  autoFocus = false,
  submitLabel = 'Post',
  hideEarlyCallback,
  reply = false,
  error,
  handleResetCallback,
  initialValue = '',
  onSubmit,
  session,
}: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [text, setText] = useState(initialValue)
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (autoFocus) {
      if (textRef?.current) {
        textRef.current.focus()
      }
    }
  }, [autoFocus])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setText(e.target.value)
    if (textRef?.current) {
      autosize(textRef.current)
    }
  }

  function handleReset(): void {
    setText('')
    if (textRef?.current) {
      textRef.current.style.height = 'initial'
    }
    setIsLoading(false)
  }
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      onSubmit(text).then(() => {
        setText('')
        setIsLoading(true)
        hideEarlyCallback?.()
        handleReset()
        handleResetCallback?.()
      })
    },
    [text]
  )

  return (
    <>
      <div className={s.cform}>
        <div className={s['cform-2']}>
          {reply && (
            <>
              {!session && (
                <button className="focus-ring" aria-label="Create new account">
                  <PHolder className="h-7 w-7 text-gray-600" />
                </button>
              )}
              {session && (
                <button
                  className="rounded-full focus-ring"
                  aria-label="View profile information"
                >
                  <Avatar profile={session} />
                </button>
              )}
            </>
          )}
          <label className={s['label-1']}>
            <span className="sr-only">Enter a comment</span>
            <textarea
              className={s['t-area']}
              placeholder="Add a comment..."
              rows={1}
              value={text}
              onChange={handleChange}
              ref={textRef}
              disabled={isLoading}
            />
          </label>

          <div className={s['b-wrap']}>
            <button
              className={cx(s['b-in'], {
                'cursor-not-allowed opacity-50': text.length < 1 || isLoading,
              })}
              disabled={text.length < 1}
              onClick={handleSubmit}
              aria-label="Submit new post"
            >
              {submitLabel}
            </button>
          </div>
        </div>
        <div ref={parent} className={s.fkit}>
          {error}
        </div>
      </div>
    </>
  )
}
