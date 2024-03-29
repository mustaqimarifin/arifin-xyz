import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
// Remark plugins
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list";
import remarkAdmonitions from "remark-github-beta-blockquote-admonitions";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://arifin.xyz",
  integrations: [sitemap(), tailwind()],
  markdown: {
  gfm:true,
    remarkPlugins: [remarkDefinitionList, remarkAdmonitions],
    remarkRehype: {
      handlers: {
        ...defListHastHandlers,
      },
    },
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
