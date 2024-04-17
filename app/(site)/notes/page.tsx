import { time, timeEnd } from "node:console";
import NoteLayout from "@/app/components/NoteLayout";
import { notes, posts, years } from "@/utils/sortedContent";

export const metadata = {
	title: "Notes",
	description: "Read my thoughts on software development, design, and more.",
};
/* time("years");
console.log(years);
timeEnd("years");

time("years2");
console.log(years2);
timeEnd("years2");
 */
const RSCNoteLayout = async () => {
	return <NoteLayout posts={posts} notes={notes} years={years} />;
};

export default RSCNoteLayout;
