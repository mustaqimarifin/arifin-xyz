import {db} from '@/db'
import {tweets} from '@/db/pg-schema'
import {eq} from 'drizzle-orm'
import {type Tweet, fetchTweet} from 'react-tweet/api'
export async function getTweet(id: string, fetchOptions?: RequestInit): Promise<Tweet | undefined> {
  try {
    // const cachedTweet = await kv.get(`tweet:${id}`)

    //return cachedTweet ?? undefined
    const {data, tombstone, notFound} = await fetchTweet(id, fetchOptions)
    if (data) {
      await db.insert(tweets).values({key: `tweet:${id}`, value: data!})
      //return JSONB.parse(data) as any
      //console.log("insert", 1);

      return data
    }
    if (tombstone || notFound) {
      // remove the tweet from the cache if it has been made private by the author (tombstone)
      // or if it no longer exists.
      await db.delete(tweets).where(eq(tweets.key, `tweet:${id}`))
    }
  } catch (error) {
    /*   if (cachedTweet) {
    console.log('cachedTweet', 1)
    return JSONB.parse(cachedTweet[0].value!) as any
  } */
  }
  const cachedTweet = await db
    .select()
    .from(tweets)
    .where(eq(tweets.key, `tweet:${id}`))

  //console.log("cachedTweet", 1);
  return cachedTweet[0].value as any
}
