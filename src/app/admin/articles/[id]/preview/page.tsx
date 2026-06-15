import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminArticlePreviewBody } from "@/components/admin/article-form/AdminArticlePreviewBody";
import { getArticleById } from "@/lib/db/articles";
import { toPublicArticle } from "@/lib/db/article-mapper";
import { loadAllPromotions } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminArticlePreviewPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  const publicArticle = toPublicArticle(article);
  const promotions = await loadAllPromotions();

  return (
    <AdminShell
      title="Xem trước bài viết"
      description={`${article.title} — ${article.status === "published" ? "Đã xuất bản" : "Nháp"}`}
      actions={
        <div className="flex gap-2">
          <Link
            href={`/admin/articles/${id}/edit`}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
          >
            Sửa bài
          </Link>
          {article.status === "published" && (
            <Link
              href={`/tin-tuc/${id}`}
              target="_blank"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold hover:bg-slate-50"
            >
              Xem trên site
            </Link>
          )}
        </div>
      }
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-primary-dark text-white px-8 py-10">
          <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
            Preview — PromoBanner từ DB (không có sticky/popup CRO)
          </p>
          <h1 className="text-3xl md:text-4xl font-black">{publicArticle.title}</h1>
          <p className="text-white/70 mt-2 text-sm">
            {publicArticle.date} · {publicArticle.author.name}
          </p>
        </div>
        <div className="p-8 md:p-12">
          <AdminArticlePreviewBody
            article={publicArticle}
            promotions={promotions}
          />
        </div>
      </div>
    </AdminShell>
  );
}
