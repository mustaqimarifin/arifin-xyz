import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { allNotes } from "../.contentlayer/generated/index.mjs";
import tagData from "../app/tag-data.json" assert { type: "json" };
import { env } from "../site.config.mjs";

const generateRssItem = (env, post) => `
  <item>
    <guid>${env.siteUrl}/notes/${post.slug}</guid>
    <title>${encodeURIComponent(post.title)}</title>
    <link>${env.siteUrl}/notes/${post.slug}</link>
    ${post.summary && `<description>${encodeURIComponent(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${env.email} (${env.author})</author>
    ${post.tags?.map((t) => `<category>${t}</category>`).join("")}
  </item>
`;

const generateRss = (config, posts, page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${encodeURIComponent(env.title)}</title>
      <link>${env.siteUrl}/notes</link>
      <description>${encodeURIComponent(env.description)}</description>
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
			const filteredPosts = allNotes.filter((post) => post.tags.map((t) => slugify(t)).includes(tag));
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
