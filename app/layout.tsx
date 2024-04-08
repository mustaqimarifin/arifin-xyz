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
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/documents/1d49cc23-d73e-4ebb-a871-5e6d1776a3f3.jpg?token=MGJgnNi4vTLZATylW2SADdt114AYtjJb44lxW_vBF58&height=630&width=1200&expires=33248532284",
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
    images: "https://opengraph.b-cdn.net/production/documents/1d49cc23-d73e-4ebb-a871-5e6d1776a3f3.jpg?token=MGJgnNi4vTLZATylW2SADdt114AYtjJb44lxW_vBF58&height=630&width=1200&expires=33248532284",
  },
};

const PSans = localFont({
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
});

const GeistMono = localFont({
  variable: "--mono",
  src: [
    {
      path: "../public/fonts/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeistMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
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
