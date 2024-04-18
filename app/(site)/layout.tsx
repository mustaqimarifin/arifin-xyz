import Nav2 from "../components/Container";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Nav2 />
			{children}
		</>
	);
}
