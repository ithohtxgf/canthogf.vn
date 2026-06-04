"use client";

import App from "@/App";
import type { PageInitialData } from "@/lib/page-data";

type AppClientProps = {
  /** Bắt buộc từ CatchAllPage (server) */
  initialData: PageInitialData;
};

/**
 * Client shell — SSR bật (không dùng dynamic ssr: false).
 * Nhận route/pathname từ server để HTML ban đầu có h1, nội dung đầy đủ cho Googlebot.
 */
export default function AppClient({ initialData }: AppClientProps) {
  return <App initialData={initialData} />;
}
