-- Admin CMS — Central Petstore
-- Jalankan file ini di Supabase Dashboard → SQL Editor (project qxxassyqepesnrydkfhq)
-- Menambahkan tabel videos, testimonials, promos + RLS policies + seed data.

-- ============================================================
-- VIDEOS
-- ============================================================
create table if not exists videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  thumbnail_url text,
  video_url text,
  platform text default 'tiktok', -- 'tiktok' | 'youtube' | 'instagram'
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table videos enable row level security;

create policy "Public can read videos" on videos
  for select using (true);

create policy "Authenticated can manage videos" on videos
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text,
  avatar_url text,
  rating integer default 5,
  content text not null,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table testimonials enable row level security;

create policy "Public can read testimonials" on testimonials
  for select using (true);

create policy "Authenticated can manage testimonials" on testimonials
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- PROMOS (skema simplifikasi — hanya gambar banner + link tujuan)
-- ============================================================
drop table if exists promos;

create table promos (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  link_url text not null,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table promos enable row level security;

create policy "Public can read promos" on promos
  for select using (true);

create policy "Authenticated can manage promos" on promos
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================
insert into videos (title, thumbnail_url, video_url, platform, sort_order) values
('Tips Merawat Anjing Bulu Lebat & Sehat', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300', '#', 'tiktok', 1),
('Setup Aquarium Air Jernih & Ikan Sehat', 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=300', '#', 'tiktok', 2),
('Tips Memancing Di Sungai yang Benar', 'https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=300', '#', 'tiktok', 3),
('Perawatan Kucing Di Rumah', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300', '#', 'tiktok', 4),
('Unboxing Peralatan Pancing Baru', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', '#', 'tiktok', 5);

insert into testimonials (name, location, rating, content, sort_order) values
('Andi', 'Jakarta', 5, 'Barang lengkap dan pelayanan cepat. Sangat recommended!', 1),
('Budi', 'Bandung', 5, 'Pompa aquarium awet dan harga bersahabat. Pasti langganan!', 2),
('Rudi', 'Bekasi', 5, 'Peralatan pancing lengkap dan kualitas terjamin.', 3);

insert into promos (image_url, link_url, sort_order) values
('https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-aquarium.png', '#aquarium', 1),
('https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-petshop.png', '#petshop', 2),
('https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-pancing.png', '#pancing', 3);

-- ============================================================
-- STORAGE BUCKET untuk upload gambar dari Admin (ImageUpload.tsx)
-- Bucket "assets" dipakai karena seed promo/kategori di atas sudah
-- mereferensikan path .../object/public/assets/...
-- Jika bucket belum ada, buat manual di Storage dashboard (set Public).
-- ============================================================
