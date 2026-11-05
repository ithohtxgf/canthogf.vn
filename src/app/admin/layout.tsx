import type { Metadata } from "next";
import { AdminDatabaseSetup } from "@/components/admin/AdminDatabaseSetup";
import { getDatabaseSetupStatus } from "@/lib/db/config";

/**
 * Khu admin luôn render theo request: mỗi trang kiểm tra phiên đăng nhập (cookie)
 * ở server. Không được prerender tĩnh — nếu không, kết quả "chưa đăng nhập" lúc
 * build sẽ bị đóng cứng thành lệnh chuyển về /admin/login.
 */
export const dynamic = "force-dynamic";

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
    </div>
  );
}
