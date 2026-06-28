# TASK: Admin CMS — Central Petstore
# Dikerjakan oleh: Claude Code
# Project: ~/workspace/web/central-petstore (atau repo lokal)

---

## OVERVIEW

Bangun sistem Admin CMS untuk Central Petstore agar Lie (client) bisa kelola konten website sendiri tanpa bantuan developer.

Sections yang perlu dikelola admin (berdasarkan UI referensi):
- ✅ Produk Unggulan
- ✅ Blog & Tips (Artikel)
- ✅ Video Terbaru
- ✅ Testimoni Pelanggan
- ✅ Promo Hari Ini

---

## DATABASE (Supabase — sudah ada)

Project ID: qxxassyqepesnrydkfhq
Tabel yang sudah ada: articles, products

### Tambah tabel baru via Supabase SQL Editor:

```sql
-- Videos
create table videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  thumbnail_url text,
  video_url text,
  platform text default 'tiktok', -- 'tiktok' | 'youtube' | 'instagram'
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Testimonials
create table testimonials (
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

-- Promos
create table promos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  value text, -- "20%" atau "Rp 99.000"
  value_prefix text, -- "Up to" atau "Mulai dari"
  category text, -- 'aquarium' | 'petshop' | 'pancing'
  bg_color text default '#0A2A8A',
  image_url text,
  button_text text default 'Belanja Sekarang',
  button_link text default '#',
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);
```

### Seed data awal:

```sql
-- Videos
insert into videos (title, thumbnail_url, video_url, platform, sort_order) values
('Tips Merawat Anjing Bulu Lebat & Sehat', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300', '#', 'tiktok', 1),
('Setup Aquarium Air Jernih & Ikan Sehat', 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=300', '#', 'tiktok', 2),
('Tips Memancing Di Sungai yang Benar', 'https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=300', '#', 'tiktok', 3),
('Perawatan Kucing Di Rumah', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300', '#', 'tiktok', 4),
('Unboxing Peralatan Pancing Baru', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', '#', 'tiktok', 5);

-- Testimonials
insert into testimonials (name, location, rating, content, sort_order) values
('Andi', 'Jakarta', 5, 'Barang lengkap dan pelayanan cepat. Sangat recommended!', 1),
('Budi', 'Bandung', 5, 'Pompa aquarium awet dan harga bersahabat. Pasti langganan!', 2),
('Rudi', 'Bekasi', 5, 'Peralatan pancing lengkap dan kualitas terjamin.', 3);

-- Promos
insert into promos (title, subtitle, value, value_prefix, category, bg_color, image_url, sort_order) values
('DISKON AQUARIUM', 'Semua Produk Aquarium', '20%', 'Up to', 'aquarium', '#0A2A8A', 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-aquarium.png', 1),
('PAKET HEMAT PETSHOP', 'Makanan, shampoo, vitamin, dan aksesoris hewan peliharaan', 'Rp 99.000', 'Mulai dari', 'petshop', '#FFA726', 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-petshop.png', 2),
('PERALATAN PANCING', 'Peralatan Pancing Pilihan', '15%', 'Diskon Hingga', 'pancing', '#39A7FF', 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-pancing.png', 3);
```

---

## HALAMAN ADMIN

### Struktur folder yang dibuat:
```
app/
  admin/
    page.tsx              ← Login page
    layout.tsx            ← Admin layout (sidebar + auth check)
    dashboard/
      page.tsx            ← Dashboard overview
    articles/
      page.tsx            ← List artikel
      new/page.tsx        ← Form tambah artikel
      [id]/edit/page.tsx  ← Form edit artikel
    products/
      page.tsx            ← List produk unggulan
      new/page.tsx        ← Form tambah produk
      [id]/edit/page.tsx  ← Form edit produk
    videos/
      page.tsx            ← List video
      new/page.tsx        ← Form tambah video
      [id]/edit/page.tsx  ← Form edit video
    testimonials/
      page.tsx            ← List testimoni
      new/page.tsx        ← Form tambah testimoni
      [id]/edit/page.tsx  ← Form edit testimoni
    promos/
      page.tsx            ← List promo
      [id]/edit/page.tsx  ← Form edit promo

components/
  admin/
    AdminSidebar.tsx      ← Sidebar navigasi admin
    AdminHeader.tsx       ← Header admin dengan logout
    ImageUpload.tsx       ← Komponen upload gambar ke Supabase Storage
    DataTable.tsx         ← Tabel reusable untuk list data
    ConfirmDialog.tsx     ← Dialog konfirmasi hapus
```

---

## DETAIL SETIAP HALAMAN

### 1. /admin — Login Page
- Form: email + password
- Auth via Supabase Auth (`signInWithPassword`)
- Redirect ke /admin/dashboard setelah login sukses
- Error handling: "Email atau password salah"
- Tampilan: centered card, logo Central Petstore di atas

### 2. /admin/layout.tsx
- Cek session Supabase, kalau tidak ada redirect ke /admin
- Sidebar kiri: logo + menu navigasi
- Menu sidebar:
  - 📊 Dashboard
  - 📦 Produk Unggulan
  - 📝 Artikel / Blog
  - 🎬 Video Terbaru
  - ⭐ Testimoni
  - 🔥 Promo

### 3. /admin/dashboard
- Tampilkan stats:
  - Total produk aktif
  - Total artikel published
  - Total video aktif
  - Total testimoni

### 4. /admin/articles — Kelola Artikel
**List page:**
- Tabel: judul | kategori | status | tanggal | aksi
- Tombol "Tambah Artikel Baru"
- Toggle published/unpublished langsung dari tabel
- Tombol edit & hapus

**Form tambah/edit:**
- Judul (text input)
- Slug (auto-generate dari judul, bisa diedit)
- Kategori (select: petshop | aquarium | pancing | umum)
- Excerpt (textarea, max 200 char)
- Konten (textarea — cukup plain text untuk Starter)
- Gambar (ImageUpload component → upload ke Supabase Storage bucket "assets")
- Status: Draft / Published (toggle)
- Tombol Simpan & Batalkan

### 5. /admin/products — Kelola Produk Unggulan
**List page:**
- Tabel: foto | nama | harga | kategori | featured | aksi
- Tombol "Tambah Produk"

**Form tambah/edit:**
- Nama produk (text)
- Harga (number → format Rp otomatis)
- Kategori (select: petshop | aquarium | pancing)
- Deskripsi singkat (textarea)
- Gambar produk (ImageUpload → Supabase Storage)
- WA message (text, default: "Halo, saya tertarik dengan [nama produk]")
- Featured toggle (tampil di homepage)

### 6. /admin/videos — Kelola Video
**List page:**
- Tabel: thumbnail | judul | platform | aktif | aksi

**Form tambah/edit:**
- Judul video (text)
- URL Video (text, link TikTok/YouTube/Instagram)
- Thumbnail URL (text atau ImageUpload)
- Platform (select: tiktok | youtube | instagram)
- Urutan tampil (number)
- Aktif toggle

### 7. /admin/testimonials — Kelola Testimoni
**List page:**
- Tabel: nama | lokasi | rating | aktif | aksi

**Form tambah/edit:**
- Nama (text)
- Lokasi (text, e.g. "Jakarta")
- Rating (1-5 bintang)
- Isi testimoni (textarea)
- Foto avatar (ImageUpload → Supabase Storage, opsional)
- Aktif toggle

### 8. /admin/promos — Kelola Promo
**List page:**
- Tabel: judul | kategori | nilai diskon | aktif | aksi
- Tidak perlu tambah/hapus — edit saja (3 promo sudah fixed)

**Form edit:**
- Judul (text)
- Subtitle/deskripsi (text)
- Value prefix (text, e.g. "Up to" atau "Mulai dari")
- Nilai (text, e.g. "20%" atau "Rp 99.000")
- Gambar background (ImageUpload → ganti gambar promo)
- Tombol text (text)
- Aktif toggle

---

## KOMPONEN PENTING

### ImageUpload.tsx
```
Props: 
- value: string (URL gambar saat ini)
- onChange: (url: string) => void
- bucket: string (default: 'assets')

Fungsi:
- Tampilkan preview gambar kalau sudah ada
- Tombol "Upload Gambar" → buka file picker
- Upload ke Supabase Storage pakai supabaseClient.storage.from(bucket).upload()
- Return public URL setelah upload
- Loading state saat upload
- Error handling
```

---

## KEAMANAN

- Semua route /admin/* dilindungi auth check di layout.tsx
- Kalau tidak ada session → redirect ke /admin
- Tombol logout di header → `supabase.auth.signOut()` → redirect ke /admin

---

## KONEKSI KE HOMEPAGE

Setelah admin input data, homepage harus fetch data dari Supabase:

- `ProdukUnggulan.tsx` → fetch dari tabel `products` where `is_featured = true`
- `BlogSection.tsx` → fetch dari tabel `articles` where `published = true` order by `created_at desc` limit 5
- `VideoSection.tsx` → fetch dari tabel `videos` where `is_active = true` order by `sort_order`
- `TestimoniSection.tsx` → fetch dari tabel `testimonials` where `is_active = true` order by `sort_order`
- `PromoSection.tsx` → fetch dari tabel `promos` where `is_active = true` order by `sort_order`

Semua fetch pakai Supabase client yang sudah ada di `lib/supabase.ts`.
Gunakan `use client` dan `useEffect` untuk fetch di client side.

---

## DESIGN ADMIN

- Warna: putih + biru primary (#0A2A8A) untuk sidebar
- Font: Plus Jakarta Sans (sudah ada)
- Sidebar: dark blue, teks putih
- Konten: background gray-50
- Card: putih, shadow-sm, rounded-xl
- Tombol primary: bg-primary text-white
- Tombol danger: bg-red-500 text-white
- Tabel: border-collapse, hover row highlight

---

## CARA SETUP ADMIN USER

Setelah selesai coding, buat user admin via Supabase:
```
Dashboard Supabase → Authentication → Users → Add User
Email: admin@centralpetstore.id
Password: [buat yang kuat]
```

---

## URUTAN PENGERJAAN

1. Setup tabel baru di Supabase (videos, testimonials, promos) + seed data
2. Buat AdminSidebar + AdminHeader + AdminLayout
3. Buat Login page (/admin)
4. Buat ImageUpload component
5. Buat Dashboard page
6. Buat CRUD Produk
7. Buat CRUD Artikel
8. Buat CRUD Video
9. Buat CRUD Testimoni
10. Buat Edit Promo
11. Update homepage untuk fetch data dari Supabase
12. Test semua flow
13. Push ke GitHub → auto deploy Vercel

---

## UPDATE: SIMPLIFIKASI PROMO

### Ubah tabel promos menjadi:
```sql
-- Drop tabel promo lama, buat yang baru
drop table if exists promos;

create table promos (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,        -- gambar banner promo
  link_url text not null,         -- URL tujuan (produk/kategori)
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Seed awal
insert into promos (image_url, link_url, sort_order) values
('https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-aquarium.png', '#aquarium', 1),
('https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-petshop.png', '#petshop', 2),
('https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/promo-pancing.png', '#pancing', 3);
```

### Admin /admin/promos:
- List promo: thumbnail kecil | URL | aktif | urutan | aksi
- Form tambah/edit HANYA 3 field:
  - Gambar banner (ImageUpload → Supabase Storage)
  - URL tujuan (text input, contoh: https://wa.me/6281342513200?text=Promo+Aquarium)
  - Urutan tampil (number)
- Bisa tambah promo baru, edit, hapus

### Halaman /promo (public):
- Grid banner promo (2 kolom mobile, 3 kolom desktop)
- Setiap banner: klik → redirect ke link_url
- Fetch dari tabel promos where is_active = true order by sort_order
- Banner tampil sebagai <a href={link_url}><img src={image_url}/></a>
- Tidak perlu teks overlay — gambar sudah include semua info promo

### Homepage PromoSection:
- Tampilkan max 3 promo pertama dari tabel
- Klik banner → redirect ke link_url
- Sama seperti halaman /promo tapi hanya 3 item