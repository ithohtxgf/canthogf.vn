"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { sanitizeAdminRedirect } from "@/lib/admin/auth-secret";
import { adminInputClass } from "@/components/admin/AdminShell";

type AdminLoginClientProps = {
  isProduction?: boolean;
};

export default function AdminLoginClient({
  isProduction = false,
}: AdminLoginClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverConfigured, setServerConfigured] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    void fetch("/api/admin/auth/login")
      .then((res) => res.json())
      .then((data: { configured?: boolean }) => {
        setServerConfigured(Boolean(data.configured));
      })
      .catch(() => setServerConfigured(null));
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password.trim() }),
    });

    setLoading(false);

    if (!res.ok) {
      let message = "Đăng nhập thất bại";
      try {
        const data = (await res.json()) as { error?: string };
        message = data.error ?? message;
      } catch {
        if (res.status === 503) {
          message =
            "Server chưa cấu hình ADMIN_PASSWORD trên Vercel. Xem hướng dẫn bên dưới.";
        }
      }
      setError(message);
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

        {serverConfigured === false && (
          <div className="mb-4 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-3 space-y-1">
            <p className="font-semibold">Chưa cấu hình mật khẩu server</p>
            <p>
              Vercel → Settings → Environment Variables → thêm{" "}
              <code className="font-mono text-xs">ADMIN_PASSWORD</code> (Production)
              → Redeploy.
            </p>
          </div>
        )}

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
              placeholder="Mật khẩu bạn đã đặt trên Vercel"
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
            disabled={loading || serverConfigured === false}
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {!isProduction ? (
          <p className="text-xs text-slate-400 text-center mt-6">
            Dev local: mặc định <code className="font-mono">admin123</code> nếu
            chưa có <code className="font-mono">ADMIN_PASSWORD</code> trong .env
          </p>
        ) : (
          <p className="text-xs text-slate-400 text-center mt-6">
            Dùng mật khẩu đã khai báo biến{" "}
            <code className="font-mono">ADMIN_PASSWORD</code> trên Vercel — không
            phải mật khẩu dev.
          </p>
        )}
      </div>
    </div>
  );
}
