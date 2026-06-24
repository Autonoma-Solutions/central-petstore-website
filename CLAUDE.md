# CLAUDE.md — Central Petstore Website
# Valhalla Web Pipeline | Autonoma Solutions
# Project: central-petstore | Repo: central-petstore-website

---

## OVERVIEW

Bangun website profesional untuk **Central Petstore** — toko petshop, aquarium, dan pancing di Manado.
Website ini adalah paket Starter dengan CMS sederhana berbasis Supabase.

- **Stack**: Next.js 14 App Router, Tailwind CSS, Framer Motion, Supabase
- **Deploy**: Vercel (autonomas-projects)
- **Repo**: Autonoma-Solutions/central-petstore-website
- **Path**: ~/workspace/web/central-petstore/

---

## BRAND & DESIGN SYSTEM

### Warna
```
Primary Dark Blue : #0A2A8A
Primary Light Blue: #39A7FF
Accent Orange     : #FFA726
White             : #FFFFFF
Gray Light        : #F5F7FA
Gray Text         : #4B5563
```

### Typography
- Font: **Plus Jakarta Sans** (Google Fonts)
- Heading: Bold, dark blue
- Body: Regular, gray

### Nuansa
- Friendly, modern, ramah keluarga
- Mobile-first
- Cocok untuk hobbyist hewan, ikan, mancing

---

## STRUKTUR HALAMAN

```
/                   → Home
/petshop            → Kategori Petshop
/aquarium           → Kategori Aquarium
/pancing            → Kategori Pancing
/promo              → Halaman Promo
/blog               → Daftar Artikel Blog
/blog/[slug]        → Detail Artikel
/tentang            → Tentang Kami
/kontak             → Kontak
/admin              → Admin Dashboard (login)
/admin/articles     → Kelola Artikel
/admin/products     → Kelola Produk Unggulan
```

---

## KOMPONEN HALAMAN HOME (PRIORITAS UTAMA)

### 1. NAVBAR
- Logo Central Petstore (teks jika belum ada asset)
- Search bar placeholder "Cari produk di Central Petstore..."
- Icon WhatsApp + nomor: 0813 4251 3200
- Menu: Beranda | Petshop ▾ | Aquarium ▾ | Pancing ▾ | Promo | Blog & Tips | Tentang Kami | Kontak
- Dropdown Petshop: Anjing, Kucing, Grooming, Kesehatan
- Dropdown Aquarium: Filter, Pompa, Lampu, Pakan
- Dropdown Pancing: Joran, Reel, Senar, Umpan
- Mobile: hamburger menu

### 2. HERO BANNER
- Background: gradient biru tua ke biru muda + gambar anjing, kucing, aquarium, pancing (gunakan Unsplash/placeholder)
- Headline: **"Semua Kebutuhan Hewan, Aquarium & Pancing Dalam Satu Tempat"**
- Subheadline: "Produk berkualitas, harga bersahabat, dan pelayanan terpercaya."
- CTA Button 1: "🛍 Belanja Sekarang" → biru (#39A7FF)
- CTA Button 2: "💬 Chat WhatsApp" → hijau (#25D366) → link: https://wa.me/6281342513200
- Slider/dot navigation (3 slide, Framer Motion autoplay)

### 3. KATEGORI UTAMA (3 Card)
Layout: 3 kolom grid

**Card 1 — PETSHOP** (icon: paw)
- Makanan Anjing, Makanan Kucing, Shampoo & Grooming, Vitamin & Suplemen, Obat Kutu & Obat, Aksesoris Hewan
- Tombol "Lihat Semua" → /petshop

**Card 2 — AQUARIUM** (icon: fish)
- Filter & Media Filter, Pompa Air, Lampu LED, Aerator & Aksesoris, Obat Ikan, Pakan Ikan
- Tombol "Lihat Semua" → /aquarium

**Card 3 — PANCING** (icon: fishing)
- Joran, Reel, Senar, Metal Jig & Lure, Kail & Snap, Aksesoris Pancing
- Tombol "Lihat Semua" → /pancing

### 4. PRODUK UNGGULAN
- Section title: "⭐ Produk Unggulan"
- Horizontal scroll slider (Framer Motion)
- Data produk dari Supabase table `products`
- Setiap card: foto, nama produk, harga (format Rp), tombol "Chat WA"
- Tombol WA otomatis kirim pesan: "Halo, saya tertarik dengan [nama produk]"

Seed data produk awal:
```
Louise Pet Shampoo - Rp 75.000
Fungizol Dog - Rp 85.000
Kandila LED P800 - Rp 120.000
Aerator Jebo AC/DC - Rp 95.000
Sakkai Pump SP-103 - Rp 135.000
Metal Jig Seryoma 40g - Rp 30.000
Ryobi Zeus Reel 1000 - Rp 420.000
```

### 5. PROMO HARI INI
- 3 banner promo berwarna
- Banner 1 (biru): "DISKON AQUARIUM — Up to 20%"
- Banner 2 (orange): "PAKET HEMAT PETSHOP — Mulai dari Rp 99.000"
- Banner 3 (biru muda): "PERALATAN PANCING — Diskon Hingga 15%"
- Setiap banner ada tombol "Belanja Sekarang"

### 6. VIDEO TIKTOK
- Section: "📹 Video Terbaru Central Petstore"
- 5 placeholder card video dengan judul:
  - Tips Merawat Anjing
  - Setup Aquarium
  - Tips Memancing
  - Perawatan Kucing di Rumah
  - Unboxing Peralatan Pancing Baru
- Link ke TikTok: @centralpetstore.id

### 7. TESTIMONI PELANGGAN
- 3 card testimoni bintang 5
- "Barang lengkap dan pelayanan cepat. Sangat recommended!" — Andi, Jakarta
- "Pompa aquarium awet dan harga bersahabat. Pasti langganan!" — Budi, Bandung
- "Peralatan pancing lengkap dan kualitas terjamin." — Rudi, Bekasi

### 8. BLOG & TIPS
- Section title: "📖 Blog & Tips"
- 5 card artikel terbaru dari Supabase table `articles`
- Setiap card: gambar, judul, excerpt, tanggal
- Tombol "Lihat Semua Artikel" → /blog

Seed artikel awal:
```
- Cara Memilih Filter Aquarium yang Tepat
- Tips Mengatasi Kutu Anjing Secara Alami & Aman
- Cara Memilih Senar Pancing yang Kuat & Awet
- Perawatan Ikan Koi Agar Warna Lebih Cerah
- Perawatan Kucing Rumahan Agar Sehat & Bahagia
```

### 9. TENTANG KAMI (mini section)
- Deskripsi singkat Central Petstore
- Tombol "Selengkapnya" → /tentang

### 10. FOOTER
- Logo + deskripsi singkat
- 4 kolom: INFORMASI | KATEGORI | BANTUAN | HUBUNGI KAMI
- Sosial media: Instagram @centralpetstore.id, TikTok, YouTube, Facebook
- WhatsApp: 0813 4251 3200
- Email: centralpetstore.id@gmail.com
- Copyright © 2024 Central Petstore. All Rights Reserved.

---

## DATABASE SCHEMA (Supabase)

### Table: articles
```sql
create table articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  image_url text,
  category text, -- 'petshop' | 'aquarium' | 'pancing' | 'umum'
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Table: products
```sql
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price integer not null,
  image_url text,
  category text, -- 'petshop' | 'aquarium' | 'pancing'
  description text,
  is_featured boolean default false,
  wa_message text,
  created_at timestamptz default now()
);
```

### Table: admin_users
```sql
-- Gunakan Supabase Auth built-in
-- Email: admin@centralpetstore.id
-- Setup via Supabase dashboard
```

---

## ADMIN DASHBOARD (/admin)

### Login Page (/admin)
- Form email + password
- Auth via Supabase Auth
- Redirect ke /admin/articles setelah login

### Kelola Artikel (/admin/articles)
- List semua artikel (tabel)
- Tombol "Tambah Artikel Baru"
- Tombol Edit / Hapus per artikel
- Form artikel: judul, slug (auto-generate), konten (textarea), excerpt, gambar (upload), kategori, status publish

### Kelola Produk (/admin/products)
- List semua produk unggulan
- Tombol "Tambah Produk"
- Form: nama, harga, gambar, kategori, featured toggle

### Image Upload
- Gunakan Supabase Storage bucket: `central-petstore-images`
- Upload langsung dari form admin
- Return public URL

---

## ENVIRONMENT VARIABLES

Buat file `.env.local` di root project:
```
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
NEXT_PUBLIC_WA_NUMBER=6281342513200
```

Tambahkan ke Vercel Environment Variables setelah deploy.

---

## DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/ssr": "^0.1.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.363.0",
    "tailwindcss": "^3.4.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

---

## INFORMASI TOKO

### Toko 1
- Nama: Tk. Central Aquarium
- Alamat: Jl. Wolter Mongisidi 28, Malalayang 1 Timur, Manado
- Telp: +62 852-8855-5557

### Toko 2
- Nama: Tk. Central Petstore
- Alamat: Jl. Martadinata 61B, Manado
- Telp: +62 813 4251 3200

### Sosial Media
- Instagram: @centralpetstore.id
- WhatsApp: 0813 4251 3200
- Email: centralpetstore.id@gmail.com

---

## PRIORITAS BUILD

Urutan pengerjaan:
1. Setup project Next.js + Supabase + Tailwind
2. Layout global (Navbar + Footer)
3. Home page lengkap semua section
4. Halaman Blog (list + detail)
5. Admin login + dashboard artikel
6. Admin dashboard produk
7. Halaman Petshop, Aquarium, Pancing (kategori)
8. Halaman Tentang & Kontak
9. Seed data awal ke Supabase
10. Build + deploy Vercel

---

## CATATAN PENTING

- Mobile responsive wajib di semua halaman
- Tombol WA ada di navbar dan footer (sticky di mobile)
- Semua gambar produk & artikel pakai placeholder dari Unsplash jika belum ada asset asli
- Slug artikel auto-generate dari judul (lowercase, replace spasi dengan -)
- Admin dashboard tidak perlu desain mewah, yang penting fungsional
- Tidak perlu payment gateway
- Tidak perlu keranjang belanja — semua transaksi via WhatsApp

---

## VISUAL REFERENCE — PIXEL ACCURATE

Referensi mockup ada di: ~/workspace/web/central-petstore/mockup.png
Ikuti layout dan styling ini PERSIS.

### NAVBAR (2 baris)
**Baris 1 (putih):**
- Kiri: Logo Central Petstore (gambar rumah biru + teks "Central Petstore" bold + subtitle "SOLUTION CENTRAL PETSHOP" kecil)
- Tengah: Search bar rounded, placeholder "Cari produk di Central Petstore...", icon search biru
- Kanan: Icon WA + "WhatsApp 0813 4251 3200" | Icon orang + "Akun Saya / Masuk / Daftar" | Icon keranjang + badge "0"

**Baris 2 (biru tua #0A2A8A, tinggi ~40px):**
- Text putih, font medium
- Menu: 🏠 Beranda | Petshop ▾ | Aquarium ▾ | Pancing ▾ | Promo | Blog & Tips | Tentang Kami | Kontak
- Active state: background sedikit lebih terang / underline putih

### HERO BANNER
- Background: gradient biru muda ke putih, ada paw print pattern tipis
- Gambar kanan: anjing golden retriever + kucing abu-abu + aquarium + joran + reel, disusun natural
- Teks kiri:
  - "Semua Kebutuhan" → hitam bold, besar
  - "Hewan, Aquarium" → biru (#0A2A8A) bold
  - "& Pancing" → oranye (#FFA726) bold
  - "Dalam Satu Tempat" → hitam bold
  - Subtext: abu-abu kecil
- Tombol: "🛍 Belanja Sekarang" biru | "💬 Chat WhatsApp" hijau (#25D366)
- Dot navigator bawah: 5 dots

### KATEGORI 3 CARD
- Background card: putih, shadow ringan, border radius 12px
- Setiap card 2 kolom: kiri list item dengan checkmark biru, kanan foto produk
- Header card: icon emoji + nama kategori bold biru tua
- Tombol "Lihat Semua" → outline biru, kecil, rounded

### PRODUK UNGGULAN
- Section header: "⭐ Produk Unggulan" kiri | "Lihat Semua Produk >" kanan (teks biru link)
- Card produk: foto putih bg, nama produk, deskripsi kecil abu, harga merah bold ("Rp 75.000")
- Tombol "🟢 Chat WA" → hijau penuh, lebar penuh, rounded
- Arrow navigasi kiri kanan (◀ ▶) di luar slider

### PROMO HARI INI
- 3 banner sejajar, tinggi sama
- Banner 1: background biru (#39A7FF), teks putih, "DISKON AQUARIUM / Up to 20%"
- Banner 2: background oranye (#FFA726), teks putih, "PAKET HEMAT PETSHOP / Mulai dari Rp 99.000"
- Banner 3: background biru muda, teks putih, "PERALATAN PANCING / Diskon Hingga 15%"
- Setiap banner ada foto produk di kanan + tombol "Belanja Sekarang" putih outline

### VIDEO + TESTIMONI (2 kolom)
**Kiri (Video Terbaru):**
- 5 thumbnail video grid, ada play button bulat di tengah
- Judul video di bawah thumbnail, kecil

**Kanan (Testimoni):**
- 3 card testimoni stack, bintang 5 kuning, nama + kota
- Card "Tentang Kami" mini di bawah testimoni

### BLOG & TIPS
- 5 card horizontal, foto besar atas, judul bawah
- "Lihat Semua Artikel >" link biru kanan

### FOOTER (biru tua #0A2A8A)
- 4 kolom: Logo+desc | INFORMASI | KATEGORI | BANTUAN | HUBUNGI KAMI
- Teks putih dan abu-abu muda
- Sosmed icons baris bawah (Instagram, TikTok, YouTube, Facebook)
- Copyright bar paling bawah, lebih gelap sedikit

### TYPOGRAPHY DETAIL
- Font: Plus Jakarta Sans (Google Fonts)
- Heading H1: 36-42px, Bold, #0A2A8A atau hitam
- Heading H2: 24px, Bold
- Body: 14-16px, #4B5563
- Price: 16px, Bold, #EF4444 (merah)
- Button: 14px, SemiBold

### SPACING
- Container max-width: 1280px, centered
- Section padding: py-12 md:py-16
- Card gap: gap-4 md:gap-6
- Border radius card: rounded-xl (12px)
- Shadow card: shadow-md
