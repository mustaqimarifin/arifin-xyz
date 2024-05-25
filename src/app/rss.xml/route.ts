import allNotes from 'src/meta/allNotes.json'
import { env } from 'site.config'
import { esc } from '@/utils'

export async function GET() {
  const itemsXml = allNotes
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${env.siteUrl}/notes/${post.slug}</link>
          <description>${post.summary || ''}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${esc(env.title)}</title>
        <link>${env.siteUrl}</link>
         <description>${esc(env.description)}</description>
      <language>${env.language}</language>
      <webMaster>${env.email} (${env.author})</webMaster>
      <lastBuildDate>${new Date(allNotes[0].date).toUTCString()}</lastBuildDate>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
