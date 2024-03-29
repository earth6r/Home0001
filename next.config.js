const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
    loader: 'custom',
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    dirs: ['lib', 'pages', 'styles'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  transpilePackages: ['sanity'],
  experimental: {
    largePageDataBytes: 136 * 1000,
  },
  assetPrefix: process.env.NEXT_PUBLIC_BASE_URL,
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'earth.net',
            },
          ],
          destination: '/brand/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig
