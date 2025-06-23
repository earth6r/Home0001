const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
    loader: 'custom',
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 768, 1280],
    imageSizes: [16, 32, 64],
  },
  eslint: {
    dirs: ['lib', 'pages', 'styles'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  transpilePackages: ['sanity'],
  experimental: {
    largePageDataBytes: 150 * 1000,
  },
  // assetPrefix: process.env.NEXT_PUBLIC_ASSET_URL,
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'buy.home0001.com',
            },
          ],
          destination: '/buy/:path*',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'dashboard.home0001.com',
            },
          ],
          destination: '/dashboard/:path*',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '0001.studio',
            },
          ],
          destination: '/rd/:path*',
        },
      ],
    }
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
