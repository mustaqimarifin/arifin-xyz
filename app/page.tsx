import slow from "next/dynamic";
import { Suspense } from "react";
import { PageLinks } from "./components/HomeNav";

const KLC = slow(() => import("./components/Clock"), { ssr: false });
const Fade = slow(() => import("./components/fade"), { ssr: false });

export default function Page() {
	return (
		<section className="h-screen">
			<PageLinks />

			<Fade>
				<div className="bg-wrap" />
			</Fade>
			<Suspense>
				<section id="clock" className="clock">
					<Fade>
						{" "}
						<KLC />
					</Fade>
				</section>
			</Suspense>
		</section>
	);
}
