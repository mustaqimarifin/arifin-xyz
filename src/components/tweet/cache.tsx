import { type Tweet, fetchTweet } from 'react-tweet/api'

import { db } from '@/db'
export async function getTweet(
  id: string,
  fetchOptions?: RequestInit
): Promise<Tweet | undefined> {
  try {
    const { data, tombstone, notFound } = await fetchTweet(id, fetchOptions)
    if (data) {
      //await sx.insert(tweets).values({ key: `tweet:${id}`, value: data })
      await db.query(`insert into tweets (key,value) values ($1, $2)`, [
        id,
        structuredClone(data),
      ])
      console.log('TWEET::Fetch', 1)

      return data
    }
    if (tombstone || notFound) {
      //await sx.delete(tweets).where(eq(tweets.key, `tweet:${id}`))
      await db.query(`delete from tweets where key = $1`, [id])
    }
  } catch (error) {}
  /*   const cachedTweet = await sx
    .select()
    .from(tweets)
    .where(eq(tweets.key, `tweet:${id}`)) */

  const cachedTweet = await db.query<Tweet>(
    `select * from tweet where key = $1`,
    [id]
  )

  console.log('TWEET::Cache', 1)
  return cachedTweet.rowCount !== 0 ? cachedTweet.rows[0] : undefined
}
