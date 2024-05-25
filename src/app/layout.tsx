//import localFont from 'next/font/local'
import { Public_Sans } from 'next/font/google'
//import { Footer } from '@/components/server'
import type { Metadata } from 'next'
import Providers from './providers'
import { cx } from '@/utils'
import '$$/global.css'

const psans = Public_Sans({
  variable: '--font-sans',
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://arifin.xyz'),
  title: {
    default: 'Mustaqim Arifin',
    template: '%s | Mustaqim Arifin',
  },
  authors: [{ name: 'Mustaqim Arifin', url: 'https://arifin.xyz' }],
  description: 'Music Producer | Regional Marketing',
  openGraph: {
    title: 'Mustaqim Arifin',
    description: 'Music Producer | Regional Marketing',
    url: 'https://arifin.xyz',
    siteName: 'Mustaqim Arifin',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.arifin.xyz/default.jpg',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Mustaqim Arifin',
    card: 'summary_large_image',
    images: 'https://www.arifin.xyz/default.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx(psans.variable)}>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
