const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.twimg.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.brittanica.com", pathname: "/**" },
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

// @ts-ignore
module.exports = withContentlayer(nextConfig);
