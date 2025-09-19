/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.massapefascinante.com.br',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4444',
        pathname: '/uploads/**',
      },
    ],
  },
  experimental: {
    turbo: false,
  },
}

module.exports = nextConfig