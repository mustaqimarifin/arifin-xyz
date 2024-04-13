import { EmbeddedTweet, TweetNotFound, type TweetProps } from "react-tweet";
import { getTweet } from "react-tweet/api";
//import "./tweet.css";

import Image from "next/image";
import type { TwitterComponents } from "react-tweet";

export const components: TwitterComponents = {
	AvatarImg: (props) => <Image {...props} />,
	MediaImg: (props) => <Image {...props} fill />,
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

export const ReactTweet = (props: TweetProps) => <TweetContent {...props} />;

export default function TweetComponent({ id }: { id: string }) {
	return (
		<div className="tweet my-6">
			<div className={`flex justify-center`}>
				<ReactTweet id={id} />
			</div>
		</div>
	);
}
