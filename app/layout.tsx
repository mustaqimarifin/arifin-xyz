import type { Metadata } from "next";
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

/* const PSans = localFont({
  variable: "--sans",
  src: [
    {
      path: "../public/fonts/PublicSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PublicSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/PublicSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
}); */

/* const GeistMono = localFont({
  variable: "--mono",
  src: "../public/fonts/GeistMonoVF.woff2",
  weight:"variable",
  style: "normal",
});
const PSans = localFont({
  variable: "--public-sans",
  src: "../public/fonts/GeistMonoVF.woff2",
display:"swap"
});
 */

const PSans = localFont({
	variable: "--public-sans",
	src: "../public/fonts/PublicSans.woff2",
	weight: "300 800",
	display: "swap",
});

const GMono = localFont({
	variable: "--geist-mono",
	src: "../public/fonts/GeistMonoVF.woff2",
	weight: "400 700",
	display: "swap",
});
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={cx(GMono.variable, PSans.variable)}>
			<head />
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
