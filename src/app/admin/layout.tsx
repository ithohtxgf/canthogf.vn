import type { Metadata } from "next";
import { AdminDbBadge } from "@/components/admin/AdminDbBadge";

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
  return (
    <div className="admin-root min-h-screen antialiased">
      {children}
      <AdminDbBadge />
    </div>
  );
}
