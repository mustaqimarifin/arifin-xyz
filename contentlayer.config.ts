import { writeFileSync } from "node:fs";
import { type ComputedFields, defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
//@ts-ignore
import impMedia, { type RehypeMdxImportMediaOptions } from "rehype-mdx-import-media";
import rehypePresetMinify from "rehype-preset-minify";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { readingTime, slugify } from "./utils";
import remarkUnwrapImages from "./utils/unwrapImages.js";

const root = process.cwd();
const isProduction = process.env.NODE_ENV === "production";

const computedFields: ComputedFields = {
	/* 	slug: {
		type: "string",
		resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, ""),
	}, */
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
	const tagCount: Record<string, number> = {};
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

const mdxImgOptions: RehypeMdxImportMediaOptions = {
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
		rehypePlugins: [
			rehypeSlug,
			//@ts-ignore
			[impMedia, mdxImgOptions],
			//@ts-ignore
			rehypePresetMinify,
		],
	},
	onSuccess: async (importData) => {
		const { allNotes } = await importData();
		createTagCount(allNotes);
	},
});
