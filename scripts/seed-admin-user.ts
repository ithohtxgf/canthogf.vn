import "./load-env";
import { getDatabaseSetupStatus } from "../src/lib/db/config";

async function main() {
  const status = getDatabaseSetupStatus();
  if (!status.ready) {
    console.error(status.message ?? "Database chưa sẵn sàng");
    process.exit(1);
  }

  const email = process.argv[2] ?? process.env.ADMIN_EMAIL?.trim();
  const password = process.argv[3] ?? process.env.ADMIN_PASSWORD?.trim();
  const displayName =
    process.argv[4] ?? process.env.ADMIN_DISPLAY_NAME?.trim() ?? "Admin";

  if (!email || !password) {
    console.error(
      "Cách dùng: npm run db:seed-admin -- <email> <password> [displayName]",
    );
    console.error("Hoặc đặt ADMIN_EMAIL + ADMIN_PASSWORD trong .env.local");
    process.exit(1);
  }

  const user =
    status.mode === "supabase"
      ? await (
          await import("../src/lib/db/admin-users-supabase")
        ).upsertAdminUserFromPasswordSupabase({ email, password, displayName })
      : await (
          await import("../src/lib/db/admin-users-sqlite")
        ).upsertAdminUserFromPasswordSqlite({ email, password, displayName });

  console.log(`Đã lưu admin: ${user.email} (${user.displayName ?? "Admin"})`);
  console.log(`Mode: ${status.mode}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
