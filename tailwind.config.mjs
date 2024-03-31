import defaultTheme from "tailwindcss/defaultTheme"
import t from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", ...defaultTheme.fontFamily.sans],
        serif: ["Roboto Serif", ...defaultTheme.fontFamily.serif],
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        xs: "0.7142857143rem", // 10px
        sm: "0.8571428571rem", // 12px
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "full",
          },
        },
      },
    },
  },
  plugins: [t],
}
