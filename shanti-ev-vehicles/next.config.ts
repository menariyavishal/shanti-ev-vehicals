import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the Next.js dev-tools badge (the Next logo pinned to the
  // bottom-left corner while `next dev` is running).
  devIndicators: false,
  images: {
    // Allow cache-busting query strings on local images (e.g. logo.png?v=2).
    // `search` omitted → any query string is permitted for these paths.
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
