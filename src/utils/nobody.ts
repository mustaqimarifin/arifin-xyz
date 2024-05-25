import { writeFileSync } from 'node:fs'
import path from 'node:path'

export const omit = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj)
  for (let key of keys) {
    delete result[key]
  }
  return result
}

export async function withoutBody(allNotes) {
  const file = path.join('./schema', 'noteSchema.json')
  const json = () => {
    return allNotes.map(({ content, ...rest }) => rest)
  }
  console.log(`create posts json without body for ${allNotes.length} paths`)
  //const json = createJson();
  /*   mkdirSync(path.dirname(file), {
    recursive: true, 
  }) */
  writeFileSync(file, JSON.stringify(json()))
}
