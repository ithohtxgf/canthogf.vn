import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { iconsMetadata } from "@/lib/icons-metadata";
import { baseMetadata } from "@/lib/seo";
import "../index.css";

/** Font duy nhất của hệ thiết kế EV Green (cùng co-ev.vn): 400/500/600, riêng tiêu đề hero 800 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

/**
 * Metadata toàn site + icons (9.2).
 * favicon.ico: file-based tại src/app/favicon.ico (9.1) — Next.js tự sinh thẻ link.
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...iconsMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
