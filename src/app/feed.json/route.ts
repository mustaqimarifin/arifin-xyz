import noteSchema from 'schema/noteSchema.json'

export async function GET() {
  //const notes = JSON.stringify(allNotes)
  return Response.json(noteSchema, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
