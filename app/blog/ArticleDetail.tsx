'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
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

export default function ArticleDetail({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          setMissing(true)
        } else {
          setArticle(data)
        }
        setLoading(false)
      })
  }, [slug])

  if (missing) notFound()

  if (loading || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-sm text-gray-400">Memuat...</p>
      </div>
    )
  }

  const catStyle = categoryColors[article.category || 'umum'] || categoryColors.umum

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 hover:underline"
        style={{ color: '#39A7FF' }}
      >
        <ArrowLeft size={14} />
        Kembali ke Blog
      </Link>

      <div
        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
        style={{ background: catStyle.bg, color: catStyle.text }}
      >
        <Tag size={11} />
        {catStyle.label}
      </div>

      <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3" style={{ color: '#0A2A8A' }}>
        {article.title}
      </h1>

      <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <Calendar size={14} />
        {formatDate(article.created_at)}
      </div>

      {article.image_url && (
        <div className="rounded-2xl overflow-hidden mb-8 bg-gray-100">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-auto object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://placehold.co/800x450/39A7FF/FFFFFF?text=Blog'
            }}
          />
        </div>
      )}

      <div className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
        {article.content || article.excerpt}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link
          href="/blog"
          className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: '#0A2A8A' }}
        >
          ← Lihat Artikel Lainnya
        </Link>
      </div>
    </article>
  )
}
