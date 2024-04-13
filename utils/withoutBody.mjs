import { mkdir, writeFile } from "node:fs/promises";
import { allNotes } from "../.contentlayer/generated/index.mjs";

const createJson = () => {
	return allNotes.map((post) => {
		const { body, ...content } = post;
		return content;
	});
};

(async () => {
	console.log(`create posts json without body for ${allNotes.length} paths`);
	const json = createJson();
	await mkdir("./.scripts/Notes", {
		recursive: true,
	});
	await writeFile("./.scripts/Notes/withoutbody.json", JSON.stringify(json, null, 2), {
		encoding: "utf-8",
	});
})();
