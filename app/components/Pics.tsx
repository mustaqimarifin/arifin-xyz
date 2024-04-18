"use client";
import Image from "next/image";
import { cx } from "../../utils";
import Fade from "./fade";

type Props = {
	src: string;
	alt: string;
	caption?: string;
	width?: string | number;
	height?: string | number;
	blurDataURL?: string;
	className?: string;
};

const Pix = (props: Props) => {
	const { src, alt, className, caption, width, height } = props;
	let path = require(`../../public/images${src}`);

	return (
		<div className="filter drop-shadow-sm">
			<Fade>
				<figure>
					<Image
						src={path}
						alt={alt}
						width={Number(width)}
						height={Number(height)}
						className={cx(className, "rounded-lg dark:bg-zinc-900 bg-zinc-50")}
					/>
					<figcaption className="text-right">
						{caption && <span className="text-sm  text-gray-600 dark:text-gray-400">{caption}</span>}
					</figcaption>
				</figure>
			</Fade>
		</div>
	);
};

export default Pix;
