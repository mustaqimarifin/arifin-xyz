import allNotes from 'src/meta/allNotes.json'
export async function GET() {
  //const notes = JSON.stringify(allNotes)
  return Response.json(allNotes, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
