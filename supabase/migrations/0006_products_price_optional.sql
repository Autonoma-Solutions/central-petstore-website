-- Jalankan file ini di Supabase Dashboard → SQL Editor.
-- Aman dijalankan berkali-kali (idempotent).

-- ============================================================
-- PRODUCTS: harga jadi opsional — admin bisa kosongkan harga
-- untuk produk yang harganya "Hubungi Kami" / belum ditentukan.
-- ============================================================
alter table products alter column price drop not null;
