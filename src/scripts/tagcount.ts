import { writeFileSync } from "node:fs";
import { allNotes } from "../../.contentlayer/generated/index.mjs";
import { slugify } from "./rss";
const isProduction = process.env.NODE_ENV === "production";

async function createTagCount() {
  let tagCount = {};
  for (const file of allNotes) {
    if (file.tags && (!isProduction || file.draft !== true)) {
      for (const tag of file.tags) {
        const formattedTag = slugify(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      }
    }
  }
  writeFileSync("./src/meta/tag-data.json", JSON.stringify(tagCount));
}

createTagCount();

//let tc = './.meta/tag-data.json'

//let x = await readFile(tc)
//console.log(JSONB.parse(JSONB.stringify(x)))
