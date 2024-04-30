type Stack = {
	cat: string;
	items: Item[];
};

type Item = {
	name: string;
	url: string;
	description: string;
	featured?: boolean;
	image?: string;
};

export const stack: Stack[] = [
	{
		cat: "Code",
		items: [
			{
				name: "LocalCan",
				url: "https://www.localcan.com?aff=VMdMv",
				description: ".local development, simplified.",
				featured: true,
			},
			{
				name: "Postman",
				url: "https://www.postman.com/",
				description: "Build and test APIs.",
			},
			{
				name: "VS Code",
				url: "https://code.visualstudio.com/",
				description: "The code editor for the modern web.",
			},
			{
				name: "GitHub Copilot",
				url: "https://github.com/features/copilot/",
				description: "AI-powered code completion.",
				image: "https://github.githubassets.com/assets/copilot-2023-83117d7c0b8a.png",
			},
			{
				name: "Warp",
				url: "https://www.warp.dev/",
				description: "Modern, Rust-based terminal with AI.",
			},
		],
	},
	{
		cat: "Productivity",
		items: [
			{
				name: "Eververse",
				url: "https://www.eververse.ai/",
				description: "Product Management, reimagined.",
				featured: true,
			},
			{
				name: "Screen Studio",
				url: "https://screenstudio.lemonsqueezy.com/?aff=VMdMv",
				description: "Beautiful screen recordings in minutes.",
				featured: true,
			},
			{
				name: "Proton Mail",
				url: "https://proton.me/mail",
				description: "Secure, privacy-first email.",
			},
			{
				name: "CleanShot X",
				url: "https://cleanshot.com/",
				description: "Screen capture, enhanced.",
			},
			{
				name: "DaisyDisk",
				url: "https://daisydiskapp.com/",
				description: "Visually analyze MacOS disk usage.",
			},
			{
				name: "Linear",
				url: "https://linear.app/",
				description: "Simple, focused issue tracking.",
			},
			{
				name: "Notion",
				url: "https://www.notion.so/",
				description: "Documents with endless possibilities.",
			},
			{
				name: "Pitch",
				url: "https://pitch.com/",
				description: "Modern, collaborative presentation tool.",
			},
			{
				name: "Slack",
				url: "https://slack.com/",
				description: "The platform for teamwork.",
			},
			{
				name: "Spark",
				url: "https://sparkmailapp.com/",
				description: "Unified, native and powerful email client.",
			},
			{
				name: "Zoom",
				url: "https://zoom.us/",
				description: "Video conferencing, simplified.",
			},
			{
				name: "Hotlist",
				url: "https://pqina.nl/hotlist",
				description: "A simple todo list in your MacOS menubar.",
			},
			{
				name: "Arc",
				url: "https://arc.net/",
				description: "Headless web browsing.",
			},
			{
				name: "mymind",
				url: "https://mymind.com/",
				description: "An extension of your mind.",
			},
		],
	},
	{
		cat: "Music",
		items: [
			{
				name: "Untitled UI",
				url: "https://store.untitledui.com?aff=VMdMv",
				description: "The ultimate UI Kit for Figma.",
				image:
					"https://assets-global.website-files.com/636496d3f0ebfdaba9784655/646b8e798fb7b11360121f75_untitled-ui-open-graph-img.webp",
				featured: true,
			},
			{
				name: "Dovetail",
				url: "https://dovetailapp.com/",
				description: "Where customer knowledge lives.",
			},
			{
				name: "Figma",
				url: "https://www.figmaelements.com/",
				description: "Collaborative interface design tool.",
			},
			{
				name: "ImageOptim",
				url: "https://imageoptim.com/mac",
				description: "Losslessly optimize images.",
			},
			{
				name: "Unsplash",
				url: "https://unsplash.com/",
				description: "Free, high-quality photos.",
			},
		],
	},
	{
		cat: "Misc",
		items: [
			{
				name: "Spotify",
				url: "https://open.spotify.com/",
				description: "Enjoy and curate the world's music.",
			},
			{
				name: "Klack",
				url: "https://tryklack.com/",
				description: "Mechanical keystroke sounds.",
			},
			{
				name: "Hand Mirror",
				url: "https://handmirror.app/",
				description: "A camera in your menu bar.",
			},
		],
	},
];
