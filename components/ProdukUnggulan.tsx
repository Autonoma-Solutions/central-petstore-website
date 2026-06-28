'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { supabase, formatRupiah, buildWaLink, type Product } from '@/lib/supabase'

const categoryEmoji: Record<string, string> = {
  petshop: '🐾',
  aquarium: '🐟',
  pancing: '🎣',
}

export default function ProdukUnggulan() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProducts(data || [])
        setLoading(false)
      })
  }, [])

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  if (!loading && products.length === 0) return null

  return (
    <section id="produk-unggulan" className="py-12 md:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: '#0A2A8A' }}>
            ⭐ Produk Unggulan
          </h2>
          <Link
            href="/produk"
            className="text-sm font-semibold hover:underline"
            style={{ color: '#39A7FF' }}
          >
            Lihat Semua Produk →
          </Link>
        </div>

        {/* Slider wrapper */}
        <div className="relative">
          {/* Arrow left */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <ChevronLeft size={20} style={{ color: '#0A2A8A' }} />
          </button>

          {/* Products scroll */}
          <div ref={scrollRef} className="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-52 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                {/* Product image */}
                <div className="relative h-44 bg-gray-50 overflow-hidden">
                  {/* Category badge */}
                  <span
                    className="absolute top-2 left-2 z-10 text-xs px-2 py-0.5 rounded-full text-white font-semibold"
                    style={{ background: '#0A2A8A' }}
                  >
                    {categoryEmoji[product.category || ''] || '🛍'}
                  </span>
                  <img
                    src={product.image_url || `https://placehold.co/300x300/39A7FF/FFFFFF?text=${encodeURIComponent(product.name)}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://placehold.co/300x300/39A7FF/FFFFFF?text=${encodeURIComponent(product.name)}`
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-base font-extrabold mb-3" style={{ color: '#EF4444' }}>
                    {formatRupiah(product.price)}
                  </p>

                  {/* WA button */}
                  <a
                    href={buildWaLink(product.wa_message || `Halo, saya tertarik dengan ${product.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-full text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    style={{ background: '#25D366' }}
                  >
                    <MessageCircle size={14} />
                    Chat WA
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow right */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <ChevronRight size={20} style={{ color: '#0A2A8A' }} />
          </button>
        </div>
      </div>
    </section>
  )
}
