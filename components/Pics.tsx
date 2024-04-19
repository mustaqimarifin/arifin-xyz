"use client";
import Image from "next/image";
import { cx } from "../utils";
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
	let path = require(`../public/images${src}`);

	return (
		<div className="pix">
			<Fade>
				<figure>
					<Image src={path} alt={alt} width={Number(width)} height={Number(height)} className={cx(className)} />
					<figcaption>{caption && <span>{caption}</span>}</figcaption>
				</figure>
			</Fade>
		</div>
	);
};

export default Pix;
