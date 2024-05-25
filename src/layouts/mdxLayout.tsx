import type { ReactNode } from 'react'
import '$$/mdx.css' //./src/styles/mdx.css'

export default function MDXLayout({ children }: { children: ReactNode }) {
  return <div className="mdx">{children}</div>
}
