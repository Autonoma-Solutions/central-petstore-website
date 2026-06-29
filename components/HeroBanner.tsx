'use client'

import { ShoppingBag, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { buildWaLink } from '@/lib/supabase'

const SUPABASE = 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets'

const heroImage = {
  src: `${SUPABASE}/hero-slide-1.png`,
  alt: 'Central Petstore – Semua Kebutuhan Hewan, Aquarium & Pancing',
}

export default function HeroBanner() {
  return (
    <section className="w-full py-3" style={{ background: '#F5F7FA' }}>
      <div className="max-w-[1600px] mx-auto px-4">

        {/* ── Banner image container — tinggi mengikuti aspect ratio gambar ── */}
        <div className="relative overflow-hidden rounded-2xl w-full">

          {/* Image — natural aspect ratio, no fixed height */}
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="w-full h-auto block"
            loading="eager"
            onError={(e) => {
              const el = e.target as HTMLImageElement
              el.style.minHeight = '280px'
              el.style.background = 'linear-gradient(135deg, #EEF5FF 0%, #D6EAFF 100%)'
              el.src = ''
            }}
          />

          {/* ── CTA Buttons — sejajar dengan teks banner, posisi % ikut skala gambar di semua ukuran layar ── */}
          <div className="absolute left-[6%] bottom-[16%] z-10 flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="#produk-unggulan"
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#39A7FF' }}
            >
              <ShoppingBag size={16} />
              Belanja Sekarang
            </Link>
            <a
              href={buildWaLink('Halo, saya tertarik dengan produk di Central Petstore')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={16} />
              Chat WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
