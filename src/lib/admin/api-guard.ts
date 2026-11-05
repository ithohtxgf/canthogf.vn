import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/session";

/**
 * Kiểm tra quyền admin ngay trong route handler — không chỉ dựa vào middleware.
 * Trả về response 401 nếu chưa đăng nhập, null nếu hợp lệ.
 *
 *   const denied = await denyIfNotAdmin();
 *   if (denied) return denied;
 */
export async function denyIfNotAdmin(): Promise<NextResponse | null> {
  if (await isAdminAuthenticated()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
