import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-production-domain.vercel.app'],
    },
  },
  runtime: 'edge',
  regions: ['iad1'], // Add additional regions as needed
};

export default nextConfig;
