import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticlesTable } from "@/components/admin/ArticlesTable";
import { listArticles } from "@/lib/db/articles";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await listArticles();

  return (
    <AdminShell
      title="Bài viết SEO"
      description="Quản lý tin tức — slug, meta, nội dung chuẩn SEO"
      actions={
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
        >
          + Tạo bài mới
        </Link>
      }
    >
      <ArticlesTable articles={articles} />
    </AdminShell>
  );
}
