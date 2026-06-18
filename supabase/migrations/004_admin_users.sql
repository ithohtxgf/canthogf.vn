-- Admin users — đăng nhập CMS qua database (email + mật khẩu băm scrypt)
-- Chạy trong Supabase SQL Editor sau 001_initial.sql

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  display_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_admin_users_email on admin_users (lower(email));
create index if not exists idx_admin_users_active on admin_users (is_active);

alter table admin_users enable row level security;
-- Không tạo policy public — chỉ service role (server API) truy cập
