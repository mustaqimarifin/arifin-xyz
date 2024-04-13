const { withContentlayer } = require("next-contentlayer");
//import { withContentlayer } from "next-contentlayer";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{ protocol: "https", hostname: "*.twimg.com", pathname: "/**" },
			{ protocol: "https", hostname: "cdni.pornpics.com", pathname: "/**" },
			{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
			{ protocol: "https", hostname: "i.scdn.co", pathname: "/**" },
			{
				protocol: "https",
				hostname: "ik.imagekit.io",
				pathname: "/mstqmarfn/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/**",
			},
		],
		dangerouslyAllowSVG: true,
	},
};

module.exports = withContentlayer(nextConfig);

//export default withContentlayer(nextConfig);https://cdni.pornpics.com/1280/7/252/42499672/42499672_078_4595.jpg
