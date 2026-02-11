/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        // This handles the login API call
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3000/nodeBackednServer/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;