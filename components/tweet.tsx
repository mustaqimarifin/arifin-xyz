import { EmbeddedTweet, TweetNotFound, type TweetProps } from "react-tweet";
import { getTweet } from "react-tweet/api";

import Image from "next/image";
import type { TwitterComponents } from "react-tweet";
import { VideoPlayer } from "./vid";

type VideoProps = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};
type TComponents = {
	VideoPlayer?: ((props: VideoProps) => JSX.Element) | undefined;
} & TwitterComponents;

export const components: TComponents = {
	AvatarImg: (props) => <Image {...props} />,
	MediaImg: (props) => <Image {...props} fill />,
	VideoPlayer: (props) => <VideoPlayer {...props} />,
};

const TweetContent = async ({ id, onError }: TweetProps) => {
	let error;
	const tweet = id
		? await getTweet(id).catch((err) => {
				if (onError) {
					error = onError(err);
				} else {
					console.error(err);
					error = err;
				}
			})
		: undefined;

	if (!tweet) {
		const NotFound = components?.TweetNotFound || TweetNotFound;
		return <NotFound error={error} />;
	}

	return <EmbeddedTweet tweet={tweet} components={components} />;
};

const ReactTweet = (props: TweetProps) => <TweetContent {...props} />;

export default function TweetComponent({ id }: { id: string }) {
	return (
		<div className="tweet my-6">
			<div className={`flex justify-center`}>
				<ReactTweet id={id} />
			</div>
		</div>
	);
}
