import NoteLayout from "@/app/components/NoteLayout";
import { notes, posts, years } from "@/utils/sortedContent";

export const metadata = {
	title: "Notes",
	description: "Read my thoughts on software development, design, and more.",
};

const RSCNoteLayout = async () => {
	return <NoteLayout posts={posts} notes={notes} years={years} />;
};

export default RSCNoteLayout;
