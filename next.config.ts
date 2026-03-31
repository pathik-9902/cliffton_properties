import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Allow access from local network (fixes HMR WebSocket error)
  allowedDevOrigins: ['192.168.29.223'],

  // ✅ Image optimization (important for real estate UI)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // ✅ Turbopack explicitly enabled (avoids config conflict warning)
  turbopack: {},

  // ✅ Safe performance optimization
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // ✅ Optional debugging (can remove later)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;