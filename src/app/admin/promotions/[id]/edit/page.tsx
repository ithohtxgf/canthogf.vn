import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { getPromotionById } from "@/lib/db/promotions-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditPromotionPage({ params }: PageProps) {
  const { id } = await params;
  const promotion = await getPromotionById(id);

  if (!promotion) {
    notFound();
  }

  return (
    <AdminShell title="Sửa khuyến mãi" description={promotion.id}>
      <PromotionForm initial={promotion} mode="edit" />
    </AdminShell>
  );
}
