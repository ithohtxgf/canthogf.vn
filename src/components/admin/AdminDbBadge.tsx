import { getDatabaseMode } from "@/lib/db/config";

export function AdminDbBadge() {
  const mode = getDatabaseMode();
  const isCloud = mode === "supabase";

  return (
    <div
      className={`fixed bottom-3 right-3 z-50 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border ${
        isCloud
          ? "bg-green-50 text-green-800 border-green-200"
          : "bg-amber-50 text-amber-900 border-amber-200"
      }`}
      title={
        isCloud
          ? "Dữ liệu lưu trên Supabase Postgres"
          : "Dữ liệu lưu file local data/canthogf.db"
      }
    >
      {isCloud ? "☁ Supabase" : "💾 SQLite local"}
    </div>
  );
}
