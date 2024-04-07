import {
  defineDocumentType,
  defineNestedType,
  makeSource,
  type ComputedFields,
} from "contentlayer/source-files";
import { readingTime } from "./app/utils";
//@ts-expect-error ass
import rehypeMdxImportMedia from "rehype-mdx-import-media";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, ""),
  },
  wordCount: {
    type: "number",
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
  readTime: {
    type: "string",
    resolve: (doc) => readingTime(doc.body.raw),
  },
  slugAsParams: {
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

const Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: `notes/*.mdx`,
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

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Note, Project],
  mdx: {
    remarkPlugins: [],

    rehypePlugins: [rehypeMdxImportMedia],
  },
});
