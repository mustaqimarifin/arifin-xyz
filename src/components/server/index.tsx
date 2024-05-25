import { formatDateXtra } from '@/utils/_date'
import { slugify } from '@/utils'

import React, { type FC, type ReactNode, createElement } from 'react'
import Img, { type ImageProps } from 'next/image'
import styles from './server.module.css'
import { SpriteIcon } from '../Sprites'
import { highlight } from 'sugar-high'
import { env } from 'site.config'
import NextLink from 'next/link'

type CodeString = {
  children: string
}
export const CodeBlock = ({ children }: CodeString) => {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
}

type HeaderProps = {
  title: string
  description?: string
}

export const Header: FC<HeaderProps> = ({ title, description }) => (
  <header className="space-y-2">
    <h1 className="text-3xl m-0">{title}</h1>
    <p className="m-0 text-lg">{description}</p>
  </header>
)

export function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SpriteIcon kind="mail" href={`mailto:${env.email}`} size={6} />
          <SpriteIcon kind="x" href={env.twitter} size={6} />
          <SpriteIcon kind="rss" href="/rss" size={6} />
          <SpriteIcon kind="json" href="/jsonfeed" size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{env.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{env.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href={env.siteRepo}>arifin.xyz</Link>
        </div>
      </div>
    </footer>
  )
}

type CardProps = {
  title: string
  children: ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ title, children }) => (
  <div className={styles.card}>
    <p className={styles.title}>{title}</p>
    <div className={styles.detail}>{children}</div>
  </div>
)

type PanelProps = {
  title: string
  date: string
  readTime?: string
  tags?: Array<string>
}
export function PagePanel(props: PanelProps) {
  const { tags, title, date, readTime } = props
  return (
    <>
      {tags?.map((tag) => <Tag key={tag} text={tag} />)}
      <h1 className={styles['page-title']}>{title}</h1>
      <div className={styles.panel}>
        <time dateTime={date}>{formatDateXtra(date)}&nbsp;</time>
        <span>· {readTime}</span>
      </div>
    </>
  )
}

interface Props {
  text: string
}

export const Tag = ({ text }: Props) => {
  return <div className={styles.tags}>{text.split(' ').join('-')}</div>
}

type SectionProps = {
  children: React.ReactNode
  large?: boolean
  alt?: string
  className?: string
}

export function Section({ children }: SectionProps) {
  return (
    <section className="container mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      {children}
    </section>
  )
}

export function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export function heading(level: number) {
  return ({ children }: any) => {
    const slug = slugify(children)
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }
}

import { Suspense } from 'react'

type Views = {
  views: number
}
export function ViewCounter({ views }: Views) {
  const number = views || 0

  return (
    <div className="flex items-center justify-center space-x-1 pt-4 ">
      <span className="flex items-center align-middle mr-1">{number}</span>
      {/*  <span className="mb-2 size-5 text-white  dark:invert">👁️‍🗨️</span> */}
      <span className="dark:text-white mr-4 ">
        {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      </span>{' '}
    </div>
  )
}

export function ViewCounter2({ views }: Views) {
  const number = views || 0

  return (
    <Suspense>
      <p>
        <span className="emoji">{number}</span>
      </p>
    </Suspense>
  )
}

export function TViewCounter({
  slug,
  allViews,
}: {
  slug: string
  allViews?: {
    slug: string
    count: number
  }[]
  trackView?: boolean
}) {
  const viewsForSlug = allViews?.find((view) => view.slug === slug)
  const number = viewsForSlug?.count || 0

  return (
    <div className="flex items-center justify-center space-x-1 ">
      <div className="flex items-center align-middle mr-1  ">{number}</div>
      <div className="flex-1  ">
        {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" w-4 h-4 -mt-0"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      </div>{' '}
    </div>
  )
}

export const CoverPix = (props: ImageProps) => {
  const { src, alt } = props
  //let path = require(`../../public/images${src}`)
  //const local_img = path.join('./public/images', src)
  //let img = src.startsWith('http') ? src : local_img

  return (
    <div className={styles['cover-wrapper']}>
      <div className={styles.pix}>
        <Img
          src={src}
          alt={alt}
          priority
          width={1240}
          height={698}
          className={styles['pix-img']}
          quality={100}
        />
      </div>
    </div>
  )
}

export function Image(props: ImageProps) {
  return <Img className="flex mx-auto rounded-lg" {...props} />
}

type LinkProps = {
  href: string
  children: ReactNode
  className?: string
  label?: string
  as?: string
  prefetch?: boolean
}

export const Link: FC<LinkProps> = ({
  href,
  children,
  label,
  as,
  ...props
}) => {
  if (href.startsWith('/')) {
    return (
      <NextLink href={href} as={as} aria-label={label} {...props}>
        {children}
      </NextLink>
    )
  }

  if (href.startsWith('#')) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    )
  } else {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        {...props}
      >
        {children}
      </a>
    )
  }
}
/* export const contactSchema = obj({
  name: str().min(1).max(255),
  email: str().email(),
  message: str().min(1).max(1000),
  type: gnum(['general', 'contract', 'advisory', 'agency']),
})
 */
/* let path = (src) => {
  const x = require(`../../../public/images${src}`);

  return x;
}; */

/* export const PicWithCaption = (props: ImgProps) => {
  const {src, alt, className, caption, width, height} = props
  const path = slow(() => import(`../../../public/images${src}`))
  let img = src.startsWith('http') ? src : path

  return (
    <div className={styles['pix-mdx']}>
      <figure>
        <Img
          src={img}
          alt={alt}
          width={Number(width)}
          height={Number(height)}
          unoptimized={src.startsWith('http')}
          //className={styles}
        />
        <figcaption>{caption && <span>{caption}</span>}</figcaption>
      </figure>
    </div>
  )
}
 */
/* export const Pic = (props:ImgProps) => {
  const { src, alt, className, caption, width, height } = props
  const path = require(`../../../public/images${src}`)
  const img = src.startsWith('http') ? src : path

  return (
    <Img
      src={img}
      alt={alt}
      width={Number(width)}
      height={Number(height)}
      unoptimized={src.startsWith('http')}
      //className={styles}
    />
  )
}
 */
