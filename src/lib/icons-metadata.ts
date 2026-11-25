import type { Metadata } from "next";
import { ORGANIZATION_NAME, SITE_NAME } from "@/lib/seo";

/**
 * Metadata icons (lớp 2) — bổ sung cho favicon.ico file-based trong app/.
 * File PNG / manifest đặt trong public/.
 */
/** Tăng số này khi đổi favicon để trình duyệt bỏ bản cũ trong bộ nhớ đệm. */
const ICON_VERSION = "2";
const v = (path: string) => `${path}?v=${ICON_VERSION}`;

export const iconsMetadata: Pick<Metadata, "manifest" | "icons" | "appleWebApp" | "other"> =
  {
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: v("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
        { url: v("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
        { url: v("/favicon-48x48.png"), sizes: "48x48", type: "image/png" },
        { url: v("/favicon-96x96.png"), sizes: "96x96", type: "image/png" },
        { url: v("/favicon-144x144.png"), sizes: "144x144", type: "image/png" },
        { url: v("/android-chrome-192x192.png"), sizes: "192x192", type: "image/png" },
      ],
      apple: [
        {
          url: v("/apple-touch-icon.png"),
          sizes: "180x180",
          type: "image/png",
        },
      ],
      shortcut: v("/favicon-32x32.png"),
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "default",
    },
    other: {
      "msapplication-TileImage": v("/android-chrome-192x192.png"),
      "msapplication-TileColor": "#0A3572",
    },
  };

export const PWA_MANIFEST = {
  name: ORGANIZATION_NAME,
  short_name: SITE_NAME,
  description:
    "Đại lý ô tô VinFast Cần Thơ, đăng ký XanhSM, Hợp tác xã vận tải Cần Thơ EV",
  start_url: "/",
  scope: "/",
  display: "standalone" as const,
  lang: "vi",
  theme_color: "#0A3572",
  background_color: "#ffffff",
  icons: [
    {
      src: v("/android-chrome-192x192.png"),
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: v("/android-chrome-512x512.png"),
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: v("/maskable-512x512.png"),
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};
