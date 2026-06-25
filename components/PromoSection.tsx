'use client'

import Link from 'next/link'

const promos = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #39A7FF, #0A2A8A)',
    badge: '🐟 AQUARIUM',
    title: 'DISKON AQUARIUM',
    subtitle: 'Up to 20%',
    desc: 'Filter, pompa, lampu LED, dan semua kebutuhan aquarium',
    btn: 'Belanja Sekarang',
    href: '/aquarium',
    emoji: '🐠',
    tag: 'Terbatas!',
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, #FFA726, #F57C00)',
    badge: '🐾 PETSHOP',
    title: 'PAKET HEMAT',
    subtitle: 'Mulai dari Rp 99.000',
    desc: 'Makanan, shampoo, vitamin, dan aksesoris hewan peliharaan',
    btn: 'Lihat Paket',
    href: '/petshop',
    emoji: '🐶',
    tag: 'Best Seller!',
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, #00BCD4, #0288D1)',
    badge: '🎣 PANCING',
    title: 'PERALATAN PANCING',
    subtitle: 'Diskon Hingga 15%',
    desc: 'Joran, reel, senar, metal jig, dan perlengkapan memancing',
    btn: 'Belanja Sekarang',
    href: '/pancing',
    emoji: '🎣',
    tag: 'Promo Spesial!',
  },
]

export default function PromoSection() {
  return (
    <section className="py-12 md:py-16" style={{ background: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: '#0A2A8A' }}>
            🔥 Promo Hari Ini
          </h2>
          <Link
            href="/promo"
            className="text-sm font-semibold hover:underline"
            style={{ color: '#39A7FF' }}
          >
            Lihat Semua Promo →
          </Link>
        </div>

        {/* Promo banners grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              style={{ background: promo.bg }}
            >
              {/* Tag badge */}
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                {promo.tag}
              </div>

              <div className="p-6">
                {/* Badge */}
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {promo.badge}
                </span>

                {/* Content */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-extrabold text-white leading-tight">
                      {promo.title}
                    </h3>
                    <p className="text-2xl font-extrabold text-white/90 mt-1">{promo.subtitle}</p>
                    <p className="text-white/70 text-xs mt-2 mb-5 max-w-48">{promo.desc}</p>

                    <Link
                      href={promo.href}
                      className="inline-block border-2 border-white text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-white transition-colors"
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

                  {/* Big emoji */}
                  <div className="text-6xl ml-4 opacity-80 select-none">{promo.emoji}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
