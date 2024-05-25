import { allNotes } from 'content-collections'

export default async function sitemap() {
  const notes = allNotes.map((post) => ({
    url: `https://arifin.xyz/notes/${post.slug}`,
    lastModified: post.date,
  }))

  const routes = [
    '',
    '/admin',
    '/auth',
    '/login',
    '/signin',
    '/welcome',
    '/notes',
    '/bookmarks',
    '/guestbook',
    '/work',
    '/stack',
    '/rss.xml',
    '/feed.json',
  ].map((route) => ({
    url: `https://arifin.xyz${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...notes]
}
