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
    ],
  },
}

module.exports = nextConfig
