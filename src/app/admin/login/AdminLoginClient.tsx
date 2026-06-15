"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Lock } from "lucide-react";
import { sanitizeAdminRedirect } from "@/lib/admin/auth-secret";
import { adminInputClass } from "@/components/admin/AdminShell";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Đăng nhập thất bại");
      return;
    }

    const next = sanitizeAdminRedirect(searchParams.get("next"));
    router.push(next);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto mb-6">
          <Lock className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
          Cần Thơ GF Admin
        </h1>
        <p className="text-center text-slate-500 text-sm mb-8">
          Quản lý bài viết SEO và chương trình khuyến mãi
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 mb-1.5 block">
              Mật khẩu admin
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={adminInputClass}
              placeholder="Nhập ADMIN_PASSWORD"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Mặc định dev: <code className="font-mono">admin123</code> — đặt{" "}
          <code className="font-mono">ADMIN_PASSWORD</code> trên production
        </p>
      </div>
    </div>
  );
}
