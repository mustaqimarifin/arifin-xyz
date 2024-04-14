import { allNotes, allProjects } from "contentlayer/generated";
//import allNotes from "scripts/Notes/withoutbody.json";
import { pick } from ".";
import { compareDesc } from "./_date";

export const projectParam = allProjects.map((p) => pick(p, ["slug", "year", "title"]));

export const noteParam = allNotes.map((p) => pick(p, ["slug", "date", "title", "draft", "tags"]));

export const notes = noteParam
	.filter((t) => t.draft === false)
	.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

//console.log(notes);

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
