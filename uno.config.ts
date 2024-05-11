import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{js,jsx,mjs,md,mdx,ts,tsx}", "./public/**/*.svg"],
  },
  presets: [
    presetUno({
      dark: "media",
    }),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
});
