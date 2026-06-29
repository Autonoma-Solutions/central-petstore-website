Rapikan semua halaman admin agar responsive di HP, Tablet, dan PC.

Yang perlu difix:

1. LAYOUT ADMIN SECARA UMUM:
- Sidebar: di desktop tampil fixed kiri, di mobile jadi bottom navigation atau hamburger menu
- Content area: padding responsif (px-4 mobile, px-6 tablet, px-8 desktop)
- Header admin: sticky top, tampil rapi di semua ukuran

2. SEMUA FORM (articles, products, videos, testimonials, promos):
- Input fields: w-full di semua ukuran
- Label: di atas input (bukan inline) untuk mobile
- Grid 2 kolom hanya di tablet ke atas (md:grid-cols-2), mobile tetap 1 kolom
- Textarea: min-h-[120px], resize-y
- Tombol Simpan & Batalkan: full width di mobile, auto width di desktop
- ImageUpload: preview gambar responsive, tidak overflow

3. LIST/TABLE di setiap halaman admin:
- Desktop: tampil sebagai tabel biasa
- Mobile & tablet: tampil sebagai card list (bukan tabel horizontal yang kepotong)
- Setiap card berisi info penting + tombol aksi

4. DASHBOARD:
- Stats card: 2 kolom di mobile, 4 kolom di desktop
- Padding dan font size responsif

Gunakan Tailwind breakpoints: sm (640px), md (768px), lg (1024px)
Prioritaskan mobile-first approach.
