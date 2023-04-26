/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://localhost:4000/api',
    SIZE_WIDTH_PRODUCT_LIST: 110,
    SIZE_HEIGHT_PRODUCT_LIST: 160,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
}

module.exports = nextConfig
