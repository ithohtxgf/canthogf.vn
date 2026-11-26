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
        destination: "/san-pham",
        permanent: true,
      },
      {
        source: "/thue-mua-xe-vinfast",
        destination: "/san-pham",
        permanent: true,
      },
      // 26/11/2026: TP.HCM do co-ev.vn (HTX EVG) phụ trách, Vũng Tàu do vungtauev.vn, để ba website không tranh từ khóa.
      {
        source: "/dang-ky-xanhsm-partner/tphcm",
        destination: "https://co-ev.vn/dang-ky-xanh-sm-tphcm",
        permanent: true,
      },
      {
        source: "/dang-ky-xanhsm-partner/vung-tau",
        destination: "https://vungtauev.vn/dang-ky-green-sm",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
