import { FileJsonIcon, MailIcon, RssIcon } from 'lucide-react'
import { cx } from '@/utils'

export type SpriteProps = {
  className?: string
}
const CornerDownRight = ({ className }: SpriteProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      role="img"
      aria-label="CDR"
    >
      <use href="/sprite.svg#corner" />
    </svg>
  )
}
const File = ({ className }: SpriteProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      role="img"
      aria-label="FILE"
    >
      <use href="/sprite.svg#file" />
    </svg>
  )
}
const FolderOpen = ({ className }: SpriteProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      role="img"
      aria-label="FOLDER-OPEN"
    >
      <use href="/sprite.svg#folder-open" />
    </svg>
  )
}

const GreenCheck = ({ className }: SpriteProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      role="img"
      aria-label="GC"
    >
      <use href="/sprite.svg#green-tick" />
    </svg>
  )
}

const RedCross = ({ className }: SpriteProps) => {
  return (
    <svg
      width="20"
      height="20"
      className={className}
      role="img"
      aria-label="RC"
    >
      <use href="/sprite.svg#red-cross" />
    </svg>
  )
}

const Pencil = ({ className }: SpriteProps) => {
  return (
    <svg
      width="256"
      height="256"
      className={className}
      role="img"
      aria-label="P"
    >
      <use href="/ui.svg#pencil" />
    </svg>
  )
}

const Reply = ({ className }: SpriteProps) => {
  return (
    <svg width="20" height="20" className={className} role="img" aria-label="R">
      <use href="/ui.svg#reply" />
    </svg>
  )
}

const Heart = ({ className }: SpriteProps) => {
  return (
    <svg
      width="256"
      height="256"
      className={className}
      role="img"
      aria-label="HH"
    >
      <use href="/ui.svg#heart" />
    </svg>
  )
}

const HeartSolid = ({ className }: SpriteProps) => {
  return (
    <svg
      width="256"
      height="256"
      className={className}
      role="img"
      aria-label="HS"
    >
      <use href="/ui.svg#heart-fill" />
    </svg>
  )
}

const Trash = ({ className }: SpriteProps) => {
  return (
    <svg
      width="256"
      height="256"
      className={className}
      role="img"
      aria-label="Tr"
    >
      <use href="/ui.svg#trash" />
    </svg>
  )
}

const Kat = ({ className }: SpriteProps) => {
  return (
    <svg
      width="120"
      height="120"
      className={cx('mb-1.5 w-6 h-6 invert-30', className)}
      role="img"
      aria-label="Tr"
    >
      <use href="/ui.svg#kitteh" />
    </svg>
  )
}

const Twitter = ({ className }: SpriteProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      role="img"
      aria-label="Tw"
    >
      <use href="/ui.svg#twitter" />
    </svg>
  )
}

export {
  CornerDownRight,
  File,
  FolderOpen,
  GreenCheck,
  RedCross,
  Pencil,
  Reply,
  Heart,
  HeartSolid,
  Trash,
  Kat,
}

const components = {
  heart: Heart,
  heartfull: HeartSolid,
  trash: Trash,
  kat: Kat,
  reply: Reply,
  pencil: Pencil,
  mail: MailIcon,
  rss: RssIcon,
  json: FileJsonIcon,
  //github: Github,
  //youtube: Youtube,
  //linkedin: Linkedin,
  x: Twitter,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

export const SpriteIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null

  const AssSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <AssSvg
        className={` text-gray-700 hover:text-rose-300 dark:text-gray-200 dark:hover:text-rose-400 h-${size} w-${size}`}
      />
    </a>
  )
}
