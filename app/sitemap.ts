import { postParam } from "./utils/sortedContent";

export default async function sitemap() {
  let notes = postParam.map((post) => ({
    url: `https://arifin.xyz/notes/${post.slug}`,
    lastModified: post.date,
  }));

  let routes = ["", "/notes", "/guestbook", "/uses", "/work"].map((route) => ({
    url: `https://arifin.xyz${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...notes];
}
