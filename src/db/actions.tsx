'use server'

import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import { parseError } from '@/utils'
import { env } from 'site.config'
import { auth } from './auth'
import * as v from 'valibot'

import type { CommentProps, Guestbook } from '@/components/comments/usePost'
import type { Session } from '@auth/core/types'
import { audienceId, resend } from './resend'
import { db } from '.'

//$$/* POSTGRESJS Ref
/* 
\
interface User {
  id: number
  name: string
}

const users = await sql<User[]>`SELECT * FROM users` 


const users = await sql<User[]>`SELECT * FROM users WHERE id = ${id}`
if (!users.length)
  throw new Error('Not found')
return users[0]


-- Use Tuples for for handling fixed rows e.g selectByID

const [user]: [User?] = await sql`SELECT * FROM users WHERE id = ${id}`
if (!user) // => User | undefined
  throw new Error('Not found')
return user // => User

// NOTE:
const [first, second]: [User?] = await sql`SELECT * FROM users WHERE id = ${id}` // fails: `second` does not exist on `[User?]`
const [first, second] = await sql<[User?]>`SELECT * FROM users WHERE id = ${id}` // don't fail : `second: User | undefined`

--- Dynamic Insert

const user = {
  name: 'Murray',
  age: 68
}

await sql`
  insert into users ${
    sql(user, 'name', 'age')
  }
`




*/

/* const getViews = cache(
  async (): Promise<{slug: string; count: number}[]> => {
    const res = await sx.select().from(views)

    return res as Views[]
  },
  ['views'],
  {
    revalidate: 86400,
  }
)
 */
/* export async function getViewsCount(): Promise<
  { slug?: string; count: number }[]
> {
  if (!sx) {
    return []
  }
  noStore()
  const res = await sx.select().from(views)
  //console.log(res)
  return res as Views[]
} */

/* export async function TViews({slug}: {slug: string}) {
  const views = await getViews()
  return <TViewCounter allViews={views} slug={slug} />
}
 */
/* export async function TADDViews({slug}: {slug: string}) {
  const views = await ink(slug)
  //const views = await getViewsCount();
  return <ViewCounter views={views} />
}
 */
/* export async function ink(slug: string) {
  noStore()
  const res = await sx
    .insert(views)
    .values({ count: 1, slug: slug })
    .onConflictDoUpdate({
      target: views.slug,
      set: { count: dql`${views.count} + 1` },
    })
    .returning({ count: views.count })

  return res[0].count
}
 */
/* export async function pg_ink(slug: string) {
  noStore()
  const increment = { slug: slug, count: 1 }
  const res = await sql<Views[]>`insert into view ${sql(increment)} 
  on conflict (slug) do update set
  count = view.count + 1 returning count`

  return res[0].count
} */
export async function pg_ink(slug: string) {
  noStore()
  const { rows } = await db.query<Views>(
    `insert into views (slug, count) values( $1, 1 )
  on conflict (slug) do update set
  count = views.count + 1 returning count`,
    [slug]
  )

  return rows[0]
}

type Views = {
  slug?: string
  count: number
}

async function getSession(): Promise<Session> {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
}

/* export const formSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  message: z.string().min(1).max(1000),
  type: z.enum(['general', 'contract', 'advisory', 'agency']),
});
 */
const insertGB = v.object({
  body: v.string(),
})
type InsertGB = v.Input<typeof insertGB>
export async function saveGuestbookEntry(formData: FormData) {
  const session = await getSession()
  //const email = session.user?.email
  if (!session) {
    throw new Error('Unauthorized')
  }
  const entry = formData.get('entry')?.toString() || ''
  const body = entry.slice(0, 500)
  const data = { body, userId: session.user?.id }

  const { rows } = await db.query<InsertGB>(
    `insert into guests (body, "userId") values( $1, $2 ) returning *`,
    [data]
  )

  revalidatePath('/guestbook')
  return rows[0]
  /* 
  const data = await fetch(env.resendAdd, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.resendSecret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'mus@arifin.xyz',
      to: 'mus@arifin.xyz',
      subject: 'New Guestbook Entry',
      html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
    }),
  }) */
}

/* export async function deleteGuestbookEntries(selectedEntries: string[]) {
  const session = await auth()
  const email = session?.user?.email

  if (email !== env.adminEmail) {
    throw new Error('Unauthorized')
  }

  const selectedEntriesAsNumbers = selectedEntries.map(Number)
  const arrayLiteral = `{${selectedEntriesAsNumbers.join(',')}}`

  await sx
    .delete(guestbook)
    .where(eq(guestbook.id, sql`ANY(${arrayLiteral}::int[])`))
    .returning()

  revalidatePath('/admin')
  revalidatePath('/(site)/guestbook')
} */

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  const session = await auth()
  const email = session?.user?.email

  if (email !== env.adminEmail) {
    throw new Error('Unauthorized')
  }

  let selectedEntriesAsNumbers = selectedEntries.map(Number)
  let arrayLiteral = `{${selectedEntriesAsNumbers.join(',')}}`

  await db.query(
    `
    DELETE FROM guests
    WHERE id = ANY( $1 ::int[])
  `,
    [arrayLiteral]
  )

  revalidatePath('/admin')
  revalidatePath('/(site)/guestbook')
}

/* export async function getGuestbookEntries() {
  if (!sx) {
    return []
  }

  noStore()
  let entries = await sx
    .select()
    .from(gbView)
    .limit(100)
    .orderBy(desc(gbView.date))
  return entries
}
 */

export async function getGuestbookEntries(): Promise<Guestbook[]> {
  const { rows } = await db.query<Guestbook>(`
    SELECT * FROM guestview
    ORDER BY date DESC
    LIMIT 100
  `)
  if (!rows.length) return []
  return rows
}
/* 
export async function getComments(slug) {
  const x = await sx.select().from(comments).leftJoin(users, eq(users.id, comments.userId)).where(eq(comments.slug, slug))
  console.log(x)
  return x
} */

const insertCommentSchema = v.object({
  parentId: v.optional(v.string()),
  slug: v.string(),
  body: v.string(),
})
type InsertComment = v.Input<typeof insertCommentSchema>
export const addComment = async (payload: InsertComment) => {
  const session = await getSession()

  const newcomment = { ...payload, userId: session.user?.id }

  const { rows } = await db.query<InsertComment>(
    `insert into comments ("userId", body, slug, "parentId" ) values ($1 , $2 , $3 , $4) returning *`,
    [newcomment]
  )

  revalidatePath('/(site)/notes/[slug]', 'page')
  return rows[0]
}

/* const insertPGCommentSchema = v.object({
  "parentId": v.optional(v.string()),
  slug: v.string(),
  body: v.string(),
}) */

//type InsertPGComment = v.Input<typeof insertPGCommentSchema>
/* export const addPGComment = async (payload: InsertPGComment) => {
  const session = await getSession()
  const newcomment = { ...payload, "userId": session.user.id, id: fuckyouID(4) }

  const [query]: [InsertPGComment?] =
    await sql`insert into comment ${sql(newcomment)} returning *`
  revalidatePath('/(site)/notes/[slug]', 'page')
  return query
} */

/* export async function saveComment(formData: FormData) {
  const session = await getSession()
  const userId = session.users?.id
  //const zdata = formSchema.parse(Object.fromEntries(formData))
  if (!session) {
    throw new Error('Unauthorized')
  }

  const body = formData.get('entry')?.toString() || ''
  const slug = formData.get('slug')?.toString() || ''
  const parentId = formData.get('parentId')?.toString() || ''

  //zdata.slug = formData.get('slug')?.toString() || ''

  //const body = entry.slice(0, 500)
  //let data = { body , userId }

  await sx.insert(comments).values({slug, body, parentId: Number(parentId), userId})
  revalidatePath('/(site)/notes/[slug]', 'page')
} */

/* const updateCommentSchema = v.object({
  id: v.string(),
  body: v.string(),
})
type UpComment = v.Output<typeof updateCommentSchema>
 */
const eraseCommentSchema = v.object({
  userId: v.string(),
  id: v.string(),
})

type NoComment = v.Output<typeof eraseCommentSchema>
/* export const updateComment = async ({ id, body }: UpComment) => {
  const session = await getSession()

  await sx
    .update(comments)
    .set({ body })
    .where(and(eq(comments.id, id), eq(comments.userId, session.user.id)))
    .returning({ body: comments.body })
  revalidatePath('/(site)/notes/[slug]', 'page')
} */

export const deleteComment = async ({ id }: NoComment) => {
  const session = await getSession()

  if (!session.user?.id) {
    throw new Error('Unauthorized')
  }

  return await db.query(
    `DELETE FROM comments
    WHERE id = $1 and "userId" = $2`,
    [id, session.user?.id]
  )
}

/* const groupBy = (arr, key) =>
    arr.reduce(
        (acc, item) => (
            (acc[item[key]] = [...(acc[item[key]] || []), item]), acc
        ),
        {}
    )
 */
/* s */
/* export async function getPGComments(slug: string) {
  const posts = await sql`
  select * from comment_view
  where comment_view.slug = ${slug}`
  console.log(posts)
  return posts
}
 */
export async function getComments(slug: string) {
  const { rows } = await db.query<CommentProps>(
    `
  select * from commentview
  where commentview.slug = $1`,
    [slug]
  )
  //console.log(rows)
  return structuredClone(rows)
}

/* export async function getCommentsINADIFFERENTWAY(slug: string) {
  const posts = await sx.query.comments.findMany({
    where: (comments, { eq }) => eq(comments.slug, slug),
    with: {
      users: true,
    },
  })

  console.log('gql-style::', posts)
  return posts
}
 */
/* export async function getComments2(slug) {
  const x = await sx.execute(sql`select threaded_comments (${slug})`)
  console.log(x)
  return x
}
 */
export async function subscribe(prevState: never, formData: FormData) {
  const schema = v.object({
    email: v.string(),
  })
  const data = v.parse(schema, Object.fromEntries(formData))

  try {
    const response = await resend.contacts.create({
      email: data.email,
      unsubscribed: false,
      audienceId,
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

    return { message: 'Subscribed!' }
  } catch (error) {
    const message = parseError(error)

    return { message }
  }
}

/*  
    updateComment: protectedProcedure
    .input(
      z.object({
        commentId: z.number(),
        text: z.string(),
        updatedAt: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const res = await sx.select().from(comments).where(
  and(
    eq(comments.id, commentId),
    eq(comments.userId, session.userId)
  )
);
    
      return await sx.update(comments)
  .set({ body })
  .where(eq(comments.id, commentId))
  .returning({ body });
  
  
  revalidatePath('/guestbook')

  const data = await fetch(env.resendAdd, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.resendSecret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'mus@arifin.xyz',
      to: 'mus@arifin.xyz',
      subject: 'New Guestbook Entry',
      html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
    }),
  })

  const response = await data.json()
  console.log('Email sent', response)
}

export async function getComments(slug) {
  const x = await sx.select().from(commentWithAuthor).where(eq(commentWithAuthor.slug, slug))
  console.log(x)
  return x
}

 export async function addComment() {
  let formData: FormData
  const session = await getSession()
  const userId = session.userId
  const entry = formData.get('entry')?.toString() || ''
  const body = entry.slice(0, 1000)
  const data = formSchema.parse(Object.fromEntries(formData))

  let zdata = {userId: userId, body: body, slug: data.slug, parentId: data.parentId}

  const x = await sx.insert(comments).values(zdata).returning()
  return {...x}
} 
const insertCommentSchema = createInsertSchema(comments).pick({
  //userId: true,
  body: true,
  slug: true,
  parentId: true,
})
type InsertComment = z.infer<typeof insertCommentSchema>
export const addComment = async (payload: InsertComment) => {
  const session = await getSession()
  const comments = insertCommentSchema.parse(payload)

  const query = await sx.insert(comments).values({body: comments.body, slug: comments.slug, userId: session.userId}).returning()

  return query
}

export const deleteComment = async ({id}) => {
  //const comments = insertCommentSchema.parse(payload)

  await sx.delete(comments).where(eq(comments.id, id))
}

const updateCommentSchema = createInsertSchema(comments).pick({
  body: true,
  id: true,
})
type UpComment = z.infer<typeof updateCommentSchema>
export const updateComment = async (payload: UpComment) => {
  const session = await getSession()
  const comments = updateCommentSchema.parse(payload)

   const res = await sx.select().from(comments).where(
  and(
    eq(comments.id, commentId),
    eq(comments.userId, session.userId)
  )
);
    
      return await sx.update(comments)
  .set({ body:comments.body })
  .where(eq(comments.id, commentId:comments.id))
  .returning({ body });
}

const toggleSchema = createSelectSchema(likes).pick({
  commentId: true,
})
type ToggleLike = z.infer<typeof toggleSchema>

export const toggleLikes = async (payload: ToggleLike) => {
  const session = await getSession()
  const toggle = toggleSchema.parse(payload)

  const like = await sx
    .select()
    .from(likes)
    .where(and(eq(users.id, session.userId), eq(comments.id, toggle.commentId)))

  if (like === null) {
    return await sx
      .insert(likes)
      .values({commentId: toggle.commentId, userId: session.userId})
      .then(() => {
        return {addLike: true}
      })
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return await sx
      .delete(likes)
      .where(and(eq(users.id, session.userId), eq(comments.id, toggle.commentId)))
      .then(() => {
        return {addLike: false}
      })
  }
}

export const contact = async (
  prevState: never,
  formData: FormData
): Promise<{
  message: string
}> => {
  const data = contactSchema.parse(Object.fromEntries(formData))

  console.log('📧 Contact form submission', data)

  try {
    const ip = headers().get('x-forwarded-for')
    const opts = {
      tableName: 'rate_limiter',
      tableCreated: true,
      points: 6, // 6 points
      duration: 1, // Per second
      storeClient: pool,
    }

    const rateLimit = new RateLimiterPostgres(opts)
    await rateLimit
      .consume(ip?.toString()!, 2) // consume 2 points
      .then((rateLimiterRes) => {
        // 2 points consumed
      })
      .catch((rateLimiterRes) => {
        // Not enough points to consume
      })

        if (!limit) {
      throw new Error('You have reached your request limit. Please try again later.')
    } 

    console.log('📧 Sending email...')

    const response = await resend.emails.send({
      from,
      to,
      subject: `New ${data.type} message from ${data.name}`,
      reply_to: data.email,
      text: data.message,
    })

    console.log('📧 Email sent', {response})

    if (response.error) {
      throw new Error(response.error.message)
    }

    console.log('📧 Contact form submission successful')

    revalidatePath('/contact')

    return {message: 'Thanks! Your message has been sent.'}
  } catch (error) {
    const errorMessage = parseError(error)

    console.error('📧 Contact form submission failed', {error: errorMessage})

    return {message: errorMessage}
  }


*/
