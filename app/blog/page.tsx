'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import { supabase, type Article } from '@/lib/supabase'

const categories = [
  { value: 'all', label: 'Semua' },
  { value: 'petshop', label: 'Petshop' },
  { value: 'aquarium', label: 'Aquarium' },
  { value: 'pancing', label: 'Pancing' },
  { value: 'umum', label: 'Umum' },
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

export default function BlogListPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      let query = supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false })
      if (category !== 'all') {
        query = query.eq('category', category)
      }
      const { data } = await query
      setArticles(data || [])
      setLoading(false)
    })()
  }, [category])

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: '#0A2A8A' }}>
        📖 Blog & Tips
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Tips dan informasi seputar petshop, aquarium, dan pancing dari Central Petstore.
      </p>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto hide-scrollbar pb-1">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors"
            style={
              category === c.value
                ? { background: '#0A2A8A', color: 'white', borderColor: '#0A2A8A' }
                : { background: 'white', color: '#4B5563', borderColor: '#E5E7EB' }
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Memuat...</p>
      ) : articles.length === 0 ? (
        <p className="text-sm text-gray-400">Belum ada artikel di kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {articles.map((article) => {
            const catStyle = categoryColors[article.category || 'umum'] || categoryColors.umum
            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={article.image_url || 'https://placehold.co/400x250/39A7FF/FFFFFF?text=Blog'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://placehold.co/400x250/39A7FF/FFFFFF?text=Blog'
                    }}
                  />
                  <div
                    className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background: catStyle.bg, color: catStyle.text }}
                  >
                    <Tag size={10} />
                    {catStyle.label}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-sm text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 flex-1 mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={11} />
                    {formatDate(article.created_at)}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
