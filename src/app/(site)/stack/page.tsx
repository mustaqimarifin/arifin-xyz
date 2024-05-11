import styles from "$$/page/stack.module.css";
import { Header, Link } from "@/components/server";
import { db } from "@/db";
import { stacks } from "@/db/pg-schema";

import { miscStack, musicStack, prodStack } from "@/utils/sortedContent";

import { Card } from "@/components/server";
import type { Metadata } from "next";

const title = "Stack";
const description = "Tools and technologies I use.";

export const metadata: Metadata = {
  title,
  description,
};

type Stack = {
  type: "Code" | "Productivity" | "Music" | "Misc";
  items: Item[];
};

type Item = {
  name: string;
  url: string;
  description: string;
  featured?: boolean;
  image?: string;
};

const Tool = ({ data }) => {
  const { hostname } = new URL(data.url);

  return (
    <Link href={data.url} key={data.url} className={styles.url}>
      <img
        src={`https://logo.clearbit.com/${hostname.replace("www.", "")}`}
        alt={hostname}
        width={32}
        height={32}
        className="rounded-md"
      />
      <div>
        <div className="flex items-center gap-2">
          <p className={styles.name}>{data.name}</p>
          {data.featured ? <span className={styles.feat}>Featured</span> : null}
        </div>
        <p className={styles.desc}>{data.description}</p>
      </div>
    </Link>
  );
};

export default async function StackPage() {
  //time();
  //let stack = require(`@/data/stack.json`) as Stack[]
  const stack = await db.select().from(stacks);
  //let aStack = allStack(stack)
  const mStack = musicStack(stack);
  const pStack = prodStack(stack);
  const mcStack = miscStack(stack);

  //console.log(aStack)
  return (
    <>
      <Header title={title} description={description} />
      <div className={styles.stack}>
        <Card title="music" className={styles.card}>
          {mStack.map((item) => (
            <Tool data={item} key={item.name} />
          ))}
        </Card>
        <Card title="productivity" className={styles.card}>
          {pStack.map((item) => (
            <Tool data={item} key={item.name} />
          ))}
        </Card>
        <Card title="misc" className={styles.card}>
          {mcStack.map((item) => (
            <Tool data={item} key={item.name} />
          ))}
        </Card>
      </div>
    </>
  );
}
