import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Mustaqim Arifin",
  DESCRIPTION:
    "Welcome to Astro Sphere, a portfolio and blog for designers and developers.",
  AUTHOR: "Mustaqim Arifin",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "Work",
    HREF: "/work",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
  {
    TEXT: "Projects",
    HREF: "/projects",
  },
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "mustaqim.arifin@gmail.com",
    HREF: "mailto:mustaqim.arifin@gmail.com",
  },
  {
    NAME: "Muse",
    ICON: "muse",
    TEXT: "musegroup",
    HREF: "https://musegroup.asia",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "mustaqimarifin",
    HREF: "https://github.com/mustaqimarifin/arifin-xyz",
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "mustaqimarifin",
    HREF: "https://www.linkedin.com/in/mustaqimarifin/",
  },
  {
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "vmprmyth",
    HREF: "https://twitter.com/vmprmyth",
  },
]
