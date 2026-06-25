'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'

type SlideImage = {
  src: string
  alt: string
  style: React.CSSProperties
  className: string
}

type Slide = {
  id: number
  badge: string
  lines: { text: string; color: string }[]
  subtext: string
  images: SlideImage[]
  bgColor: string
}

const slides: Slide[] = [
  {
    id: 1,
    badge: '🐾 Petshop · Aquarium · Pancing',
    lines: [
      { text: 'Semua Kebutuhan', color: '#111827' },
      { text: 'Hewan, Aquarium', color: '#0A2A8A' },
      { text: '& Pancing', color: '#FFA726' },
      { text: 'Dalam Satu Tempat', color: '#111827' },
    ],
    subtext: 'Produk berkualitas, harga bersahabat, dan pelayanan terpercaya di Manado.',
    bgColor: '#EEF5FF',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=380&h=380&fit=crop&auto=format',
        alt: 'Anjing Golden Retriever',
        className: 'rounded-2xl border-4 border-white shadow-2xl',
        style: { position: 'absolute', width: 200, height: 200, bottom: 24, right: 60, zIndex: 20 },
      },
      {
        src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=280&h=280&fit=crop&auto=format',
        alt: 'Kucing',
        className: 'rounded-2xl border-4 border-white shadow-xl',
        style: { position: 'absolute', width: 150, height: 150, top: 10, left: 20, zIndex: 30 },
      },
      {
        src: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=340&h=200&fit=crop&auto=format',
        alt: 'Aquarium',
        className: 'rounded-2xl shadow-lg',
        style: { position: 'absolute', width: 190, height: 120, bottom: 0, left: 0, zIndex: 10 },
      },
      {
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=220&h=160&fit=crop&auto=format',
        alt: 'Pancing',
        className: 'rounded-2xl border-4 border-white shadow-lg',
        style: { position: 'absolute', width: 140, height: 100, top: 20, right: 10, zIndex: 25 },
      },
    ],
  },
  {
    id: 2,
    badge: '🐟 Aquarium Specialist',
    lines: [
      { text: 'Koleksi Aquarium', color: '#111827' },
      { text: 'Terlengkap & Berkualitas', color: '#0A2A8A' },
      { text: 'Di Manado', color: '#0891B2' },
      { text: 'Harga Terbaik', color: '#111827' },
    ],
    subtext: 'Filter, pompa, lampu LED, aerator, obat ikan — semua lengkap dengan harga bersahabat.',
    bgColor: '#E6F4FF',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=420&h=320&fit=crop&auto=format',
        alt: 'Aquarium Planted Tank',
        className: 'rounded-2xl shadow-2xl border-4 border-white',
        style: { position: 'absolute', width: 260, height: 190, top: 20, right: 20, zIndex: 20 },
      },
      {
        src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=280&h=200&fit=crop&auto=format',
        alt: 'Ikan Tropis',
        className: 'rounded-2xl shadow-xl border-4 border-white',
        style: { position: 'absolute', width: 170, height: 130, bottom: 10, left: 10, zIndex: 25 },
      },
    ],
  },
  {
    id: 3,
    badge: '🎣 Fishing Store Terlengkap',
    lines: [
      { text: 'Peralatan Pancing', color: '#111827' },
      { text: 'Lengkap & Berkualitas', color: '#0A2A8A' },
      { text: 'Untuk Para', color: '#FFA726' },
      { text: 'Pecinta Mancing', color: '#111827' },
    ],
    subtext: 'Joran, reel, senar, metal jig, dan berbagai aksesoris pancing pilihan terbaik.',
    bgColor: '#FFF3E0',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=380&h=280&fit=crop&auto=format',
        alt: 'Fishing Reel',
        className: 'rounded-2xl shadow-2xl border-4 border-white',
        style: { position: 'absolute', width: 230, height: 170, top: 15, right: 15, zIndex: 20 },
      },
      {
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=280&h=200&fit=crop&auto=format',
        alt: 'Metal Jig Lure',
        className: 'rounded-2xl shadow-xl border-4 border-white',
        style: { position: 'absolute', width: 180, height: 130, bottom: 10, left: 20, zIndex: 25 },
      },
    ],
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

  const goTo = (index: number) => {
    setCurrent(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  const slide = slides[current]

  return (
    <section
      className="relative overflow-hidden transition-colors duration-700"
      style={{ background: `linear-gradient(135deg, ${slide.bgColor} 0%, #ffffff 100%)` }}
    >
      {/* Subtle paw pattern — very light */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[
          { top: '8%', left: '5%', size: 28, rotate: -20, opacity: 0.06 },
          { top: '70%', left: '3%', size: 22, rotate: 30, opacity: 0.05 },
          { top: '20%', left: '45%', size: 18, rotate: 15, opacity: 0.04 },
          { top: '80%', left: '55%', size: 24, rotate: -10, opacity: 0.05 },
          { top: '5%', left: '80%', size: 20, rotate: 45, opacity: 0.04 },
          { top: '60%', left: '90%', size: 26, rotate: -30, opacity: 0.05 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute"
            style={{ top: p.top, left: p.left, fontSize: p.size, transform: `rotate(${p.rotate}deg)`, opacity: p.opacity }}
          >
            🐾
          </span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center min-h-[400px]">

          {/* ── LEFT: Text content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.id}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative flex flex-col justify-center"
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 w-fit"
                style={{ background: '#0A2A8A', color: '#fff' }}
              >
                {slide.badge}
              </div>

              {/* Multi-line headline */}
              <h1 className="font-extrabold leading-tight mb-3" style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>
                {slide.lines.map((line, i) => (
                  <span key={i} style={{ color: line.color, display: 'block' }}>
                    {line.text}
                  </span>
                ))}
              </h1>

              <p className="text-sm md:text-base mb-6 max-w-sm" style={{ color: '#6B7280' }}>
                {slide.subtext}
              </p>

              {/* CTA Buttons */}
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

              {/* Arrows + Dots — aligned left below buttons */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={prev}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <ChevronLeft size={16} style={{ color: '#0A2A8A' }} />
                </button>

                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: current === i ? 22 : 8,
                        height: 8,
                        background: current === i ? '#0A2A8A' : '#CBD5E1',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <ChevronRight size={16} style={{ color: '#0A2A8A' }} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── RIGHT: Photo collage ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`imgs-${slide.id}`}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="hidden md:flex justify-center items-center"
            >
              <div className="relative w-full" style={{ height: 340 }}>
                {slide.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className={`object-cover ${img.className}`}
                    style={img.style}
                    loading="eager"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.src = `https://placehold.co/300x300/39A7FF/FFFFFF?text=${encodeURIComponent(img.alt)}`
                    }}
                  />
                ))}

                {/* Floating badge — top right */}
                <motion.div
                  className="absolute top-0 right-0 bg-white rounded-xl shadow-lg px-3 py-2 text-xs font-bold z-40"
                  style={{ color: '#0A2A8A' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ⭐ Produk Terlengkap
                </motion.div>

                {/* Floating badge — bottom */}
                <motion.div
                  className="absolute bottom-0 right-4 bg-white rounded-xl shadow-lg px-3 py-2 text-xs font-bold z-40"
                  style={{ color: '#25D366' }}
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                >
                  💚 Kualitas Terjamin
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
