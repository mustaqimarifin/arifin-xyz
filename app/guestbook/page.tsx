import { auth } from 'app/auth';
import { getGuestbookEntries } from 'app/db/queries';
import { SignIn, SignOut } from './but2';
import { Suspense } from 'react';
import Form from './form';
import { Avatar } from '../components/Avatar';

export const metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
};

export default function GuestbookPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        leave a message
      </h1>
      <Suspense>
        <GuestbookForm />
        <GuestbookEntries />
      </Suspense>
    </section>
  );
}

async function GuestbookForm() {
  let session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id?.toString()} className="flex flex-col items-center justify-between space-x-4 space-y-1 mb-4">
      <div className="flex items-center  w-full text-sm break-words">
      <div className="inline-flex mr-4">
            <Avatar
              user={entry.author}
              src={entry.avatar}
              quality={100}
              className="rounded-full"
            />
          </div>
        <span className="text-neutral-600 dark:text-neutral-400 mr-4">
          {entry.created_by?.toString()}:
        </span>
        {entry.body?.toString()}
      </div>
    </div>
  ));
}
