export const readingTime = (html: string): string => {
  const textOnly = html.replace(/<[^>]+>/g, '')
  const wordCount = textOnly.split(/\s+/).length
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed()
  return `${readingTimeMinutes} min read`
}

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined
export type ClassDictionary = Record<string, any>
export type ClassArray = ClassValue[]

/* export const cx = (...classes: ClassValue[]) =>
  twMerge(classes.filter(Boolean).join(" "));
   */
export const cx = (...classes: ClassValue[]) =>
  classes.filter(Boolean).join(' ')

type ConvertUndefined<T> = OrUndefined<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}>
type OrUndefined<T> = { [K in keyof T]: T[K] | undefined }
type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>

/**
 * A King must choose his types
 * ...leave the scraps for the rest of us plebs
 * @abstract YES MASTER
 */
export const pick = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
): ConvertPick<{ [K in Keys]: Obj[K] }> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {} as any)
}

type NonNullableProps<T> = {
  [P in keyof T]: null extends T[P] ? never : P
}[keyof T]

/* export function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
  const result = {} as T
  for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key]
  return result
}
 */
export function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w]+/g, '') // Remove all non-word characters except for -
    .replace(/-+/g, '-') // Replace multiple - with single -
}

export async function fetcher<JSON>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

/* export const codeOptions: Options = {
  //keepBackground: false,
  filterMetaString: (string) => string.replace(/filename="[^"]*"/, ''),
  //theme: JSON.parse(fs.readFileSync('./lib/moonlight-ii.json', 'utf-8')),
  theme: 'ayu-dark',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{type: 'text', value: ' '}]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className?.push('highlighted')
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ['word']
  },
} */

const emptySymbol = Symbol('EmptyObject type')
export type EmptyObj = { [emptySymbol]?: never }
/**
 * Serialize all form data into an object
 * (c) Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */

export function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
  const result = {} as T
  for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key]
  return result
}

/* export function serializeFormData<T>(
  data: T[][]
): Pick<T, NonNullableProps<T>> {
  let obj = {} as T
  for (let [key, value] of data) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]]
      }
      obj[key].push(value)
    } else {
      obj[key] = value
    }
  }
  return obj
} */
/* 
export const fileChecksum = async (file: string) => {
	try {
		return checksum(await readFile(file));
	} catch (_) {
		return "";
	}
};

const checksum = (content: Buffer) => {
	return createHash("md5").update(content).digest("hex");
};
 */

export const parseError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'An unknown error occurred'
}

const { replace } = ''

// escape n
const ca = /[&<>'"]/g

const esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
} as any

//type Esc = keyof typeof esca

const pe = (m: string | number) => esca[m]

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
export const esc = (es: string): string => replace.call(es, ca, pe)
