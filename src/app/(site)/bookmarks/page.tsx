import styles from "$$/page/notes.module.css";

import { Header } from "@/components/server";
import { db } from "@/db";
import { type Bookmark, bookmarks } from "@/db/pg-schema";
import MDXLayout from "@/layouts/mdxLayout";
import { cx } from "@/utils";
import { sortAZ } from "@/utils/sortedContent";
import type { Metadata } from "next";

const title = "Bookmarks";
const description = "From across the Internetz";

export const metadata: Metadata = {
  title,
  description,
};

const Post = (post) => {
  const { name, type, url } = post;

  return (
    <a className={styles["note-link"]} key={name} href={url}>
      <div className={styles.title}>{name}</div>
      <hr className={styles.rule} />
      <div className={cx(styles.date, "italic")}>{type}</div>
    </a>
  );
};

const Bookmarks = async () => {
  const bmx = await db.select().from(bookmarks);
  const items: Bookmark[] = sortAZ(bmx);

  return (
    <>
      <section className="h-dvh">
        <Header title={title} description={description} />
        <MDXLayout>
          <div className="mt-8 grid gap-4">
            {items.map((post) => (
              <Post key={post.name} {...post} />
            ))}
          </div>
        </MDXLayout>
      </section>
    </>
  );
};

export default Bookmarks;
