"use client";
import NextLink, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "../utils";

const defStyle = cx(
	`inline-block tracking-tight px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 transition-all`,
);
const activeStyle = cx(`font-black text-gray-800 dark:text-gray-200`);
const inactiveStyle = cx(`font-bold text-gray-600 dark:text-gray-400`);

function NavItem({ href, text }: { href: LinkProps["href"]; text: string }) {
	const path = usePathname();
	const isActive = path === href;
	return (
		<NextLink
			href={href}
			prefetch={false}
			className={cx([
				"inline-block font-bold tracking-tight px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 transition-all",
				isActive ? "font-black text-gray-800 dark:text-gray-200" : " text-gray-800/75 dark:text-gray-400",
			])}
		>
			<span className="text-sm">{text}</span>
		</NextLink>
	);
}

export default function Nav2() {
	//const { children } = props;

	return (
		<>
			<nav className="nav-2">
				<div>
					<NextLink href="/" className={cx("arifin")}>
						[𝖆𝖗𝖎𝖋𝖎𝖓]
					</NextLink>
					<NavItem href="/notes" text="NOTES" />
					<NavItem href="/work" text="WORK" />
					{/*           <NavItem href="/audio" text="AUDIO" />
          <NavItem href="/events" text="EVENTS" /> */}
					<NavItem href="/guestbook" text="GUESTBOOK" />
					<NavItem href="/feed.xml" text="RSS" />
				</div>
			</nav>
			{/* 	<div>{children}</div> */}
		</>
	);
}
