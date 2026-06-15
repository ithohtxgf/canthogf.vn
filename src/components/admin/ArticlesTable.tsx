"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { AdminButton, adminInputClass } from "@/components/admin/AdminShell";
import {
  getNewsCategoryLabel,
  NEWS_CATEGORY_LABELS,
  type NewsCategory,
} from "@/lib/content/news";
import type { AdminArticle } from "@/lib/db/article-mapper";

type ArticlesTableProps = {
  articles: AdminArticle[];
};

export function ArticlesTable({ articles }: ArticlesTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<NewsCategory | "all">(
    "all",
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      if (statusFilter !== "all" && article.status !== statusFilter) {
        return false;
      }
      if (categoryFilter !== "all" && article.category !== categoryFilter) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          article.title.toLowerCase().includes(q) ||
          article.id.toLowerCase().includes(q) ||
          article.primaryKeyword.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [articles, statusFilter, categoryFilter, search]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Xóa bài "${title}"? Hành động không thể hoàn tác.`)) return;

    setDeletingId(id);
    const res = await fetch(`/api/admin/articles/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    setDeletingId(null);

    if (res.ok) router.refresh();
    else alert("Xóa thất bại");
  }

  async function handleDuplicate(id: string) {
    setDuplicatingId(id);
    const res = await fetch(
      `/api/admin/articles/${encodeURIComponent(id)}/duplicate`,
      { method: "POST" },
    );
    setDuplicatingId(null);

    if (!res.ok) {
      alert("Nhân bản thất bại");
      return;
    }

    const data = (await res.json()) as { article?: { id: string } };
    if (data.article?.id) {
      router.push(`/admin/articles/${encodeURIComponent(data.article.id)}/edit`);
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 bg-white rounded-2xl border border-slate-200 p-4">
        <input
          className={`${adminInputClass} min-w-[200px] flex-1`}
          placeholder="Tìm tiêu đề, slug, từ khóa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={adminInputClass}
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as typeof statusFilter)
          }
        >
          <option value="all">Mọi trạng thái</option>
          <option value="published">Đã xuất bản</option>
          <option value="draft">Nháp</option>
        </select>
        <select
          className={adminInputClass}
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as NewsCategory | "all")
          }
        >
          <option value="all">Mọi danh mục</option>
          {(Object.keys(NEWS_CATEGORY_LABELS) as NewsCategory[]).map((cat) => (
            <option key={cat} value={cat}>
              {NEWS_CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
        <span className="text-sm text-slate-500 self-center">
          {filtered.length}/{articles.length} bài
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          {articles.length === 0 ? (
            <>
              Chưa có bài viết.{" "}
              <Link
                href="/admin/articles/new"
                className="text-primary font-semibold"
              >
                Tạo bài đầu tiên
              </Link>
            </>
          ) : (
            "Không có bài khớp bộ lọc."
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">
                  Tiêu đề
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">
                  Danh mục
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">
                  Trạng thái
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">
                  Cập nhật
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900 line-clamp-1">
                      {article.title}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      /tin-tuc/{article.id}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {getNewsCategoryLabel(article.category as NewsCategory)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        article.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {article.status === "published" ? "Xuất bản" : "Nháp"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {new Date(article.updatedAt).toLocaleString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {article.status === "published" && (
                        <Link
                          href={`/tin-tuc/${article.id}`}
                          target="_blank"
                          className="text-xs text-primary hover:underline"
                        >
                          Xem
                        </Link>
                      )}
                      <AdminButton
                        variant="secondary"
                        className="!px-2 !py-1.5"
                        disabled={duplicatingId === article.id}
                        title="Nhân bản"
                        onClick={() => handleDuplicate(article.id)}
                      >
                        <Copy className="w-4 h-4" />
                      </AdminButton>
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <AdminButton
                          variant="secondary"
                          className="!px-2 !py-1.5"
                        >
                          <Pencil className="w-4 h-4" />
                        </AdminButton>
                      </Link>
                      <Link
                        href={`/admin/articles/${article.id}/preview`}
                        target="_blank"
                        className="text-xs text-slate-500 hover:text-primary px-1"
                      >
                        Preview
                      </Link>
                      <AdminButton
                        variant="danger"
                        className="!px-2 !py-1.5"
                        disabled={deletingId === article.id}
                        onClick={() => handleDelete(article.id, article.title)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
