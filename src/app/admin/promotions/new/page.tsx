import { AdminShell } from "@/components/admin/AdminShell";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { createEmptyPromotion } from "@/lib/admin/defaults";

export default function AdminNewPromotionPage() {
  return (
    <AdminShell
      title="Thêm khuyến mãi"
      description="Chọn vị trí vàng trên sơ đồ bài viết — preview trước khi lưu"
    >
      <PromotionForm initial={createEmptyPromotion()} mode="create" />
    </AdminShell>
  );
}
