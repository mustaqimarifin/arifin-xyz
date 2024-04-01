'use server';

import {
  unstable_noStore as noStore,
} from 'next/cache';
import { turso } from './postgres';


export async function getGuestbookEntries() {
  if (!process.env.TURSO_URL) {
    return [];
  }
  noStore();
    const posts = await turso.execute('SELECT * FROM guestbook ORDER BY created_at DESC LIMIT 100')  
console.log(posts.rows)
  return posts.rows

}
