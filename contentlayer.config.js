import { writeFileSync } from "node:fs";
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { codeOptions, readingTime, slugify } from "./utils/index.js";
import remarkUnwrapImages from "./utils/unwrapImages.js";

const root = process.cwd();
const isProduction = process.env.NODE_ENV === "production";

/** @type {import('contentlayer2/source-files').ComputedFields} */
const computedFields = {
	tweetIds: {
		type: "json",
		resolve: (doc) => {
			const tweetMatches = doc.body.raw.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
			return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
		},
	},
	wordCount: {
		type: "number",
		resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
	},
	readTime: {
		type: "string",
		resolve: (doc) => readingTime(doc.body.raw),
	},
	slug: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};
const Credits = defineNestedType(() => ({
	name: "Credits",
	fields: {
		name: {
			type: "string",
		},
		url: {
			type: "string",
		},
	},
}));

function createTagCount(allNotes) {
	const tagCount = {};
	for (const file of allNotes) {
		if (file.tags && (!isProduction || file.draft !== true)) {
			for (const tag of file.tags) {
				const formattedTag = slugify(tag);
				if (formattedTag in tagCount) {
					tagCount[formattedTag] += 1;
				} else {
					tagCount[formattedTag] = 1;
				}
			}
		}
	}
	writeFileSync("./app/tag-data.json", JSON.stringify(tagCount));
}

const Note = defineDocumentType(() => ({
	name: "Note",
	filePathPattern: `notes/**/*.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		summary: {
			type: "string",
		},
		date: {
			type: "string",
			required: true,
		},
		image: {
			type: "string",
		},
		credits: {
			type: "nested",
			of: Credits,
		},
		tags: { type: "list", of: { type: "string" }, default: [] },
		draft: {
			type: "boolean",
			default: false,
		},
	},
	computedFields,
}));

const Collaborator = defineNestedType(() => ({
	name: "Collaborator",
	fields: {
		name: {
			type: "string",
			required: true,
		},
		url: {
			type: "string",
			required: true,
		},
		avatar: {
			type: "string",
			required: true,
		},
	},
}));

const LiveLink = defineNestedType(() => ({
	name: "LiveLink",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		url: {
			type: "string",
			required: true,
		},
	},
}));

const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: `projects/*.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		year: {
			type: "date",
			required: true,
		},
		image: {
			type: "string",
		},
		description: {
			type: "string",
			required: true,
		},
		playground: {
			type: "boolean",
			required: true,
			default: false,
		},
		links: {
			type: "list",
			of: LiveLink,
		},
		collaborators: {
			type: "list",
			of: Collaborator,
		},
		draft: {
			type: "boolean",
			default: false,
		},
	},
	computedFields,
}));

const mdxImgOptions = {
	preserveHash: "both",
	preserveQuery: "both",
	resolve: false,
};

export default makeSource({
	contentDirPath: "./content",
	documentTypes: [Note, Project],
	mdx: {
		cwd: root,
		remarkPlugins: [remarkUnwrapImages, remarkGfm],
		rehypePlugins: [[rehypePrettyCode, codeOptions], rehypeSlug],
	},
	onSuccess: async (importData) => {
		const { allNotes } = await importData();
		createTagCount(allNotes);
	},
});
