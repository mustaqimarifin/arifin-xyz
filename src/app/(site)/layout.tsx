import { Navbar } from '@/components/client'
import { Footer } from '@/components/server'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Navbar />
      <Footer />
    </>
  )
}
