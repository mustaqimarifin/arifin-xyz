import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./content/**/*.mdx", "./public/**/*.svg"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--sans)"],
        mono: ["var(--mono)"],
        major: ["var(--major)"],
      },
      fontSize: {
        xs: "0.7142857143rem", // 10px
        sm: "0.8571428571rem", // 12px
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
