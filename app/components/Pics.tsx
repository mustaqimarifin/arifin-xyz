"use client";
import Image from "next/image";
import { cx } from "../../utils";
//import { Fade } from "./fade";

type Props = {
	src: string;
	alt: string;
	caption?: string;
	width?: string | number;
	height?: string | number;
	blurDataURL?: string;
	className?: string;
};

//console.log(rimages)

/* const imgSrc = await getProps()
console.log(imgSrc[]) */

const Pix = (props: Props) => {
	const { src, alt, className, caption, width, height } = props;
	//let ext = src.startsWith("http");
	let path = require(`../../public/images${src}`);
	//let path2 = require(src);
	//console.log(path2);

	return (
		<div className="filter drop-shadow-sm">
			{/* 			<Fade>
			 */} <figure>
				<Image
					src={path}
					alt={alt}
					//blurDataURL={blurDataURL}
					//placeholder="blur"
					width={Number(width)}
					height={Number(height)}
					//width={680}
					//height={503}
					//sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					//sizes="(max-width: 1920px) 213px, 33vw"
					//width={width}
					//height={height}
					className={cx(className, "rounded-lg dark:bg-zinc-900 bg-zinc-50")}
				/>
				<figcaption className="text-right">
					{caption && <span className="text-sm  text-gray-600 dark:text-gray-400">{caption}</span>}
				</figcaption>
			</figure>
			{/* </Fade> */}
		</div>
	);
};

export default Pix;
