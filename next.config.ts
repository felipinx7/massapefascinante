/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignora erros de tipagem durante o build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros de ESLint durante o build
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karnaubaapi.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
