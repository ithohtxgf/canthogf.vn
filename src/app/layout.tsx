import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { iconsMetadata } from "@/lib/icons-metadata";
import { baseMetadata } from "@/lib/seo";
import "../index.css";

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
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
