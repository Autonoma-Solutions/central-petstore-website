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
      <div className="max-w-[1600px] mx-auto px-4">
        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col relative"
            >
              {/* Card Header — icon dalam lingkaran biru + judul UPPERCASE */}
              <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: '#0A2A8A' }}
                >
                  <span className="text-lg leading-none">{cat.icon}</span>
                </div>
                <h3 className="font-extrabold text-xl uppercase leading-tight tracking-wide" style={{ color: '#0A2A8A' }}>
                  {cat.label}
                </h3>
              </div>

              {/* Card Body — list kiri, foto absolute bottom-right */}
              <div className="flex-1 pl-5 pr-56 pb-2">
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle
                        size={14}
                        className="shrink-0"
                        style={{ color: cat.checkColor }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer — Lihat Semua button */}
              <div className="px-5 pb-5 pt-3">
                <Link
                  href={cat.href}
                  className="inline-block px-5 py-2 rounded-full text-xs font-semibold border-2 transition-all duration-200 hover:bg-blue-800 hover:text-white"
                  style={{ borderColor: '#0A2A8A', color: '#0A2A8A' }}
                >
                  Lihat Semua
                </Link>
              </div>

              {/* Foto produk — absolute bottom-right menyentuh tepi card */}
              <img
                src={cat.photo}
                alt={cat.photoAlt}
                className="absolute bottom-0 right-0 w-full max-w-[280px] h-[220px] object-contain object-right-bottom"
                loading="lazy"
                onError={(e) => {
                  const el = e.target as HTMLImageElement
                  el.src = `https://placehold.co/200x260/${cat.color.replace('#', '')}/FFFFFF?text=${encodeURIComponent(cat.photoFallback)}`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
