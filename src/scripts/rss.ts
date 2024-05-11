import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { allNotes } from "contentlayer/generated";
import tagData from "src/meta/tag-data.json";
import { env } from "../../site.config";
const { replace } = "";

// escape n
const ca = /[&<>'"]/g;

const esca = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
};
const pe = (m) => esca[m];

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const esgape = (es) => replace.call(es, ca, pe);

const generateRssItem = (env, post) => `
  <item>
    <guid>${env.siteUrl}/notes/${post.slug}</guid>
    <title>${esgape(post.title)}</title>
    <link>${env.siteUrl}/notes/${post.slug}</link>
    ${post.summary && `<description>${esgape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${env.email} (${env.author})</author>
    ${post.tags?.map((t) => `<category>${t}</category>`).join("")}
  </item>
`;

const generateRss = (config, posts, page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${esgape(env.title)}</title>
      <link>${env.siteUrl}/notes</link>
      <description>${esgape(env.description)}</description>
      <language>${env.language}</language>
      <managingEditor>${env.email} (${env.author})</managingEditor>
      <webMaster>${env.email} (${env.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${env.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join("")}
    </channel>
  </rss>
`;
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

export const compareDesc = (dateA, dateB) => {
  if (dateA.getTime() === dateB.getTime()) return 0;
  return dateA > dateB ? -1 : 1;
};
async function generateRSS(env, allNotes, page = "feed.xml") {
  const posts = allNotes
    .filter((t) => t.draft === false)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  // RSS for blog post
  if (posts.length > 0) {
    const rss = generateRss(env, posts);
    writeFileSync(`./public/${page}`, rss);
  }

  if (posts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allNotes.filter((post) =>
        post.tags.map((t) => slugify(t)).includes(tag),
      );
      const rss = generateRss(env, filteredPosts, `tags/${tag}/${page}`);
      const rssPath = path.join("public", "tags", tag);
      mkdirSync(rssPath, { recursive: true });
      writeFileSync(path.join(rssPath, page), rss);
    }
  }
}

const rss = () => {
  generateRSS(env, allNotes);
  console.log("GOT MILK...");
};
export default rss;
