import Link from "next/link";
import { Suspense } from "react";
import { TViews } from "../../components/views";
import { formatDate } from "../../utils/_date";
import { projects } from "../../utils/sortedContent";

export const metadata = {
  title: "Notes",
  description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
  return (
    <section>
      <h1 className="text-2xl mb-8 ">notes</h1>
      {projects.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/notes/${post.slug}`}
        >
          <div className="w-full flex flex-col ">
            <h2 className="text-neutral-900 dark:text-neutral-100">
              {post.title}
            </h2>
            <div className="flex-1 mr-4 text-neutral-600 dark:text-neutral-400 font-mono font-bold  tabular-nums text-xs uppercase">
              {formatDate(post.year)}

              <Suspense fallback={<p className="h-6" />}>
                <TViews slug={post.slug} />
              </Suspense>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
