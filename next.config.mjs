import { withContentCollections } from '@content-collections/next'
//const { withContentCollections } = require("@content-collections/next");
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.twimg.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
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
}

//module.exports = withContentCollections(nextConfig);

export default withContentCollections(nextConfig)
