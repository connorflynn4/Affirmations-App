import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Proxy requests starting with /api
        destination: 'http://localhost:5000/api/:path*', // Forward to the backend server
      },
    ];
  },
};

export default nextConfig;

