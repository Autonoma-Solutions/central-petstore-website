'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { supabase, type Testimonial } from '@/lib/supabase'

const APP_LOGO_ICON = '/app-logo-without-text.png'

export default function TestimoniSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setTestimonials(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-extrabold text-lg mb-1" style={{ color: '#0A2A8A' }}>
        💬 Testimoni Pelanggan
      </h3>

      {!loading && testimonials.length === 0 ? (
        <p className="text-sm text-gray-400">Belum ada testimoni.</p>
      ) : (
        testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
            {/* Stars */}
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-current" style={{ color: '#FFA726' }} />
              ))}
            </div>

            {/* Text */}
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">&quot;{t.content}&quot;</p>

            {/* Footer */}
            <div className="flex items-center gap-2">
              {t.avatar_url ? (
                <img
                  src={t.avatar_url}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: '#39A7FF' }}
                >
                  {t.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-bold text-sm text-gray-800">{t.name}</div>
                {t.location && <div className="text-xs text-gray-400">{t.location}</div>}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Mini About Card */}
      <div
        className="rounded-xl p-4 text-white"
        style={{ background: 'linear-gradient(135deg, #0A2A8A, #39A7FF)' }}
      >
        <h4 className="font-extrabold text-base mb-2 flex items-center gap-2">
          <img src={APP_LOGO_ICON} alt="" className="w-6 h-6 object-contain" /><span>Tentang Central Petstore</span>
        </h4>
        <p className="text-sm text-white/80 leading-relaxed mb-3">
          Toko petshop, aquarium, dan pancing terlengkap di Manado. Berdiri sejak 2010, kami melayani ribuan pelanggan setia dengan produk berkualitas dan harga terbaik.
        </p>
        <Link
          href="/tentang"
          className="inline-block text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full transition-colors"
        >
          Selengkapnya →
        </Link>
      </div>
    </div>
  )
}
