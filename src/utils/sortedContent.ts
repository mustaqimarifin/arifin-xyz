import type { Stack } from '@/app/(site)/stack/page'
import { allNotes } from 'content-collections'
import { compareDesc, getYear } from './_date'
//import {allProjects} from 'contentlayer/generated'
import { pick } from '.'

//export const projectParam = allProjects.map((p) => pick(p, ['slug', 'year', 'title']))

export const noteParam = allNotes.map((p) =>
  pick(p, ['slug', 'date', 'title', 'draft', 'tags'])
)

type Acc = {
  [year: string]: typeof allNotes
}

/**
 * Sorts a list of MDX documents by date in descending order
 *
 * @param {MDXDocumentDate[]} allPosts
 * @return {*}
 */
export function sortPosts(allPosts: any[]) {
  return allPosts.sort(
    (
      a: { date: string | number | Date },
      b: { date: string | number | Date }
    ) => compareDesc(new Date(a.date), new Date(b.date))
  )
}

export function sortPostsByYear(allPosts: any[]) {
  const yearGroup = [
    ...new Set(
      allPosts.flatMap((post: { date: string | number }) =>
        getYear(post.date).toString()
      )
    ),
  ]
  //console.log(yearGroup);
  return yearGroup.map((year) => {
    const filteredPosts = allPosts
      .filter((post: { date: unknown[] }) => post.date.includes(year))
      .sort(
        (a: { date: number }, b: { date: number }) =>
          b.date.valueOf() - a.date.valueOf()
      )
    return filteredPosts
  })
}

export function sortAZ(x: any[]) {
  return x.sort((a: { name: string }, b: { name: any }) =>
    a.name.localeCompare(b.name)
  )
}
export function musicStack(allstacks: Stack[]) {
  return allstacks.filter((stack) => stack.type === 'music')
}
export function prodStack(allstacks: Stack[]) {
  return allstacks.filter((stack) => stack.type === 'productivity')
}
export function miscStack(allstacks: Stack[]) {
  return allstacks.filter((stack) => stack.type === 'misc')
}
export const sortedStack = allNotes
  .filter((t) => t.draft === false)
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
//console.log(sortPostsByYear(noteParam));
export const sortedNotes = allNotes
  .filter((t) => t.draft === false)
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

//export const sortedNotes = allCoreContent(sortPosts(allNotes))

export const notes = sortedNotes.reduce((acc: Acc, post) => {
  const year = getYear(post.date).toString()
  if (!acc[year]) {
    acc[year] = []
  }
  acc[year].push(post)
  return acc
}, {})

//^ Slower
//export const years = Object.keys(notes).sort((a, b) => compareDesc(new Date(a), new Date(b)));
export const years = Object.keys(notes).reverse()

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

/* export const projects = allProjects
  .filter((p) => !p.playground && p.draft === false)
  .sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)))
 */
/* export const playgroundProjects = allProjects
  .filter((p) => p.playground && p.draft === false)
  .sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)))
 */
/**
 * A typesafe omit helper function
 * @example omit(content, ['body', '_raw', '_id'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {Omit<Obj, Keys>}
 */
/* export const omit = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj)
  for (let key of keys) {
    delete result[key]
  }
  return result
}
 */
