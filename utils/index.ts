import type { Options } from "rehype-pretty-code";

export const readingTime = (html: string): string => {
	const textOnly = html.replace(/<[^>]+>/g, "");
	const wordCount = textOnly.split(/\s+/).length;
	const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
	return `${readingTimeMinutes} min read`;
};

export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export const cx = (...classes: ClassValue[]) => classes.filter(Boolean).join(" ");

type ConvertUndefined<T> = OrUndefined<{
	[K in keyof T as undefined extends T[K] ? K : never]-?: T[K];
}>;
type OrUndefined<T> = { [K in keyof T]: T[K] | undefined };
type PickRequired<T> = {
	[K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>;

export const pick = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): ConvertPick<{ [K in Keys]: Obj[K] }> => {
	return keys.reduce((acc, key) => {
		acc[key] = obj[key];
		return acc;
	}, {} as any);
};

type NonNullableProps<T> = {
	[P in keyof T]: null extends T[P] ? never : P;
}[keyof T];

export function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
	const result = {} as T;
	for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key];
	return result;
}

export function slugify(str) {
	return str
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
	const res = await fetch(input, init);
	return res.json();
}

export const codeOptions: Options = {
	keepBackground: false,
	filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
	//theme: JSON.parse(fs.readFileSync('./lib/moonlight-ii.json', 'utf-8')),
	theme: "one-dark-pro",
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: "text", value: " " }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className?.push("highlighted");
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ["word"];
	},
};
