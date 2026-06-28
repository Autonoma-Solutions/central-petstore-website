'use client'

import { useEffect, useState } from 'react'
import { Package, Newspaper, Video as VideoIcon, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Stats = {
  products: number
  articles: number
  videos: number
  testimonials: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const load = async () => {
      const [products, articles, videos, testimonials] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }).eq('published', true),
        supabase.from('videos').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_active', true),
      ])
      setStats({
        products: products.count || 0,
        articles: articles.count || 0,
        videos: videos.count || 0,
        testimonials: testimonials.count || 0,
      })
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Produk', value: stats?.products, icon: Package, color: '#0A2A8A' },
    { label: 'Artikel Published', value: stats?.articles, icon: Newspaper, color: '#39A7FF' },
    { label: 'Video Aktif', value: stats?.videos, icon: VideoIcon, color: '#FFA726' },
    { label: 'Testimoni Aktif', value: stats?.testimonials, icon: Star, color: '#10B981' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-xl shadow-sm p-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${card.color}1A` }}
              >
                <Icon size={20} style={{ color: card.color }} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">
                {card.value === undefined ? '—' : card.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
