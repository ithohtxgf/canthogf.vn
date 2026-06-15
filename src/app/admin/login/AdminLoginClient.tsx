"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { sanitizeAdminRedirect } from "@/lib/admin/auth-redirect";
import { adminInputClass } from "@/components/admin/AdminShell";

export default function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authConfigured, setAuthConfigured] = useState<boolean | null>(null);
  const [setupMessage, setSetupMessage] = useState("");
  const [databaseReady, setDatabaseReady] = useState<boolean | null>(null);
  const [databaseMessage, setDatabaseMessage] = useState("");

  useEffect(() => {
    void fetch("/api/admin/auth/login")
      .then((res) => res.json())
      .then(
        (data: {
          configured?: boolean;
          setupMessage?: string | null;
          database?: { ready?: boolean; message?: string | null };
        }) => {
          setAuthConfigured(Boolean(data.configured));
          setSetupMessage(data.setupMessage ?? "");
          setDatabaseReady(data.database?.ready ?? null);
          setDatabaseMessage(data.database?.message ?? "");
        },
      )
      .catch(() => {
        setAuthConfigured(null);
        setDatabaseReady(null);
      });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      let message = "Đăng nhập thất bại";
      try {
        const data = (await res.json()) as { error?: string };
        message = data.error ?? message;
      } catch {
        if (res.status === 503) {
          message = "Server chưa cấu hình Supabase Auth. Xem hướng dẫn bên dưới.";
        }
      }
      setError(message);
      return;
    }

    const next = sanitizeAdminRedirect(searchParams.get("next"));
    router.push(next);
    router.refresh();
  }

  const blocked = authConfigured === false || databaseReady === false;

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto mb-6">
          <Lock className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-8">
          Cần Thơ GF Admin
        </h1>

        {databaseReady === false && (
          <div className="mb-4 text-sm text-red-900 bg-red-50 border border-red-200 rounded-lg px-3 py-3 space-y-1">
            <p className="font-semibold">Database chưa cấu hình trên Vercel</p>
            <p>
              {databaseMessage ||
                "Thêm NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY (Production) → Redeploy."}
            </p>
          </div>
        )}

        {authConfigured === false && (
          <div className="mb-4 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-3 space-y-1">
            <p className="font-semibold">Chưa cấu hình đăng nhập Supabase</p>
            <p>
              {setupMessage ||
                "Tạo user trong Supabase → Authentication, rồi thêm ADMIN_ALLOWED_EMAILS trên Vercel."}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 mb-1.5 block">
              Email admin
            </span>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${adminInputClass} pl-10`}
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 mb-1.5 block">
              Mật khẩu
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={adminInputClass}
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
            disabled={loading || blocked}
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
