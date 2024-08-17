const nextConfig = {
  output: 'standalone', // mine worked fine without this line
  // ... other config
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.promptior.ai',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
};
module.exports = nextConfig;
