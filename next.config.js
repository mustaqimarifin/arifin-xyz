//import path from "path";
//import {fileURLToPath} from 'url'
const {createContentlayerPlugin} = require('next-contentlayer2')
//import { withContentlayer } from "next-contentlayer2";

//const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
//const __dirname = path.dirname(__filename); // get the name of the directory
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {protocol: 'https', hostname: '*.twimg.com', pathname: '/**'},
      {protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**'},
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/mstqmarfn/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true,
      },
    ]
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

module.exports = withContentlayer(nextConfig)

//export default withContentlayer(nextConfig);
