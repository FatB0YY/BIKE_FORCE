/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost:4000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
      {
        protocol: 'http',
        hostname: 'localhost:80',
      },
      {
        protocol: 'http',
        hostname: 'localhost:8080',
      },
      {
        protocol: 'http',
        hostname: 'localhost:4000/api',
      },
    ],
  },
}

module.exports = nextConfig
