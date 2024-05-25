import { GetTypeByName } from '@content-collections/core'
import configuration from '../../content-collections.ts'

export type Note = GetTypeByName<typeof configuration, 'notes'>
export declare const allNotes: Array<Note>

export type Work = GetTypeByName<typeof configuration, 'work'>
export declare const allWorks: Array<Work>

export {}
