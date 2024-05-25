import { MDXContent } from '@content-collections/mdx/react'

import { Callout, ConsCard, ProsCard, Pic } from './client'
import { CodeBlock, Link, heading } from './server'
import type { MDXComponents } from 'mdx/types'
//import slow from 'next/dynamic'
import type React from 'react'
import Tweet from './tweet'
//const {Pic} = await import('./client')
/* const Pic = slow(() => import('./client').then((mod) => mod.Pic), {
  ssr: false,
}) */

export const komponents = {
  h1: heading(1),
  h2: heading(1),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),
  img: Pic,
  Pic,
  a: Link,
  Callout,
  ProsCard,
  ConsCard,
  Tweet,
  code: CodeBlock,
} as unknown as MDXComponents

export async function MDX(props: any) {
  return (
    <MDXContent
      {...props}
      components={{ ...komponents, ...(props.components || {}) }}
    />
  )
}
