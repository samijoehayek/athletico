/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // The page moved from the singular route; keep old links working.
      { source: '/achievement', destination: '/achievements', permanent: true },
    ];
  },
};

export default nextConfig;
