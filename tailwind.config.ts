import t from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default {
	content: ["./app/**/*.{ts,tsx}", "./content/**/*.mdx", "./public/**/*.svg"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--public-sans)", ...defaultTheme.fontFamily.sans],
				mono: ["var(--geist-mono)", ...defaultTheme.fontFamily.mono],
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
	plugins: [t],
} satisfies Config;
