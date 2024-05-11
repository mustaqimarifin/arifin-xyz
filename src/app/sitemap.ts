import { noteParam } from "@/utils/sortedContent";

export default async function sitemap() {
  const notes = noteParam.map((post) => ({
    url: `https://arifin.xyz/notes/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = [
    "",
    "/notes",
    "/bookmarks",
    "/guestbook",
    "/uses",
    "/work",
    "/stack",
    "/feed.xml",
  ].map((route) => ({
    url: `https://arifin.xyz${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...notes];
}
