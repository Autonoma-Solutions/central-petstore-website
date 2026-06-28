'use client'

import { useEffect, useState } from 'react'
import { supabase, type Promo } from '@/lib/supabase'

export default function PromoPage() {
  const [promos, setPromos] = useState<Promo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('promos')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setPromos(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-8" style={{ color: '#0A2A8A' }}>
        🔥 Promo Hari Ini
      </h1>

      {loading ? (
        <p className="text-sm text-gray-400">Memuat...</p>
      ) : promos.length === 0 ? (
        <p className="text-sm text-gray-400">Belum ada promo aktif saat ini.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {promos.map((promo) => (
            <a
              key={promo.id}
              href={promo.link_url}
              target={promo.link_url.startsWith('http') ? '_blank' : undefined}
              rel={promo.link_url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img src={promo.image_url} alt="Promo" className="w-full h-auto object-cover" loading="lazy" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
