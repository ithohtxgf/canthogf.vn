import Link from "next/link";
import { AlertTriangle, Database } from "lucide-react";

type AdminDatabaseSetupProps = {
  message: string | null;
};

export function AdminDatabaseSetup({ message }: AdminDatabaseSetupProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
        <div className="flex items-center gap-3 text-amber-600 mb-4">
          <Database className="w-8 h-8 shrink-0" />
          <h1 className="text-xl font-bold text-slate-900">
            Cần cấu hình Supabase trên Vercel
          </h1>
        </div>

        <div className="space-y-3 text-sm text-slate-700">
          <p>
            {message ??
              "Production không dùng được SQLite. Thêm biến Supabase trên Vercel rồi Redeploy."}
          </p>
          <p className="font-semibold text-slate-900">
            Vercel → Settings → Environment Variables → Production:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs bg-slate-50 rounded-lg p-3 border border-slate-200">
            <li>NEXT_PUBLIC_SUPABASE_URL</li>
            <li>SUPABASE_SERVICE_ROLE_KEY</li>
            <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
          </ul>
          <p>
            Copy giá trị từ file <code className="font-mono text-xs">.env</code> local
            (Supabase Dashboard → Settings → API). Sau đó{" "}
            <strong>Deployments → Redeploy</strong>.
          </p>
          <p className="flex items-start gap-2 text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Migration SQL: chạy <code className="font-mono text-xs">supabase/migrations/001_initial.sql</code>{" "}
              và <code className="font-mono text-xs">002_storage.sql</code> trong Supabase
              SQL Editor nếu chưa chạy.
            </span>
          </p>
        </div>

        <Link
          href="/admin/login"
          className="inline-block mt-6 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Về trang đăng nhập
        </Link>
      </div>
    </div>
  );
}
