import slow from "next/dynamic";
import { Suspense } from "react";
import { PageLinks } from "./components/HomeNav";

const KLC = slow(() => import("./components/Clock"), { ssr: false });
const Fade = slow(() => import("./components/fade"), { ssr: false });

export default function Page() {
	return (
		<section className="">
			<PageLinks />
			<Suspense>
				<Fade>
					<div className="bg-wrap" />
				</Fade>
				<section id="clock" className="clock">
					<KLC />
				</section>
			</Suspense>
		</section>
	);
}
