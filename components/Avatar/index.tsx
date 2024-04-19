"use client";
import Image from "next/image";
import fb from "public/default.jpg";
import { useEffect, useState } from "react";

export function Avatar({ user, src, ...props }) {
	//const fallbackUrl = "/default.jpg";
	const [srcState, setSrcState] = useState(src || fb);

	// forces avatars to update if the component is in the same place between
	// page loads, e.g. changing between AMA questions, the header avatar should
	// update
	useEffect(() => {
		if (src) setSrcState(src);
	}, [src]);

	return (
		<Image
			alt={`${user?.name || user?.name}'s profile photo`}
			src={srcState}
			width={20}
			height={20}
			{...props}
			onError={() => {
				setSrcState(fb);
			}}
		/>
	);
}
