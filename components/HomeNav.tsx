"use client";

import Link from "next/link";
import { navItems } from "./nav";

export const PageLinks = () => {
	return (
		<ul>
			{Object.entries(navItems).map(([path, { name }]) => {
				return (
					<li className="page-links-1" key={path}>
						<Link href={path} prefetch={false} className="page-links-2">
							{name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
