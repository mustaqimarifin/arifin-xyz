import { miscStack, musicStack, prodStack } from '@/utils/sortedContent'
import { unstable_cache as cache } from 'next/cache'
import { Header, Link } from '@/components/server'
import styles from '$$/page/stack.module.css'
import { Card } from '@/components/server'
import { pg_ink } from '@/db/actions'
import type { Metadata } from 'next'
import { db } from '@/db'

export const dynamic = 'force-static'

const title = 'Stack'
const description = 'Tools and technologies I use.'

export const metadata: Metadata = {
  title,
  description,
}

const Tool = ({ url, name, description, featured }: Stack) => {
  const { hostname } = new URL(url)
  return (
    <Link href={url} key={url} className={styles.url}>
      <img
        src={`https://logo.clearbit.com/${hostname.replace('www.', '')}`}
        alt={hostname}
        width={32}
        height={32}
        className="rounded-md"
      />
      <div>
        <div className="flex items-center gap-2">
          <p className={styles.name}>{name}</p>
          {featured ? <span className={styles.feat}>Featured</span> : null}
        </div>
        <p className={styles.desc}>{description}</p>
      </div>
    </Link>
  )
}

export default async function StackPage() {
  await pg_ink('stack')
  //time();
  //let stack = require(`@/data/stack.json`) as Stack[]
  const stack = await getStacks()
  //let aStack = allStack(stack)
  const mStack = musicStack(stack)
  const pStack = prodStack(stack)
  const mcStack = miscStack(stack)

  //console.log(aStack)
  return (
    <>
      <Header title={title} description={description} />
      <div className={styles.stack}>
        <Card title="music" className={styles.card}>
          {mStack.map((item) => (
            <Tool {...item} />
          ))}
        </Card>
        <Card title="productivity" className={styles.card}>
          {pStack.map((item) => (
            <Tool {...item} />
          ))}
        </Card>
        <Card title="misc" className={styles.card}>
          {mcStack.map((item) => (
            <Tool {...item} />
          ))}
        </Card>
      </div>
    </>
  )
}

export type Stack = {
  date: Date
  id: string
  name: string
  type: 'code' | 'productivity' | 'music' | 'misc' | null
  url: string
  description: string
  featured?: boolean
  image: string
}

const getStacks = cache(
  async (): Promise<Stack[]> => {
    const { rows } = await db.query<Stack>(`select * from stacks`)
    return rows
  },
  ['stacks'],
  {
    revalidate: 86400,
  }
)
