'use server';

import { auth } from 'app/auth';
import { type Session } from 'next-auth';
import {  turso } from './postgres';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { rdx } from './redis';
import { xId } from './nanoid';

export async function increment(slug: string) {
	noStore();
	await rdx.incr(["pageviews", slug].join(":"));
}


async function getSession(): Promise<Session> {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function saveGuestbookEntry(formData: FormData) {
  let session = await getSession();
  let email = session.user?.email as string;
  let created_by = session.user?.name as string;
  let avatar = session.user?.image as string;

  let id = xId()
  if (!session.user) {
    throw new Error('Unauthorized');
  }

  let entry = formData.get('entry')?.toString() || '';
  let body = entry.slice(0, 500);


   await turso.batch(
  [
    {
      sql: "INSERT INTO guestbook (id, email, body, created_by, created_at, avatar) VALUES (?,?,?,?,?,?)",
      args: [id,email, body, created_by, Date.now() ,avatar],
    },
  ],
  "write"
);

  revalidatePath('/guestbook');

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
  });

  let response = await data.json();
  console.log('Email sent', response);
}

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  let session = await getSession();
  let email = session.user?.email as string;

  if (email !== 'me@arifin.xyz') {
    throw new Error('Unauthorized');
  }

  let selectedEntriesAsNumbers = selectedEntries.map(Number);
  let arrayLiteral = `{${selectedEntriesAsNumbers.join(',')}}`;

/*   await sql`
    DELETE FROM guestbook
    WHERE id = ANY(${arrayLiteral}::int[])
  `; */
  
     await turso.batch(
  [
    {
     sql: "delete from guestbook where id = ?",
     args: [`ANY(${arrayLiteral}::int[])`],
    },
  ],
  "write"
);


  revalidatePath('/admin');
  revalidatePath('/guestbook');
}
