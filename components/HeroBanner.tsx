'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const SUPABASE = 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets'

type Slide = {
  id: number
  bgImage: string
  // imageOnly: teks & visual sudah baked-in ke gambar — tidak perlu HTML overlay
  imageOnly: true
} | {
  id: number
  bgImage: string
  imageOnly: false
  badge: string
  lines: { text: string; color: string }[]
  subtext: string
}

const slides: Slide[] = [
  {
    id: 1,
    bgImage: `${SUPABASE}/hero-slide-1.png`,
    imageOnly: true,
  },
  {
    id: 2,
    bgImage: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1400&h=560&fit=crop&auto=format',
    imageOnly: false,
    badge: '🐟 Aquarium Specialist',
    lines: [
      { text: 'Koleksi Aquarium', color: '#ffffff' },
      { text: 'Terlengkap & Berkualitas', color: '#FFA726' },
      { text: 'Harga Terbaik', color: '#ffffff' },
    ],
    subtext: 'Filter, pompa, lampu LED, aerator, obat ikan — semua lengkap.',
  },
  {
    id: 3,
    bgImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1400&h=560&fit=crop&auto=format',
    imageOnly: false,
    badge: '🎣 Fishing Store Terlengkap',
    lines: [
      { text: 'Peralatan Pancing', color: '#ffffff' },
      { text: 'Lengkap & Berkualitas', color: '#FFA726' },
      { text: 'Di Manado', color: '#ffffff' },
    ],
    subtext: 'Joran, reel, senar, metal jig, dan berbagai aksesoris pancing pilihan.',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goTo = (i: number) => {
    setCurrent(i)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }
  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden w-full" style={{ height: 420, maxHeight: 420 }}>

      {/* ── Background image ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slide.bgImage}
            alt={slide.imageOnly ? 'Central Petstore Hero Banner' : (slide as { badge: string }).badge}
            className="w-full h-full object-cover"
            style={{ height: '100%', display: 'block' }}
            loading="eager"
            onError={(e) => {
              const el = e.target as HTMLImageElement
              el.style.display = 'none'
              el.parentElement!.style.background = 'linear-gradient(135deg, #EEF5FF, #ffffff)'
            }}
          />

          {/* Dark overlay untuk slides dengan teks overlay */}
          {!slide.imageOnly && (
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.1) 100%)' }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Content layer ── */}
      <div className="relative z-10" style={{ height: 420 }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ paddingTop: 48, paddingBottom: 80 }}>

          {/* Teks overlay hanya untuk slide NON imageOnly */}
          {!slide.imageOnly && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${slide.id}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45 }}
                className="max-w-lg"
              >
                {'badge' in slide && (
                  <div
                    className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(4px)' }}
                  >
                    {slide.badge}
                  </div>
                )}

                {'lines' in slide && (
                  <h1 className="font-extrabold leading-tight mb-3 drop-shadow-lg"
                    style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
                    {slide.lines.map((line, i) => (
                      <span key={i} style={{ color: line.color, display: 'block' }}>{line.text}</span>
                    ))}
                  </h1>
                )}

                {'subtext' in slide && (
                  <p className="text-sm text-white/80 mb-6 drop-shadow">{slide.subtext}</p>
                )}

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/petshop"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold shadow-lg hover:opacity-90 transition-opacity text-sm"
                    style={{ background: '#39A7FF' }}
                  >
                    <ShoppingBag size={16} />
                    Belanja Sekarang
                  </a>
                  <a
                    href="https://wa.me/6281342513200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold shadow-lg hover:opacity-90 transition-opacity text-sm"
                    style={{ background: '#25D366' }}
                  >
                    <MessageCircle size={16} />
                    Chat WhatsApp
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ── CTA buttons untuk slide imageOnly (posisi bottom-left) ── */}
        {slide.imageOnly && (
          <div className="absolute bottom-12 left-6 md:left-10 flex flex-wrap gap-3">
            <a
              href="/petshop"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold shadow-xl hover:opacity-90 transition-opacity text-sm"
              style={{ background: '#39A7FF' }}
            >
              <ShoppingBag size={16} />
              Belanja Sekarang
            </a>
            <a
              href="https://wa.me/6281342513200"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold shadow-xl hover:opacity-90 transition-opacity text-sm"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={16} />
              Chat WhatsApp
            </a>
          </div>
        )}

        {/* ── Arrow prev/next ── */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft size={18} style={{ color: '#0A2A8A' }} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight size={18} style={{ color: '#0A2A8A' }} />
        </button>

        {/* ── Dots ── */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: current === i ? 22 : 8,
                height: 8,
                background: current === i ? '#ffffff' : 'rgba(255,255,255,0.45)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
