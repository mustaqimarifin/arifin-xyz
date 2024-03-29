const defaultTheme = require("tailwindcss/defaultTheme");
import t from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["GTAmerica", ...defaultTheme.fontFamily.sans],
      mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      xs: "0.7142857143rem", // 10px
      sm: "0.8571428571rem", // 12px
    },
    extend: {
      backgroundColor: {
        primary: "var(--page-primary)",
      },
      textColor: {
        primary: "var(--text-color-primary)",
        secondary: "var(--text-color-secondary)",
        subtle: "var(--text-color-subtle)",
      },
      borderColor: {
        primary: "var(--border-color-primary)",
      },
      textDecorationColor: {
        subtle: "var(--decoration-color-subtle)",
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  plugins: [t],
};
