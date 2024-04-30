import { Link } from "@/components/link";

//import {time, timeEnd} from 'node:console'
//import { readFileSync } from "node:fs";
//import { readFile } from "node:fs/promises";
import { Card } from "@/components/card";
import { Header } from "@/components/header";
///time()
import { stack } from "@/data/stack";
import { cx } from "@/utils";
//import {stack} from '@/data/stack'
//import type { Stack } from "@/utils/types";
import type { Metadata } from "next";
//const stack = JSON.parse(readFileSync('./data/stack.json', 'utf-8'))
//timeEnd()
export const dynamic = "force-static";

const title = "Stack";
const description = "Tools and technologies I use.";

export const metadata: Metadata = {
	title,
	description,
};

/* async function getData(): Promise<Stack[]> {
     if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  } 

  const data = res.json()
  console.log(res)
  return res
} */

const Tool = ({ data }) => {
	const { hostname } = new URL(data.url);

	return (
		<Link
			href={data.url}
			key={data.url}
			className={cx(
				"no-underline items-center flex gap-4 p-4 rounded-lg transition-colors",
				"hover:bg-neutral-100",
				"dark:hover:bg-neutral-800",
			)}
		>
			<img
				src={`https://logo.clearbit.com/${hostname.replace("www.", "")}`}
				alt={hostname}
				width={32}
				height={32}
				className="rounded-md"
			/>
			<div>
				<div className="flex items-center gap-2">
					<p className={cx("text-sm font-medium", "text-neutral-900", "dark:text-neutral-100")}>{data.name}</p>
					{data.featured ? (
						<span
							className={cx(
								"text-xs px-2 rounded-full font-medium",
								"bg-neutral-100 text-neutral-700",
								"dark:bg-neutral-800 dark:text-neutral-300",
							)}
						>
							Featured
						</span>
					) : null}
				</div>
				<p className="text-sm text-neutral-500 dark:text-neutral-400">{data.description}</p>
			</div>
		</Link>
	);
};

const Stack = () => {
	//time()
	//let stack = require(`/data/stack.js`) as Stack[]

	//const stack = JSON.parse(readFileSync('./data/stack.json', 'utf-8'))
	//timeEnd()

	return (
		<>
			<Header title={title} description={description} />
			<div className="mt-8 grid gap-8 not-prose">
				{Object.values(stack).map(({ items, cat }) => (
					<Card key={cat} title={cat} className="p-2 grid sm:grid-cols-2 gap-x-2">
						{items.map((item) => (
							<Tool data={item} key={item.name} />
						))}
					</Card>
				))}
			</div>
		</>
	);
};
export default Stack;
