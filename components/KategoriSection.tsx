'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const categories = [
  {
    icon: '🐾',
    label: 'PETSHOP',
    color: '#0A2A8A',
    bgLight: '#EFF6FF',
    href: '/petshop',
    items: [
      'Makanan Anjing',
      'Makanan Kucing',
      'Shampoo & Grooming',
      'Vitamin & Suplemen',
      'Obat Kutu & Obat',
      'Aksesoris Hewan',
    ],
    imageEmoji: '🐶🐱',
    bgColor: 'from-blue-600 to-blue-800',
  },
  {
    icon: '🐟',
    label: 'AQUARIUM',
    color: '#0891B2',
    bgLight: '#ECFEFF',
    href: '/aquarium',
    items: [
      'Filter & Media Filter',
      'Pompa Air',
      'Lampu LED',
      'Aerator & Aksesoris',
      'Obat Ikan',
      'Pakan Ikan',
    ],
    imageEmoji: '🐠🐡',
    bgColor: 'from-cyan-500 to-blue-600',
  },
  {
    icon: '🎣',
    label: 'PANCING',
    color: '#FFA726',
    bgLight: '#FFF7ED',
    href: '/pancing',
    items: [
      'Joran',
      'Reel',
      'Senar',
      'Metal Jig & Lure',
      'Kail & Snap',
      'Aksesoris Pancing',
    ],
    imageEmoji: '🎣🌊',
    bgColor: 'from-orange-400 to-orange-600',
  },
]

export default function KategoriSection() {
  return (
    <section className="py-12 md:py-16" style={{ background: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: '#0A2A8A' }}>
            Kategori Utama
          </h2>
          <p className="text-gray-500 text-sm">Temukan semua kebutuhan hewan peliharaan & hobi Anda</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Card Header */}
              <div
                className={`bg-gradient-to-r ${cat.bgColor} p-5 flex items-center justify-between`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{cat.label}</h3>
                    <p className="text-white/70 text-xs">Produk Lengkap</p>
                  </div>
                </div>
                <div className="text-4xl opacity-30">{cat.imageEmoji}</div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <ul className="space-y-2 mb-5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle
                        size={16}
                        className="shrink-0"
                        style={{ color: '#39A7FF' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={cat.href}
                  className="block w-full text-center py-2.5 rounded-full text-sm font-semibold border-2 transition-all hover:text-white"
                  style={{
                    borderColor: cat.color,
                    color: cat.color,
                  }}
                  onMouseOver={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = cat.color
                    el.style.color = 'white'
                  }}
                  onMouseOut={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'transparent'
                    el.style.color = cat.color
                  }}
                >
                  Lihat Semua →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
