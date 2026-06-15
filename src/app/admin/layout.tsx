import type { Metadata } from "next";
import { AdminDbBadge } from "@/components/admin/AdminDbBadge";
import { AdminDatabaseSetup } from "@/components/admin/AdminDatabaseSetup";
import { getDatabaseSetupStatus } from "@/lib/db/config";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Layout admin — không bọc thêm html/body (root layout đã có) */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dbStatus = getDatabaseSetupStatus();

  if (!dbStatus.ready) {
    return (
      <div className="admin-root min-h-screen antialiased">
        <AdminDatabaseSetup message={dbStatus.message} />
      </div>
    );
  }

  return (
    <div className="admin-root min-h-screen antialiased">
      {children}
      <AdminDbBadge />
    </div>
  );
}
