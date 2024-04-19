import NoteLayout from "@/components/NoteLayout";
import { notes, posts, years } from "@/utils/sortedContent";
import { allNotes } from "contentlayer/generated";

export const metadata = {
	title: "Notes",
	description: "Read my thoughts on software development, design, and more.",
};

const RSCNoteLayout = async () => {
	return <NoteLayout posts={allNotes} />;
};

export default RSCNoteLayout;
