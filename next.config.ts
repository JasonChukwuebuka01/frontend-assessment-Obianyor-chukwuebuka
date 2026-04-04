import type { NextConfig } from "next";

const nextConfig: NextConfig = {
put: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },

  /* NOTE: If 'eslint' or 'typescript' show red lines in Next.js 16, 
     it's because they moved or your @types/next package is out of sync.
     We will keep them here, but if they stay red, we can safely 
     remove them once your code is clean.
  */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;