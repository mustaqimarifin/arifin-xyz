import { getMDXComponent } from "next-contentlayer2/hooks";
import slow from "next/dynamic";
import NextImage from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { SpriteProps } from "./FileTree";
import FileTree from "./FileTree";
//import RImage from "./Pics";
import StaticTweet from "./tweet";

const RImage = slow(() => import("./Pics"), {
	ssr: false,
});

/* const FileTree = slow(() => import("./FileTree"), {
	ssr: false,
}); */

/* const StaticTweet = slow(() => import("./tweet"), {
	ssr: false,
}); */
/* function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
 */

/* const Paragraph = (props) => {
	if (typeof props.children !== "string" && props.children?.type === "img") {
		return <>{props.children}</>;
	}

	return <p {...props} />;
};
 */
function CustomLink(props) {
	const href = props.href;

	if (href.startsWith("/")) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}

	if (href.startsWith("#")) {
		return <a {...props} />;
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function Image(props) {
	return <NextImage alt={props.alt} className="flex mx-auto rounded-lg" {...props} />;
}

function Callout(props) {
	return (
		<div className="callout">
			<div className="emoji">{props.emoji}</div>
			<div className="children">{props.children}</div>
		</div>
	);
}

function ProsCard({ title, pros }) {
	return (
		<div className="border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full">
			<span>{`You might use ${title} if...`}</span>
			<div className="mt-4">
				{pros.map((pro) => (
					<div key={pro} className="flex font-medium items-baseline mb-2">
						<div className="h-4 w-4 mr-2">
							<svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
								<g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
									<path d="M22 4L12 14.01l-3-3" />
								</g>
							</svg>
						</div>
						<span>{pro}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function ConsCard({ title, cons }) {
	return (
		<div className="border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full">
			<span>{`You might not use ${title} if...`}</span>
			<div className="mt-4">
				{cons.map((con) => (
					<div key={con} className="flex font-medium items-baseline mb-2">
						<div className="h-4 w-4 mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-4 w-4 text-red-500"
							>
								<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
							</svg>
						</div>
						<span>{con}</span>
					</div>
				))}
			</div>
		</div>
	);
}

type HeadingProps = {
	id?: string;
	children?: ReactNode;
};

const Hash = ({ className }: SpriteProps) => {
	return (
		<svg width="24" height="24" className={className} role="img" aria-label="HASH">
			<use href="/sprite.svg#hash" />
		</svg>
	);
};

const heading = (As: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
	const Heading = ({ id, children }: HeadingProps) => (
		<a href={`#${id}`} className=" group relative no-underline focus-visible:ring-0">
			<Hash className=" group-hover:duration-700 group-hover:ease-in-out transition-all w-full h-full absolute -left-5 hidden  p-1 text-pink-500 group-hover:block group-focus-visible:block sm:-left-10 dark:text-pink-400 stroke-[3px]" />
			<As
				id={id}
				className="group-focus-visible:underline group-focus-visible:decoration-pink-500 group-focus-visible:decoration-2"
			>
				{children}
			</As>
		</a>
	);
	Heading.displayName = As;
	return Heading;
};

const components = {
	h1: heading("h1"),
	h2: heading("h2"),
	h3: heading("h3"),
	h4: heading("h4"),
	h5: heading("h5"),
	h6: heading("h6"),
	img: RImage,
	Image,
	a: CustomLink,
	Callout,
	ProsCard,
	ConsCard,
	StaticTweet,
	FileTree,
};

export async function MDX(props: any) {
	const Component = getMDXComponent(props.code);
	return <Component {...props} components={{ ...components, ...(props.components || {}) }} />;
}
