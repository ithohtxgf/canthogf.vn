import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { PromotionsTable } from "@/components/admin/PromotionsTable";
import { listAllPromotions } from "@/lib/db/promotions-db";

export const dynamic = "force-dynamic";

export default async function AdminPromotionsPage() {
  const promotions = await listAllPromotions();

  return (
    <AdminShell
      title="Khuyến mãi"
      description="Trung tâm quản lý banner — 4 vị trí vàng trên bài viết + trang sản phẩm"
      actions={
        <Link
          href="/admin/promotions/new"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
        >
          + Thêm KM
        </Link>
      }
    >
      <PromotionsTable promotions={promotions} />
    </AdminShell>
  );
}
