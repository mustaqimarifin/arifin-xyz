import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import localFont from "next/font/local";
import { cx } from "./utils";
import { Public_Sans } from "next/font/google";

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
        url: "https://www.arifin.xyz/og.jpg",
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
    images: "https://www.arifin.xyz/og.jpg",
  },
};

const PSans = Public_Sans({
  variable: "--sans",
  subsets: ["latin"],
});

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

const GeistMono = localFont({
  variable: "--mono",
  src: "../public/fonts/GeistMonoVF.woff2",
  style: "normal",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(PSans.variable, GeistMono.variable)}>
      <head />
      <body>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
