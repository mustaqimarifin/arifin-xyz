// postcss.config.mjs

export default {
  plugins: {
    '@unocss/postcss': {
      // Optional
      content: ['./src/**/*.{js,jsx,mjs,md,mdx,ts,tsx}', './public/**/*.svg'],
    },
  },
}
