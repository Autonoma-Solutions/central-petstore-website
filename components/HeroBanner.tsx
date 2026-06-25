'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    badge: '🐾 Petshop & Grooming',
    heading1: 'Semua Kebutuhan',
    heading2: 'Hewan, Aquarium',
    heading3: '& Pancing',
    heading4: 'Dalam Satu Tempat',
    subtext: 'Produk berkualitas, harga bersahabat, dan pelayanan terpercaya di Manado.',
    emoji: '🐕',
    bg: 'from-blue-50 via-sky-50 to-white',
    animals: ['🐶', '🐱', '🦮'],
  },
  {
    id: 2,
    badge: '🐟 Aquarium Specialist',
    heading1: 'Lengkapi Aquarium',
    heading2: 'Impianmu Dengan',
    heading3: 'Peralatan',
    heading4: 'Terbaik & Terlengkap',
    subtext: 'Filter, pompa, lampu LED, pakan ikan — semua tersedia dengan harga bersahabat.',
    emoji: '🐠',
    bg: 'from-cyan-50 via-blue-50 to-white',
    animals: ['🐟', '🐠', '🐡'],
  },
  {
    id: 3,
    badge: '🎣 Fishing Store',
    heading1: 'Peralatan Pancing',
    heading2: 'Lengkap & Berkualitas',
    heading3: 'Untuk Para',
    heading4: 'Pecinta Mancing',
    subtext: 'Joran, reel, senar, metal jig, dan berbagai aksesoris pancing pilihan.',
    emoji: '🎣',
    bg: 'from-orange-50 via-amber-50 to-white',
    animals: ['🎣', '🐟', '🌊'],
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4500)
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
      className={`relative overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700`}
    >
      {/* Paw print pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-4xl"
            style={{
              top: `${(i * 137.5) % 100}%`,
              left: `${(i * 71.3) % 100}%`,
              transform: `rotate(${(i * 42) % 360}deg)`,
              fontSize: `${24 + (i % 3) * 12}px`,
            }}
          >
            🐾
          </span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[420px]">
          {/* Text side */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Badge */}
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                style={{ background: '#0A2A8A', color: '#fff' }}
              >
                {slide.badge}
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">
                <span className="text-gray-900">{slide.heading1}</span>
                <br />
                <span style={{ color: '#0A2A8A' }}>{slide.heading2}</span>
                <br />
                <span style={{ color: '#FFA726' }}>{slide.heading3}</span>
                <br />
                <span className="text-gray-900">{slide.heading4}</span>
              </h1>

              <p className="text-gray-500 mt-3 mb-6 text-sm md:text-base max-w-md">
                {slide.subtext}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="/petshop"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:opacity-90 transition-opacity text-sm"
                  style={{ background: '#39A7FF' }}
                >
                  <ShoppingBag size={18} />
                  Belanja Sekarang
                </a>
                <a
                  href="https://wa.me/6281342513200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:opacity-90 transition-opacity text-sm"
                  style={{ background: '#25D366' }}
                >
                  <MessageCircle size={18} />
                  Chat WhatsApp
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Visual side */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-visual'}
              initial={{ opacity: 0, scale: 0.85, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex justify-center items-center"
            >
              <div
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(57,167,255,0.15) 0%, rgba(57,167,255,0.05) 60%, transparent 100%)',
                  boxShadow: '0 0 60px rgba(57,167,255,0.2)',
                }}
              >
                {/* Center big emoji */}
                <div className="text-9xl md:text-[10rem] select-none drop-shadow-2xl">
                  {slide.emoji}
                </div>

                {/* Orbiting emojis */}
                {slide.animals.map((animal, i) => {
                  const angle = (i * 120 * Math.PI) / 180
                  const radius = 130
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius
                  return (
                    <motion.div
                      key={i}
                      className="absolute text-3xl select-none"
                      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
                    >
                      {animal}
                    </motion.div>
                  )
                })}

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-3 py-2 text-xs font-bold"
                  style={{ color: '#0A2A8A' }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ⭐ Produk Terlengkap
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-3 py-2 text-xs font-bold"
                  style={{ color: '#25D366' }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                >
                  💚 Garansi Kualitas
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots navigator + arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-75"
            style={{ background: '#0A2A8A' }}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: current === i ? '24px' : '10px',
                  height: '10px',
                  background: current === i ? '#0A2A8A' : '#CBD5E1',
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-75"
            style={{ background: '#0A2A8A' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
