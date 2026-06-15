import type { ReactNode } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminDashboardStats } from "@/lib/admin/admin-stats";
import {
  FileText,
  Gift,
  Newspaper,
  Plus,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <AdminShell
      title="Tổng quan"
      description="Trung tâm điều khiển CMS Cần Thơ GF"
    >
      {stats.usingStaticFallback && (
        <div className="mb-6 flex gap-3 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Supabase đang trống</p>
            <p className="text-amber-800 mt-1">
              Site public đang fallback dữ liệu tĩnh từ file{" "}
              <code className="font-mono text-xs">news.ts</code>. Chạy{" "}
              <code className="font-mono text-xs">npm run db:seed</code> hoặc{" "}
              <code className="font-mono text-xs">npm run db:migrate</code>.
            </p>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Bài viết"
          value={stats.articlesTotal}
          sub={`${stats.articlesPublished} xuất bản · ${stats.articlesDraft} nháp`}
          href="/admin/articles"
          icon={<Newspaper className="w-5 h-5" />}
        />
        <StatCard
          label="Khuyến mãi"
          value={stats.promotionsTotal}
          sub={`${stats.promotionsActive} đang chạy`}
          href="/admin/promotions"
          icon={<Gift className="w-5 h-5" />}
        />
        <StatCard
          label="KM hết hạn"
          value={stats.promotionsExpired}
          sub="Cần gia hạn hoặc tắt"
          href="/admin/promotions"
          icon={<Gift className="w-5 h-5 text-amber-600" />}
        />
        <StatCard
          label="Database"
          value={stats.databaseMode === "supabase" ? "Cloud" : "Local"}
          sub={
            stats.databaseMode === "supabase"
              ? "Supabase Postgres"
              : "SQLite dev"
          }
          href="/admin/articles"
          icon={<FileText className="w-5 h-5" />}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <QuickAction
          title="Viết bài SEO mới"
          description="Form 5 tab — checklist, AI assistant, upload ảnh"
          href="/admin/articles/new"
          cta="Tạo bài"
        />
        <QuickAction
          title="Thêm khuyến mãi"
          description="4 vị trí vàng trên bài viết + trang sản phẩm"
          href="/admin/promotions/new"
          cta="Thêm KM"
        />
      </div>
    </AdminShell>
  );
}

function StatCard({
  label,
  value,
  sub,
  href,
  icon,
}: {
  label: string;
  value: string | number;
  sub: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-primary/30 hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-slate-500">{label}</span>
        <span className="text-primary">{icon}</span>
      </div>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </Link>
  );
}

function QuickAction({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 flex-1">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary hover:underline"
      >
        <Plus className="w-4 h-4" /> {cta}
      </Link>
    </div>
  );
}
