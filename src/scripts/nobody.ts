import { writeFileSync } from "node:fs";
import path from "path";
import { allNotes } from "contentlayer/generated";

async function withoutBody() {
  const file = path.join("src", "meta", "allNotes.json");
  const json = () => {
    return allNotes.map((post) => {
      const { _id, _raw, body, ...content } = post;
      return content;
    });
  };
  console.log(`create posts json without body for ${allNotes.length} paths`);
  //const json = createJson();
  /*   mkdirSync(path.dirname(file), {
    recursive: true,
  }) */
  writeFileSync(file, JSON.stringify(json()));
}

withoutBody();
