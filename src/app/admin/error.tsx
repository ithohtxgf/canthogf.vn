"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  const message = error.message ?? "";
  const isDatabaseSetup =
    message.includes("Supabase") ||
    message.includes("SUPABASE") ||
    message.includes("SQLite") ||
    message.includes("[supabase]");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle className="w-8 h-8 shrink-0" />
          <h1 className="text-xl font-bold text-slate-900">
            Không tải được trang admin
          </h1>
        </div>

        {isDatabaseSetup ? (
          <div className="space-y-3 text-sm text-slate-700">
            <p className="font-semibold text-amber-900">
              Database chưa cấu hình đúng trên server
            </p>
            <p>
              Đăng nhập thành công nhưng trang admin cần kết nối Supabase.
              Trên Vercel → <strong>Settings → Environment Variables</strong>{" "}
              (Production), thêm:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs bg-slate-50 rounded-lg p-3 border border-slate-200">
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>SUPABASE_SERVICE_ROLE_KEY</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ul>
            <p>Sau đó <strong>Redeploy</strong> và chạy migration SQL trong Supabase Dashboard.</p>
          </div>
        ) : (
          <p className="text-sm text-slate-600 whitespace-pre-wrap">{message || "Lỗi server không xác định."}</p>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
          >
            Thử lại
          </button>
          <Link
            href="/admin/login"
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Về trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
