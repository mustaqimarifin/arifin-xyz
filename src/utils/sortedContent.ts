import type { Stack } from "@/db/pg-schema";
import allNotes from "@/meta/allNotes.json";
import { allProjects } from "contentlayer/generated";
import type { Document, MDX } from "contentlayer2/core";
import { pick } from ".";
import { compareDesc, getYear } from "./_date";

const isProduction = process.env.NODE_ENV === "production";

export const projectParam = allProjects.map((p) =>
  pick(p, ["slug", "year", "title"]),
);

export const noteParam = allNotes.map((p) =>
  pick(p, ["slug", "date", "title", "draft", "tags"]),
);

type Acc = {
  [year: string]: typeof allNotes;
};

/**
 * Sorts a list of MDX documents by date in descending order
 *
 * @param {MDXDocumentDate[]} allPosts
 * @return {*}
 */
export function sortPosts(allPosts) {
  return allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
}

export function sortPostsByYear(allPosts) {
  const yearGroup = [
    ...new Set(allPosts.flatMap((post) => getYear(post.date).toString())),
  ];
  //console.log(yearGroup);
  return yearGroup.map((year) => {
    const filteredPosts = allPosts
      .filter((post) => post.date.includes(year))
      .sort((a, b) => b.date.valueOf() - a.date.valueOf());
    return filteredPosts;
  });
}

export function sortAZ(x) {
  return x.sort((a, b) => a.name.localeCompare(b.name));
}
export function musicStack(allstacks: Stack[]) {
  return allstacks.filter((stack) => stack.type === "music");
}
export function prodStack(allstacks: Stack[]) {
  return allstacks.filter((stack) => stack.type === "productivity");
}
export function miscStack(allstacks: Stack[]) {
  return allstacks.filter((stack) => stack.type === "misc");
}
export const sortedStack = allNotes
  .filter((t) => t.draft === false)
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
//console.log(sortPostsByYear(noteParam));
export const sortedNotes = allNotes
  .filter((t) => t.draft === false)
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

//export const sortedNotes = allCoreContent(sortPosts(allNotes))

export const notes = sortedNotes.reduce((acc: Acc, post) => {
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

/*  <div class="space-y-4">
        {years.map(year => (
          <section class="animate space-y-4">
            <div class="font-semibold text-black dark:text-white">
              {year}
            </div>
            <div>
              <ul class="flex flex-col gap-4">
                {
                  posts[year].map((post) => (
                    <li>
                      <ArrowCard entry={post}/>
                    </li>
                  ))
                }
              </ul>
            </div>
          </section>
        ))}
      </div> */

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
export const omit = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[],
): Omit<Obj, Keys> => {
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
export function allCoreContent<T extends MDXDocument>(
  contents: T[],
): CoreContent<T>[] {
  if (isProduction)
    return contents
      .map((c) => coreContent(c))
      .filter((c) => !("draft" in c && c.draft === true));
  return contents.map((c) => coreContent(c));
}
