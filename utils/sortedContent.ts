import { type Note, allNotes, allProjects } from "contentlayer/generated";
import { pick } from ".";
import { compareDesc, getYear } from "./_date";

export const projectParam = allProjects.map((p) => pick(p, ["slug", "year", "title"]));

export const noteParam = allNotes.map((p) => pick(p, ["slug", "date", "title", "draft", "tags"]));

type Acc = {
	[year: string]: typeof noteParam;
};

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

//console.log(notes);

//export const years = Object.keys(notes).sort((a, b) => compareDesc(new Date(a), new Date(b)));
export const years = Object.keys(notes).reverse();

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
