import path from "path";
import type { NextConfig } from "next";

const supabaseHostname = (() => {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return undefined;
  try {
    return new URL(raw.replace(/\/+$/, "")).hostname;
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3", "@google/genai", "sharp"],
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
  async redirects() {
    return [
      {
        source: "/thue-mua-vinfast",
        destination: "/thue-mua-xe-vinfast",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
