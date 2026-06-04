import type { Metadata } from "next";
import { ORGANIZATION_NAME, SITE_NAME } from "@/lib/seo";

/**
 * Metadata icons (lớp 2) — bổ sung cho favicon.ico file-based trong app/.
 * File PNG / manifest đặt trong public/.
 */
export const iconsMetadata: Pick<Metadata, "manifest" | "icons" | "appleWebApp" | "other"> =
  {
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      shortcut: "/favicon-32x32.png",
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "default",
    },
    other: {
      "msapplication-TileImage": "/android-chrome-192x192.png",
      "msapplication-TileColor": "#103b7c",
    },
  };

export const PWA_MANIFEST = {
  name: ORGANIZATION_NAME,
  short_name: SITE_NAME,
  description:
    "Đại lý ô tô VinFast Cần Thơ, đăng ký XanhSM — Hợp tác xã vận tải Cần Thơ GF",
  start_url: "/",
  scope: "/",
  display: "standalone" as const,
  lang: "vi",
  theme_color: "#103b7c",
  background_color: "#ffffff",
  icons: [
    {
      src: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};
