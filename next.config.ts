/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Site graphics such as /brand/arrow.svg go through next/image. Safe here
    // because every SVG is our own file in /public: nothing user-supplied is
    // ever served, and the CSP below sandboxes them anyway.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      // The page moved from the singular route; keep old links working.
      { source: '/achievement', destination: '/achievements', permanent: true },
    ];
  },
};

export default nextConfig;
