'use server'
import {auth} from 'app/auth'
import {type Session} from 'next-auth'
import {revalidatePath, unstable_noStore as noStore} from 'next/cache'
import {guestbook, users, views} from './schema'
import {db} from '.'
import { desc, eq, sql} from 'drizzle-orm'
export async function getViewsCount(): Promise<{slug: string; count: number}[]> {
  if (!db) {
    return []
  }
  noStore()
  const res = await db.select().from(views)
  //console.log(res)
  return res as Views[]
}

export async function ink(slug: string) {
  noStore()
  let res = await db
    .insert(views)
    .values({count: 1, slug: slug})
    .onConflictDoUpdate({
      target: views.slug,
      set: { count: sql`${views.count} + 1` }, 
    }).returning({count:views.count})
    
    return res[0].count
}

type Views = {
  slug: string
  count: number
}

async function getSession(): Promise<Session> {
  let session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function saveGuestbookEntry(formData: FormData) {
  let session = await getSession()
  let userId = session.userId as string
  let email = session.user?.email as string
  //let avatar = session.user?.image as string;

  //let id = xId();
  if (!session.user) {
    throw new Error('Unauthorized')
  }
  let entry = formData.get('entry')?.toString() || ''
  let body = entry.slice(0, 500)
  //let data = { body , userId }

  await db.insert(guestbook).values({body: body, userId: userId, date: new Date()}).returning()

  /*   await turso.execute(
    
      {
        sql: "INSERT INTO guestbookB (userId, body, created_at) VALUES (?,?,?)",
        args: [userId, body, Date.now()],
      },
    
    
  ); */

  revalidatePath('/guestbook')

  let data = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'guestbook@arifin.xyz',
      to: 'me@arifin.xyz',
      subject: 'New Guestbook Entry',
      html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
    }),
  })

  let response = await data.json()
  console.log('Email sent', response)
}

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  let session = await getSession()
  let email = session.user?.email as string

  if (email !== 'mustaqim.arifin@gmail.com') {
    throw new Error('Unauthorized')
  }

  let selectedEntriesAsNumbers = selectedEntries.map(Number)
  let arrayLiteral = `{${selectedEntriesAsNumbers.join(',')}}`

  /*   await sql`
    DELETE FROM guestbook
    WHERE id = ANY(${arrayLiteral}::int[])
  `; */
  await db
    .delete(guestbook)
    .where(eq(guestbook.id, sql`ANY(${arrayLiteral}::int[])`))
    .returning()
  /*  await turso.batch(
    [
      {
        sql: "delete from guestbookB where id = ?",
        args: [`ANY(${arrayLiteral}::int[])`],
      },
    ],
    "write",
  ); */

  revalidatePath('/admin')
  revalidatePath('/guestbook')
}

export async function getGuestbookEntries() {
  if (!db) {
    return []
  }

  noStore()
  return db.select().from(guestbook).leftJoin(users, eq(users.id, guestbook.userId)).limit(100).orderBy(desc(guestbook.date))
}
