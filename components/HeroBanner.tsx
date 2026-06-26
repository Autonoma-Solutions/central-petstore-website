'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SUPABASE = 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets'

const slides = [
  {
    id: 1,
    src: `${SUPABASE}/hero-slide-1.png`,
    alt: 'Central Petstore – Semua Kebutuhan Hewan, Aquarium & Pancing',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1400&h=380&fit=crop&auto=format',
    alt: 'Koleksi Aquarium Terlengkap',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1400&h=380&fit=crop&auto=format',
    alt: 'Peralatan Pancing Pilihan',
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

  return (
    <section className="w-full py-3" style={{ background: '#F5F7FA' }}>
      <div className="max-w-[1600px] mx-auto px-4">

        {/* ── Banner image container ── */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ height: 380 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[current].id}
              src={slides[current].src}
              alt={slides[current].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.style.background = 'linear-gradient(135deg, #EEF5FF 0%, #D6EAFF 100%)'
                el.src = ''
              }}
            />
          </AnimatePresence>

          {/* Arrow prev */}
          <button
            onClick={prev}
            aria-label="Slide sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <ChevronLeft size={16} className="text-gray-700" />
          </button>

          {/* Arrow next */}
          <button
            onClick={next}
            aria-label="Slide berikutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <ChevronRight size={16} className="text-gray-700" />
          </button>
        </div>

        {/* ── Dots (di luar gambar, di bawah) ── */}
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: current === i ? 20 : 6,
                height: 6,
                background: current === i ? '#39A7FF' : '#CBD5E1',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
