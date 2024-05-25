type MuscleIcon = (props: React.ComponentProps<'svg'>) => JSX.Element
import type { Session } from '@auth/core/types'
import { cx } from '@/utils'

import type { JSX } from 'react'

export interface IconButtonProps {
  Icon: MuscleIcon
  children?: React.ReactNode
  color: string
  hoverBg?: string
  isActive?: boolean
  onClick: () => void
  session?: Session
}

export const IconButton = (props: IconButtonProps) => {
  const { Icon, isActive, color, children, hoverBg, session } = props

  return (
    <button
      className={cx(
        'bg-none p-1 flex items-center rounded focus:outline-purple-400',
        color,
        hoverBg,
        isActive && 'bg-slate-200',
        session ? 'hover:bg-purple-50 cursor-pointer' : 'cursor-default'
      )}
      {...props}
    >
      <Icon
        className={cx(
          'h-4 w-4',
          !isActive && color,
          isActive && 'text-black',
          children?.toString() && 'mr-1'
        )}
      />
      <span className="text-sm">{children}</span>
    </button>
  )
}
