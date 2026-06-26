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
    photo: 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/kategori-petshop.png',
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
    photo: 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/kategori-aquarium.png',
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
    photo: 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets/kategori-pancing.png',
    photoAlt: 'Peralatan Pancing',
    photoFallback: 'Pancing',
    checkColor: '#F57C00',
  },
]

export default function KategoriSection() {
  return (
    <section className="py-12 md:py-16" style={{ background: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* 3 Cards */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Header — icon kecil inline + judul UPPERCASE */}
              <div className="flex items-center gap-2 px-5 pt-5 pb-3">
                <span className="text-2xl leading-none">{cat.icon}</span>
                <h3 className="font-extrabold text-xl uppercase leading-tight tracking-wide" style={{ color: '#0A2A8A' }}>
                  {cat.label}
                </h3>
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

              {/* Card Footer — Lihat Semua button (outline kecil, tidak full width) */}
              <div className="px-5 pb-5">
                <Link
                  href={cat.href}
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                  style={{ borderColor: '#39A7FF', color: '#39A7FF' }}
                >
                  Lihat Semua
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
