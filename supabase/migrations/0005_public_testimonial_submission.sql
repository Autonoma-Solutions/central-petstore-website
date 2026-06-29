-- Izinkan pengunjung publik (anon) mengirim testimoni sendiri lewat homepage.
-- Testimoni yang masuk otomatis is_active = false (status pending), jadi
-- tidak langsung tampil di homepage — harus disetujui dulu oleh admin lewat
-- toggle "Aktif" di /admin/testimonials (tidak perlu fitur admin baru).
-- Publik TIDAK bisa update/delete testimoni (tetap hanya admin/authenticated).
create policy "Public can submit pending testimonials" on testimonials
  for insert
  to anon
  with check (is_active = false and rating >= 1 and rating <= 5);
