'use client'

import Link from 'next/link'

const SUPABASE = 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets'

const promos = [
  {
    id: 1,
    badge: '🐟 AQUARIUM',
    title: 'DISKON AQUARIUM',
    subtitle: 'Up to 20%',
    desc: 'Semua Produk Aquarium',
    btn: 'Belanja Sekarang',
    href: '/aquarium',
    image: `${SUPABASE}/promo-aquarium.png`,
    // fallback gradient jika gambar gagal load
    fallbackBg: 'linear-gradient(135deg, #39A7FF, #0A2A8A)',
    tag: 'Terbatas!',
  },
  {
    id: 2,
    badge: '🐾 PETSHOP',
    title: 'PAKET HEMAT PETSHOP',
    subtitle: 'Mulai dari Rp 99.000',
    desc: 'Makanan, Grooming & Vitamin',
    btn: 'Lihat Paket',
    href: '/petshop',
    image: `${SUPABASE}/promo-petshop.png`,
    fallbackBg: 'linear-gradient(135deg, #FFA726, #F57C00)',
    tag: 'Best Seller!',
  },
  {
    id: 3,
    badge: '🎣 PANCING',
    title: 'PERALATAN PANCING',
    subtitle: 'Diskon Hingga 15%',
    desc: 'Peralatan Pancing Pilihan',
    btn: 'Belanja Sekarang',
    href: '/pancing',
    image: `${SUPABASE}/promo-pancing.png`,
    fallbackBg: 'linear-gradient(135deg, #00BCD4, #0288D1)',
    tag: 'Promo Spesial!',
  },
]

export default function PromoSection() {
  return (
    <section className="py-12 md:py-16" style={{ background: '#F5F7FA' }}>
      <div className="max-w-[1600px] mx-auto px-4">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: '#0A2A8A' }}>
            🔥 Promo Hari Ini
          </h2>
          <Link href="/promo" className="text-sm font-semibold hover:underline" style={{ color: '#39A7FF' }}>
            Lihat Semua Promo →
          </Link>
        </div>

        {/* 3 promo banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </div>
    </section>
  )
}

type PromoItem = typeof promos[number]

function PromoCard({ promo }: { promo: PromoItem }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ minHeight: 200 }}
    >
      {/* ── Full background image ── */}
      <img
        src={promo.image}
        alt={promo.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          const el = e.target as HTMLImageElement
          el.style.display = 'none'
          // show fallback gradient on parent
          const parent = el.parentElement as HTMLDivElement
          parent.style.background = promo.fallbackBg
        }}
      />

      {/* ── Dark overlay gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      {/* ── Content overlay ── */}
      <div className="relative z-10 p-5 flex flex-col justify-between" style={{ minHeight: 200 }}>

        {/* Top: badge + tag */}
        <div className="flex items-start justify-between mb-3">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(4px)' }}
          >
            {promo.badge}
          </span>
          <span
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
          >
            {promo.tag}
          </span>
        </div>

        {/* Middle: title + subtitle + desc */}
        <div className="flex-1">
          <h3 className="text-lg font-extrabold text-white leading-tight drop-shadow">
            {promo.title}
          </h3>
          <p
            className="font-extrabold mt-0.5 drop-shadow"
            style={{ fontSize: 22, color: '#FFF176' }}
          >
            {promo.subtitle}
          </p>
          <p className="text-white/75 text-xs mt-1 mb-4">{promo.desc}</p>
        </div>

        {/* Bottom: CTA button */}
        <Link
          href={promo.href}
          className="inline-block border-2 border-white text-white text-sm font-semibold px-5 py-2 rounded-full w-fit transition-colors hover:bg-white"
          style={{ color: 'white' }}
          onMouseOver={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.color = '#0A2A8A'
          }}
          onMouseOut={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.color = 'white'
          }}
        >
          {promo.btn}
        </Link>
      </div>
    </div>
  )
}
