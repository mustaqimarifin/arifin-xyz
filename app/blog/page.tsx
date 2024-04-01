import Link from 'next/link';
import { Suspense } from 'react';
import { postParam } from '../utils/sortedContent';
import { Views } from '../components/views';
import { formatDate } from '../utils/_date';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {

  return (
    <section>
      <h1 className="text-2xl mb-8 ">
        notes
      </h1>
      {postParam
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 font-semibold tracking-tight">
                {post.title}
              </p>          
              <div className="flex-1 mr-4 text-neutral-600 dark:text-neutral-400  font-bold font-mono tabular-nums text-xs uppercase">
            {formatDate(post.date)}
        
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense> 
                </div>
            </div>
          </Link>
        ))}
    </section>
  );
}
