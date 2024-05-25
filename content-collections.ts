import {
  type Context,
  type Document,
  defineCollection,
  defineConfig,
} from '@content-collections/core'

import { type Options, compileMDX } from '@content-collections/mdx'
import { exec as cpExec } from 'node:child_process'
import { allNotes } from 'content-collections'
import { withoutBody } from '@/utils/nobody'
import unwrap from 'remark-unwrap-images'
import { promisify } from 'node:util'
import { readingTime } from '@/utils'
import gfm from 'remark-gfm'
import path from 'node:path'
const exec = promisify(cpExec)

async function lastModificationDate(ctx: Context, document: Document) {
  return ctx.cache(
    // TODO: this is a dirty hack to avoid cache key conflicts
    // we should find a way which handles this automatically
    { key: '_git_last_modified', ...document },
    async (document) => {
      const filePath = path.join(
        ctx.collection.directory,
        document._meta.filePath
      )
      console.log(filePath)
      const { stdout } = await exec(`git log -1 --format=%ai -- ${filePath}`)
      if (stdout) {
        return new Date(stdout.trim()).toISOString()
      }
      return new Date().toISOString()
    }
  )
}

const mdxOptions: Options = {
  remarkPlugins: [gfm, unwrap],
  //rehypePlugins: [[rehypeMdxImportMedia, mdxImgOptions]],
}

const notes = defineCollection({
  name: 'notes',
  directory: `./src/content/notes`,
  include: '**/*.md(x)?',
  exclude: '_*/**',
  schema: (z) => ({
    title: z.string(),
    summary: z.string().optional(),
    date: z.string().datetime(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
  transform: async (data, ctx) => {
    const content = await compileMDX(ctx, data, mdxOptions)
    return {
      ...data,
      content,
      slug: data._meta.path,
      wordCount: content.split(/\s+/gu).length,
      readTime: readingTime(content),
      lastModified: await lastModificationDate(ctx, data),
    }
  },
  onSuccess: async () => {
    console.log('schema done!')
    return await withoutBody(allNotes)
  },
})

const work = defineCollection({
  name: 'work',
  directory: `./src/content/work`,

  include: '**/*.yaml',
  exclude: '_*/**',
  parser: 'yaml',
  schema: (z) => ({
    startYear: z.number(),
    endYear: z.number().or(z.string()),
    role: z.string(),
    company: z.string(),
    url: z.string().url().optional(),
  }),
  transform: async (data, ctx) => {
    return {
      ...data,
      lastModified: await lastModificationDate(ctx, data),
    }
  },
})

export default defineConfig({
  collections: [notes, work],
})
