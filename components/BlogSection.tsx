'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import { supabase, type Article } from '@/lib/supabase'

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
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        setArticles(data || [])
        setLoading(false)
      })
  }, [])

  if (!loading && articles.length === 0) return null

  return (
    <section className="py-12 md:py-16" style={{ background: '#F5F7FA' }}>
      <div className="max-w-[1600px] mx-auto px-4">
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
            const catStyle = categoryColors[article.category || 'umum'] || categoryColors.umum
            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={article.image_url || 'https://placehold.co/400x250/39A7FF/FFFFFF?text=Blog'}
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
