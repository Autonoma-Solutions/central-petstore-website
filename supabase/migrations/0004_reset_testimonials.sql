-- Reset testimoni — hapus data dummy seed (Andi, Budi, Rudi) supaya kosong.
-- Testimoni asli akan diisi nanti oleh client lewat /admin/testimonials
-- (form tambah/edit/hapus sudah tersedia di sana).
delete from testimonials;
