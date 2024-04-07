import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import localFont from "next/font/local";
import { cx } from "./utils";

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
  },
};

const PSans = localFont({
  src: "../public/fonts/PublicSans.woff2",
  variable: "--sans",
});

const GeistMono = localFont({
  src: "../public/fonts/GeistMono.woff2",
  variable: "--mono",
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
