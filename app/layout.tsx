import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import localFont from "next/font/local";
import { cx } from "../utils";
import "./global.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://arifin.xyz"),
	title: {
		default: "Mustaqim Arifin",
		template: "%s | Mustaqim Arifin",
	},
	description: "Music Producer | Regional Marketing",
	openGraph: {
		title: "Mustaqim Arifin",
		description: "Music Producer | Regional Marketing",
		url: "https://arifin.xyz",
		siteName: "Mustaqim Arifin",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "https://www.arifin.xyz/default.jpg",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Mustaqim Arifin",
		card: "summary_large_image",
		images: "https://www.arifin.xyz/default.jpg",
	},
};

const PSans = Public_Sans({
	variable: "--public-sans",
	weight: "variable",
	style: ["italic", "normal"],
	subsets: ["latin"],
	display: "swap",
});

const GMono = localFont({
	variable: "--geist-mono",
	src: "../public/fonts/GeistMonoVF.woff2",
	weight: "400 900",
	preload: false,
	display: "swap",
});
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={cx(PSans.variable, GMono.variable)}>
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
