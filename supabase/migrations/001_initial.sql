-- Cần Thơ GF CMS — chạy trong Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists articles (
  id text primary key,
  title text not null,
  meta_title text not null,
  excerpt text not null,
  image text not null,
  image_alt text not null,
  image_caption text,
  date text not null,
  category text not null,
  primary_keyword text not null,
  keywords jsonb not null default '[]'::jsonb,
  sapo_html text not null,
  sections jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  author jsonb not null,
  conclusion_html text not null,
  cta jsonb not null,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_articles_status on articles (status);
create index if not exists idx_articles_category on articles (category);
create index if not exists idx_articles_updated on articles (updated_at desc);

create table if not exists promotions (
  id text primary key,
  data jsonb not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists idx_promotions_active on promotions (is_active);

-- RLS: site public chỉ đọc bài published (anon key — nếu dùng client-side sau này)
alter table articles enable row level security;
alter table promotions enable row level security;

create policy "Public read published articles"
  on articles for select
  using (status = 'published');

create policy "Public read active promotions"
  on promotions for select
  using (is_active = true);

-- Service role (server admin API) bypass RLS — không cần policy thêm
