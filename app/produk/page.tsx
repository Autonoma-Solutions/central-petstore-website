'use client'

import { Suspense, useEffect, useState, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X, MessageCircle } from 'lucide-react'
import { supabase, formatRupiah, buildWaLink, type Product } from '@/lib/supabase'

const categories = [
  { value: 'all', label: 'Semua' },
  { value: 'petshop', label: 'Petshop' },
  { value: 'aquarium', label: 'Aquarium' },
  { value: 'pancing', label: 'Pancing' },
]

const categoryEmoji: Record<string, string> = {
  petshop: '🐾',
  aquarium: '🐟',
  pancing: '🎣',
}

function ProdukList() {
  const searchParams = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const requestedQ = searchParams.get('q') || ''
  const initialCategory = categories.some((c) => c.value === requestedCategory) ? requestedCategory! : 'all'

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(initialCategory)
  const [searchInput, setSearchInput] = useState(requestedQ)
  const [activeSearch, setActiveSearch] = useState(requestedQ)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      let query = supabase.from('products').select('id, name, description, price, image_url, category, wa_message, is_featured, created_at').order('created_at', { ascending: false })
      if (category !== 'all') {
        query = query.eq('category', category)
      }
      if (activeSearch.trim()) {
        query = query.ilike('name', `%${activeSearch.trim()}%`)
      }
      const { data } = await query
      setProducts(data || [])
      setLoading(false)
    })()
  }, [category, activeSearch])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    setActiveSearch(searchInput)
  }

  const clearSearch = () => {
    setSearchInput('')
    setActiveSearch('')
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: '#0A2A8A' }}>
        🛍 Semua Produk
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Produk petshop, aquarium, dan pancing dari Central Petstore.
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="relative mb-4 max-w-md">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Cari nama produk..."
          className="w-full pl-4 pr-20 py-2.5 rounded-full border-2 text-sm outline-none transition-all"
          style={{ borderColor: '#39A7FF' }}
        />
        {searchInput && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: '#39A7FF' }}
        >
          <Search size={18} />
        </button>
      </form>

      {/* Active search label */}
      {activeSearch && (
        <p className="text-sm text-gray-500 mb-4">
          Hasil pencarian:{' '}
          <span className="font-semibold text-gray-800">"{activeSearch}"</span>
          <button onClick={clearSearch} className="ml-2 text-xs underline" style={{ color: '#EF4444' }}>
            Hapus
          </button>
        </p>
      )}

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
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm text-gray-400">
            {activeSearch
              ? `Produk "${activeSearch}" tidak ditemukan.`
              : 'Belum ada produk di kategori ini.'}
          </p>
          {activeSearch && (
            <button onClick={clearSearch} className="mt-3 text-sm font-semibold" style={{ color: '#39A7FF' }}>
              Tampilkan semua produk
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Product image */}
              <div className="relative h-44 bg-gray-50 overflow-hidden">
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
      )}
    </div>
  )
}

export default function ProdukListPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-16">
          <p className="text-sm text-gray-400">Memuat...</p>
        </div>
      }
    >
      <ProdukList />
    </Suspense>
  )
}
