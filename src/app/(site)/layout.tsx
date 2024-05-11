import { Navbar } from "@/components/client";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
