import type { ReactNode } from "react";

export function PageTitle({ children }: { children: ReactNode }) {
	return (
		<h1 className=" mb-6 text-3xl font-extrabold tracking-tight text-black md:text-4xl dark:text-white">{children}</h1>
	);
}
