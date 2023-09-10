/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      API_URL: 'http://localhost:4000/api',
      API_URL_WITHOUT_API: 'http://localhost:4000/',
      LIMIT_PRODUCT_ON_LIST: 8,
    },
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
  