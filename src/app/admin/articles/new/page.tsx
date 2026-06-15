import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { createEmptyArticle } from "@/lib/admin/defaults";

export default function AdminNewArticlePage() {
  return (
    <AdminShell
      title="Tạo bài viết mới"
      description="Form 5 tab — SEO checklist, section builder, FAQ, CTA, E-E-A-T"
    >
      <ArticleForm initial={createEmptyArticle()} mode="create" />
    </AdminShell>
  );
}
