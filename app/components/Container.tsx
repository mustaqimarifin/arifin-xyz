"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "../../utils";

const activeStyle = `font-black text-gray-800 dark:text-gray-200`;
const inactiveStyle = `font-semibold text-gray-600 dark:text-gray-400`;

function NavItem({ href, text }) {
	const path = usePathname();
	const isActive = path === href;
	return (
		<NextLink
			href={href}
			className={cx(
				isActive ? activeStyle : inactiveStyle,
				"inline-block tracking-tight  px-3  rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 transition-all",
			)}
		>
			<span className="text-sm">{text}</span>
		</NextLink>
	);
}

export default function Nav2() {
	//const { children } = props;

	return (
		<>
			<nav className=" flex items-center justify-between w-full max-w-3xl pt-2 pb-8 mx-auto text-gray-900 border-gray-200 dark:border-gray-700  bg-opacity-60 dark:text-gray-50">
				<div className="ml-[-0.60rem]">
					<NextLink
						href="/"
						className={cx(
							"font-bold tracking-wide text-gray-800 dark:text-gray-200 inline-block p-1 px-3 py-2 transition-all",
						)}
					>
						[𝖆𝖗𝖎𝖋𝖎𝖓]
					</NextLink>
					<NavItem href="/notes" text="NOTES" />
					<NavItem href="/work" text="WORK" />
					{/*           <NavItem href="/audio" text="AUDIO" />
          <NavItem href="/events" text="EVENTS" /> */}
					<NavItem href="/guestbook" text="GUESTBOOK" />
				</div>
			</nav>
			{/* 	<div>{children}</div> */}
		</>
	);
}
