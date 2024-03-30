import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"

import db from "@astrojs/db"

// https://astro.build/config
export default defineConfig({
  site: "https://arifin.xyz",
    markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: "one-dark-pro"	

,
    }},
  integrations: [mdx(), sitemap(), solidJs(), tailwind({
    applyBaseStyles: false
  }), db()]
})