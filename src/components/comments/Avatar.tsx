//@ts-nocheck
import type { Session } from '@auth/core/types'
import { cx, type ClassValue } from '@/utils'
import s from './comments.module.css'
interface Props {
  profile: Session | undefined
  className?: ClassValue
  isDeleted?: boolean
  firstLetter?: string
}

const Avatar = ({
  profile,
  className = 'w-7 h-7 text-sm',
  isDeleted,
  firstLetter,
}: Props) => {
  if (isDeleted) {
    return <div className={cx(s.avatar, className)}></div>
  }

  if (firstLetter) {
    return <div className={cx(s.fl, className)}>{firstLetter}</div>
  }

  if (profile) {
    return (
      <img
        src={profile.user?.image!}
        className={cx(s.pf, className)}
        alt={profile.user?.name!}
        width={28}
        height={28}
      />
    )
  }

  if (profile?.user.name) {
    return <div className={cx(s.name, className)}>{profile.user?.name}</div>
  }

  return <div className={cx(s.def, className)}></div>
}

export default Avatar
