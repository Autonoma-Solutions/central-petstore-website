'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const categories = [
  {
    icon: '🐾',
    label: 'PETSHOP',
    subtitle: 'Kebutuhan Hewan Peliharaan',
    color: '#0A2A8A',
    href: '/petshop',
    items: [
      'Makanan Anjing',
      'Makanan Kucing',
      'Shampoo & Grooming',
      'Vitamin & Suplemen',
      'Obat Kutu & Obat',
      'Aksesoris Hewan',
    ],
    photo: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=240&h=280&fit=crop&auto=format',
    photoAlt: 'Anjing dan Kucing',
    photoFallback: 'Petshop',
    checkColor: '#39A7FF',
  },
  {
    icon: '🐟',
    label: 'AQUARIUM',
    subtitle: 'Peralatan & Perlengkapan',
    color: '#0891B2',
    href: '/aquarium',
    items: [
      'Filter & Media Filter',
      'Pompa Air',
      'Lampu LED',
      'Aerator & Aksesoris',
      'Obat Ikan',
      'Pakan Ikan',
    ],
    photo: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=240&h=280&fit=crop&auto=format',
    photoAlt: 'Aquarium Ikan Hias',
    photoFallback: 'Aquarium',
    checkColor: '#0891B2',
  },
  {
    icon: '🎣',
    label: 'PANCING',
    subtitle: 'Peralatan Memancing Pilihan',
    color: '#F57C00',
    href: '/pancing',
    items: [
      'Joran',
      'Reel',
      'Senar',
      'Metal Jig & Lure',
      'Kail & Snap',
      'Aksesoris Pancing',
    ],
    photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=240&h=280&fit=crop&auto=format',
    photoAlt: 'Peralatan Pancing',
    photoFallback: 'Pancing',
    checkColor: '#F57C00',
  },
]

export default function KategoriSection() {
  return (
    <section className="py-12 md:py-16" style={{ background: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1.5" style={{ color: '#0A2A8A' }}>
            Kategori Utama
          </h2>
          <p className="text-gray-400 text-sm">Temukan semua kebutuhan hewan peliharaan & hobi Anda</p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Header — white background, blue icon circle + title */}
              <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-100">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
                  style={{ background: cat.color }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight" style={{ color: '#0A2A8A' }}>
                    {cat.label}
                  </h3>
                  <p className="text-xs text-gray-400">{cat.subtitle}</p>
                </div>
              </div>

              {/* Card Body — 2 column: list kiri + foto kanan */}
              <div className="flex flex-1 p-4 gap-3">
                {/* Left: item list */}
                <ul className="flex-1 space-y-1.5 min-w-0">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle
                        size={14}
                        className="shrink-0"
                        style={{ color: cat.checkColor }}
                      />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Right: product photo */}
                <div className="shrink-0 w-28 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={cat.photo}
                    alt={cat.photoAlt}
                    className="w-full h-full object-cover"
                    style={{ minHeight: 140 }}
                    loading="lazy"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.src = `https://placehold.co/200x260/${cat.color.replace('#', '')}/FFFFFF?text=${encodeURIComponent(cat.photoFallback)}`
                    }}
                  />
                </div>
              </div>

              {/* Card Footer — Lihat Semua button */}
              <div className="px-4 pb-4">
                <Link
                  href={cat.href}
                  className="block w-full text-center py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 hover:text-white"
                  style={{ borderColor: cat.color, color: cat.color }}
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
