import slow from "next/dynamic";
import Nav2 from "../components/Container";

const Animayte = slow(() => import("@/utils/animate"), { ssr: false });

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Nav2 />
			{children}
			<Animayte />
		</>
	);
}
