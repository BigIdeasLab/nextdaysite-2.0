import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.builder.io',
        pathname: '/api/v1/image/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
