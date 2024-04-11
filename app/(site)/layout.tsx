import { ThemeProvider } from "next-themes";
import { Kont } from "../components/HomeNav";
import { Navbar, Navbar2 } from "../components/nav";
import Container from "../components/Container";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
