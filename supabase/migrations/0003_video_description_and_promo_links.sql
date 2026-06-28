-- Tahap 2 — Jalankan file ini di Supabase Dashboard → SQL Editor.
-- Aman dijalankan berkali-kali (idempotent).

-- ============================================================
-- VIDEOS: tambah kolom description untuk halaman detail /video/[id]
-- ============================================================
alter table videos add column if not exists description text;

-- ============================================================
-- PROMOS: perbaiki link_url seed yang masih anchor placeholder
-- (#aquarium, #petshop, #pancing tidak mengarah ke mana-mana).
-- Hanya menimpa baris yang masih placeholder, tidak menyentuh
-- baris yang sudah diedit manual lewat Admin.
-- ============================================================
update promos
set link_url = 'https://wa.me/6281342513200?text=' || replace('Halo, saya tertarik dengan promo Diskon Aquarium', ' ', '%20')
where link_url = '#aquarium';

update promos
set link_url = 'https://wa.me/6281342513200?text=' || replace('Halo, saya tertarik dengan paket hemat Petshop', ' ', '%20')
where link_url = '#petshop';

update promos
set link_url = 'https://wa.me/6281342513200?text=' || replace('Halo, saya tertarik dengan promo Peralatan Pancing', ' ', '%20')
where link_url = '#pancing';
