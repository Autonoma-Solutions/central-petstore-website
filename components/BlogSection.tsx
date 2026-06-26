'use client'

import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  image_url: string
  category: string
  created_at: string
}

const seedArticles: Article[] = [
  {
    id: '1',
    title: 'Cara Memilih Filter Aquarium yang Tepat untuk Pemula',
    slug: 'cara-memilih-filter-aquarium',
    excerpt: 'Filter adalah jantung dari aquarium. Pelajari jenis-jenis filter dan cara memilih yang sesuai dengan ukuran tangki Anda.',
    image_url: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=250&fit=crop&auto=format',
    category: 'aquarium',
    created_at: '2024-12-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Tips Mengatasi Kutu Anjing Secara Alami & Aman',
    slug: 'tips-mengatasi-kutu-anjing',
    excerpt: 'Kutu pada anjing bisa menjadi masalah serius. Berikut cara alami dan aman untuk mengatasinya tanpa bahan kimia berbahaya.',
    image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=250&fit=crop&auto=format',
    category: 'petshop',
    created_at: '2024-11-28T00:00:00Z',
  },
  {
    id: '3',
    title: 'Cara Memilih Senar Pancing yang Kuat & Awet',
    slug: 'cara-memilih-senar-pancing',
    excerpt: 'Senar pancing yang tepat menentukan keberhasilan memancing. Pelajari perbedaan monofilament, fluorocarbon, dan braided line.',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop&auto=format',
    category: 'pancing',
    created_at: '2024-11-25T00:00:00Z',
  },
  {
    id: '4',
    title: 'Perawatan Ikan Koi Agar Warna Lebih Cerah & Indah',
    slug: 'perawatan-ikan-koi-warna-cerah',
    excerpt: 'Koi yang warnanya cerah adalah kebanggaan pemilik aquarium. Tips nutrisi, kualitas air, dan paparan sinar matahari yang ideal.',
    image_url: 'https://images.unsplash.com/photo-1520302519878-9a2b77febaeb?w=400&h=250&fit=crop&auto=format',
    category: 'aquarium',
    created_at: '2024-11-20T00:00:00Z',
  },
  {
    id: '5',
    title: 'Perawatan Kucing Rumahan Agar Sehat & Bahagia',
    slug: 'perawatan-kucing-rumahan',
    excerpt: 'Kucing yang bahagia adalah kucing yang sehat. Panduan lengkap nutrisi, grooming, dan stimulasi mental untuk kucing peliharaan.',
    image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=250&fit=crop&auto=format',
    category: 'petshop',
    created_at: '2024-11-15T00:00:00Z',
  },
]

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  aquarium: { bg: '#ECFEFF', text: '#0891B2', label: 'Aquarium' },
  petshop: { bg: '#EFF6FF', text: '#0A2A8A', label: 'Petshop' },
  pancing: { bg: '#FFF7ED', text: '#F57C00', label: 'Pancing' },
  umum: { bg: '#F5F3FF', text: '#6D28D9', label: 'Umum' },
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}

export default function BlogSection() {
  const articles = seedArticles

  return (
    <section className="py-12 md:py-16" style={{ background: '#F5F7FA' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: '#0A2A8A' }}>
            📖 Blog & Tips
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold hover:underline"
            style={{ color: '#39A7FF' }}
          >
            Lihat Semua Artikel →
          </Link>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {articles.map((article) => {
            const catStyle = categoryColors[article.category] || categoryColors.umum
            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://placehold.co/400x250/39A7FF/FFFFFF?text=Blog`
                    }}
                  />
                  {/* Category overlay */}
                  <div
                    className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background: catStyle.bg, color: catStyle.text }}
                  >
                    <Tag size={10} />
                    {catStyle.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-sm text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 flex-1 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={11} />
                    {formatDate(article.created_at)}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 rounded-full text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: '#0A2A8A' }}
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  )
}
