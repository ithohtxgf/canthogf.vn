-- Supabase Storage — bucket ảnh CMS (public CDN)
-- Chạy sau 001_initial.sql trong SQL Editor

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'canthogf-media',
  'canthogf-media',
  true,
  5242880,
  array['image/webp', 'image/jpeg', 'image/png', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public read (visitor + img src)
create policy "Public read canthogf media"
  on storage.objects for select
  using (bucket_id = 'canthogf-media');

-- Upload/update/delete qua service role (admin API) — bypass RLS
