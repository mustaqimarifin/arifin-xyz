import { type Note } from 'content-collections'
import meta from './metadata.json'

//export const meta = allNotes.map((p) => omit(p, ['body']))
export type Meta = Omit<Note, 'content'>

export { meta }
