import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{js,jsx,mjs,md,mdx,ts,tsx}', './public/**/*.svg'],
  },
  shortcuts: {
    'screen-35': 'h-screen',
  },
  presets: [
    presetUno({
      dark: 'media',
    }),
  ],
})
