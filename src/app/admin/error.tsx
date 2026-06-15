"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { AdminDatabaseSetup } from "@/components/admin/AdminDatabaseSetup";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [dbMessage, setDbMessage] = useState<string | null>(null);
  const [dbReady, setDbReady] = useState<boolean | null>(null);

  useEffect(() => {
    console.error("[admin]", error);
    void fetch("/api/admin/auth/login")
      .then((res) => res.json())
      .then(
        (data: {
          database?: { ready?: boolean; message?: string | null };
        }) => {
          setDbReady(data.database?.ready ?? null);
          setDbMessage(data.database?.message ?? null);
        },
      )
      .catch(() => setDbReady(null));
  }, [error]);

  const message = error.message ?? "";
  const isDatabaseSetup =
    dbReady === false ||
    message.includes("Supabase") ||
    message.includes("SUPABASE") ||
    message.includes("SQLite") ||
    message.includes("[supabase]");

  if (isDatabaseSetup) {
    return <AdminDatabaseSetup message={dbMessage} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle className="w-8 h-8 shrink-0" />
          <h1 className="text-xl font-bold text-slate-900">
            Không tải được trang admin
          </h1>
        </div>

        <p className="text-sm text-slate-600">
          {message ||
            "Lỗi server khi render trang. Kiểm tra biến môi trường trên Vercel và thử lại."}
        </p>
        {error.digest && (
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Mã lỗi: {error.digest}
          </p>
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
