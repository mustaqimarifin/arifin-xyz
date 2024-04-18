import dynamic from "next/dynamic";
import { Suspense } from "react";
import { PageLinks } from "./components/HomeNav";

const KLC = dynamic(() => import("./components/Clock"), { ssr: false });

export default function Page() {
	return (
		<section className="">
			<PageLinks />

			<div className="bg-wrap">
				{" "}
				{/* <svg width={500} height={700} className="max-w-md" role="img" aria-label="Linear logo">
						<use href="/ui.svg#kitteh" />
					</svg>{" "} */}
				{/* <Image
        alt="Mountains"
        src={ av3 }
        quality={ 100 }
        //width={ 1000 }
        //height={900}
        className="-pb-8"
        //height={800}
        //fill
        sizes="100vw"
         />  */}
			</div>
			<Suspense>
				<section id="clock" className="clock">
					<KLC />
				</section>
			</Suspense>
		</section>
	);
}
