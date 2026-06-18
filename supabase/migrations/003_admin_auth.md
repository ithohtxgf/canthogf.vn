# Admin CMS — đăng nhập

## Cách 1: Database (`admin_users`)

1. Chạy migration `004_admin_users.sql` trong Supabase SQL Editor (production)
2. Tạo admin:
   ```bash
   npm run db:seed-admin -- admin@example.com your-password "Tên admin"
   ```
3. Đăng nhập tại `/admin/login` bằng email + mật khẩu vừa tạo

Dev local (SQLite): đặt `ADMIN_EMAIL` + `ADMIN_PASSWORD` trong `.env.local` — tự seed khi khởi động lần đầu.

## Cách 2: Supabase Auth

1. Authentication → Providers → Email: bật
2. Authentication → Users → Add user
3. `ADMIN_ALLOWED_EMAILS=email@domain.com` trên Vercel / `.env`
4. Redeploy

Có thể dùng **cả hai** — email trong `admin_users` hoặc `ADMIN_ALLOWED_EMAILS` đều được phép.
