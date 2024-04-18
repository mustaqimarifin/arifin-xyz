import { allNotes, allProjects } from "contentlayer/generated";
import type { Document, MDX } from "contentlayer2/core";
import { pick } from ".";
import { compareDesc, getYear } from "./_date";

const isProduction = process.env.NODE_ENV === "production";

export const projectParam = allProjects.map((p) => pick(p, ["slug", "year", "title"]));

export const noteParam = allNotes.map((p) => pick(p, ["slug", "date", "title", "draft", "tags"]));

type Acc = {
	[year: string]: typeof noteParam;
};

/**
 * Sorts a list of MDX documents by date in descending order
 *
 * @param {MDXDocumentDate[]} allPosts
 * @return {*}
 */
export function sortPosts<T extends MDXDocumentDate>(allPosts: T[]) {
	return allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export const posts = noteParam
	.filter((t) => t.draft === false)
	.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

export const notes = posts.reduce((acc: Acc, post) => {
	const year = getYear(post.date).toString();
	if (!acc[year]) {
		acc[year] = [];
	}
	acc[year].push(post);
	return acc;
}, {});

//^ Slower
//export const years = Object.keys(notes).sort((a, b) => compareDesc(new Date(a), new Date(b)));
export const years = Object.keys(notes).reverse();

export const projects = allProjects
	.filter((p) => !p.playground && p.draft === false)
	.sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)));

export const playgroundProjects = allProjects
	.filter((p) => p.playground && p.draft === false)
	.sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)));

/**
 * A typesafe omit helper function
 * @example omit(content, ['body', '_raw', '_id'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {Omit<Obj, Keys>}
 */
export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
	const result = Object.assign({}, obj);
	for (let key of keys) {
		delete result[key];
	}
	return result;
};

export type MDXDocument = Document & { body: MDX };
export type MDXDocumentDate = MDXDocument & {
	date: string;
};
export type MDXBlog = MDXDocumentDate & {
	tags?: string[];
	draft?: boolean;
};

export type CoreContent<T> = Omit<T, "body" | "_raw" | "_id">;

/**
 * Omit body, _raw, _id from MDX document and return only the core content
 *
 * @param {T} content
 * @return {*}  {CoreContent<T>}
 */
export function coreContent<T extends MDXDocument>(content: T): CoreContent<T> {
	return omit(content, ["body", "_raw", "_id"]);
}

/**
 * Omit body, _raw, _id from a list of MDX documents and returns only the core content
 * If `NODE_ENV` === "production", it will also filter out any documents with draft: true.
 *
 * @param {T[]} contents
 * @return {*}  {CoreContent<T>[]}
 */
export function allCoreContent<T extends MDXDocument>(contents: T[]): CoreContent<T>[] {
	if (isProduction) return contents.map((c) => coreContent(c)).filter((c) => !("draft" in c && c.draft === true));
	return contents.map((c) => coreContent(c));
}
