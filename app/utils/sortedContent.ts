import { allProjects, allNotes } from "contentlayer/generated";
import { pick } from ".";
import { compareDesc } from "./_date";

export const projectParam = allProjects.map((p) =>
  pick(p, ["slug", "year", "title"]),
);

export const postParam = allNotes.map((p) =>
  pick(p, ["slug", "date", "title"]),
);

export const notes = allNotes
  .filter((t) => t.draft === false)
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

export const projects = allProjects
  .filter((p) => !p.playground && p.draft === false)
  .sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)));

export const playgroundProjects = allProjects
  .filter((p) => p.playground && p.draft === false)
  .sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)));

/* const projects = allProjects
.filter((project) => project.playground)
.sort((a, b) => 
  new Date(a.year).getTime() - new Date(b.year).getTime())
.reverse()
 */
