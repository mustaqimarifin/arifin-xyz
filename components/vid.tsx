const HeroImage = () => {
	return (
		<div className="flex size-16 rounded-full border-5 overflow-hidden aspect-square">
			<video
				autoPlay
				loop
				muted
				playsInline
				//width={200}
				//height={200}
				className="flex-1 object-cover box-border border-indigo-700 "
			>
				<source src="/Xyz2.webm" type="video/webm" />
			</video>
		</div>
	);
};

export const VideoPlayer = (props) => {
	return (
		<div className="flex">
			<video
				//autoPlay
				loop
				muted
				playsInline
				//width={200}
				//height={200}
				className="flex-1"
			>
				<source src={props.src} type="video/mp4" />
			</video>
		</div>
	);
};
