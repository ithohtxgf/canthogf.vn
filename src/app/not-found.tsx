import type { Metadata } from "next";
import AppClient from "./[[...slug]]/AppClient";
import { loadAllPromotions } from "@/lib/server/content-store";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false, follow: false },
};

/** Trang 404 dùng chung giao diện site (header, footer, nút liên hệ) */
export default async function NotFoundPage() {
  const promotions = await loadAllPromotions().catch(() => undefined);

  return (
    <AppClient
      initialData={{ pathname: "/404", route: { page: "notFound" }, promotions }}
      forceNotFound
    />
  );
}
