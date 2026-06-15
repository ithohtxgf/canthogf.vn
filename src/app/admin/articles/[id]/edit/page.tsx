import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { getArticleById } from "@/lib/db/articles";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  const { createdAt: _c, updatedAt: _u, ...initial } = article;

  return (
    <AdminShell
      title="Sửa bài viết"
      description={`/tin-tuc/${article.id}`}
    >
      <ArticleForm initial={initial} mode="edit" />
    </AdminShell>
  );
}
