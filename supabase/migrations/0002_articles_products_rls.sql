-- Hardening RLS untuk tabel yang sudah ada (articles, products), supaya
-- public hanya bisa baca, dan Admin CMS (user authenticated) bisa CRUD.
-- Aman dijalankan berkali-kali (idempotent).

alter table articles enable row level security;

drop policy if exists "Public can read articles" on articles;
create policy "Public can read articles" on articles
  for select using (true);

drop policy if exists "Authenticated can manage articles" on articles;
create policy "Authenticated can manage articles" on articles
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

alter table products enable row level security;

drop policy if exists "Public can read products" on products;
create policy "Public can read products" on products
  for select using (true);

drop policy if exists "Authenticated can manage products" on products;
create policy "Authenticated can manage products" on products
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
