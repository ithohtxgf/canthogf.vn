"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Trash2, Copy } from "lucide-react";
import { AdminButton } from "@/components/admin/AdminShell";
import type { Promotion, PromotionPosition } from "@/lib/content/promotions";
import {
  PROMOTION_CATEGORY_OPTIONS,
  PROMOTION_POSITION_OPTIONS,
  isPromotionExpired,
} from "@/lib/admin/promotion-form-config";
import { useRouter } from "next/navigation";

type PromotionsTableProps = {
  promotions: Promotion[];
};

export function PromotionsTable({ promotions }: PromotionsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState<PromotionPosition | "all">(
    "all",
  );
  const [categoryFilter, setCategoryFilter] = useState<
    Promotion["categoryTarget"] | "all"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "expired"
  >("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return promotions.filter((promo) => {
      if (positionFilter !== "all" && promo.position !== positionFilter) {
        return false;
      }
      if (categoryFilter !== "all" && promo.categoryTarget !== categoryFilter) {
        return false;
      }
      if (statusFilter === "active" && (!promo.isActive || isPromotionExpired(promo.validUntil))) {
        return false;
      }
      if (statusFilter === "inactive" && promo.isActive) return false;
      if (statusFilter === "expired" && !isPromotionExpired(promo.validUntil)) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          promo.title.toLowerCase().includes(q) ||
          promo.id.toLowerCase().includes(q) ||
          (promo.headline ?? "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [promotions, positionFilter, categoryFilter, statusFilter, search]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Xóa khuyến mãi "${title}"?`)) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/promotions/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    setDeletingId(null);
    if (res.ok) router.refresh();
    else alert("Xóa thất bại");
  }

  async function handleDuplicate(id: string) {
    setDuplicatingId(id);
    const res = await fetch(
      `/api/admin/promotions/${encodeURIComponent(id)}/duplicate`,
      { method: "POST" },
    );
    setDuplicatingId(null);

    if (!res.ok) {
      alert("Nhân bản thất bại");
      return;
    }

    const data = (await res.json()) as { promotion?: { id: string } };
    if (data.promotion?.id) {
      router.push(
        `/admin/promotions/${encodeURIComponent(data.promotion.id)}/edit`,
      );
      router.refresh();
    }
  }

  async function toggleActive(promo: Promotion) {
    const res = await fetch(
      `/api/admin/promotions/${encodeURIComponent(promo.id)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...promo, isActive: !promo.isActive }),
      },
    );
    if (res.ok) router.refresh();
    else alert("Cập nhật thất bại");
  }

  const positionLabel = (pos: PromotionPosition) =>
    PROMOTION_POSITION_OPTIONS.find((p) => p.value === pos)?.label ?? pos;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 bg-white rounded-2xl border border-slate-200 p-4">
        <input
          type="search"
          placeholder="Tìm theo tên, ID..."
          className="flex-1 min-w-[180px] rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={positionFilter}
          onChange={(e) =>
            setPositionFilter(e.target.value as PromotionPosition | "all")
          }
        >
          <option value="all">Mọi vị trí</option>
          {PROMOTION_POSITION_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value as Promotion["categoryTarget"] | "all",
            )
          }
        >
          <option value="all">Mọi danh mục</option>
          {PROMOTION_CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as "all" | "active" | "inactive" | "expired",
            )
          }
        >
          <option value="all">Mọi trạng thái</option>
          <option value="active">Đang chạy</option>
          <option value="inactive">Đã tắt</option>
          <option value="expired">Hết hạn</option>
        </select>
      </div>

      <p className="text-sm text-slate-500">
        {filtered.length}/{promotions.length} chương trình
      </p>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          Không có khuyến mãi phù hợp bộ lọc.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">
                  Chương trình
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">
                  Vị trí
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">
                  Target
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">
                  Trạng thái
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((promo) => {
                const expired = isPromotionExpired(promo.validUntil);
                return (
                  <tr
                    key={promo.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{promo.title}</p>
                      <p className="text-xs text-slate-400 font-mono">{promo.id}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {promo.headline}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {promo.position}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        {positionLabel(promo.position).split("—")[0]?.trim()}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {promo.categoryTarget}
                      {promo.productTarget && (
                        <span className="block text-slate-400">
                          SP: {promo.productTarget}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleActive(promo)}
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer ${
                          !promo.isActive
                            ? "bg-slate-100 text-slate-600"
                            : expired
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                        title="Click để bật/tắt nhanh"
                      >
                        {!promo.isActive
                          ? "Tắt"
                          : expired
                            ? "Hết hạn"
                            : "Đang chạy"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <AdminButton
                          variant="secondary"
                          className="!px-2 !py-1.5"
                          disabled={duplicatingId === promo.id}
                          title="Nhân bản"
                          onClick={() => handleDuplicate(promo.id)}
                        >
                          <Copy className="w-4 h-4" />
                        </AdminButton>
                        <Link href={`/admin/promotions/${promo.id}/edit`}>
                          <AdminButton variant="secondary" className="!px-2 !py-1.5">
                            <Pencil className="w-4 h-4" />
                          </AdminButton>
                        </Link>
                        <AdminButton
                          variant="danger"
                          className="!px-2 !py-1.5"
                          disabled={deletingId === promo.id}
                          onClick={() => handleDelete(promo.id, promo.title)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </AdminButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
