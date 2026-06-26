'use client'

import { Play, ExternalLink } from 'lucide-react'
import TestimoniSection from './TestimoniSection'

const videos = [
  {
    id: 1,
    title: 'Tips Merawat Anjing di Rumah',
    views: '12.5K views',
    emoji: '🐶',
    color: '#0A2A8A',
  },
  {
    id: 2,
    title: 'Setup Aquarium Cantik untuk Pemula',
    views: '8.3K views',
    emoji: '🐠',
    color: '#0891B2',
  },
  {
    id: 3,
    title: 'Tips Memancing Ikan Laut',
    views: '15.1K views',
    emoji: '🎣',
    color: '#FFA726',
  },
  {
    id: 4,
    title: 'Perawatan Kucing Agar Sehat & Bahagia',
    views: '9.7K views',
    emoji: '🐱',
    color: '#8B5CF6',
  },
  {
    id: 5,
    title: 'Unboxing Peralatan Pancing Baru 2024',
    views: '6.2K views',
    emoji: '📦',
    color: '#10B981',
  },
]

export default function VideoSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Video Terbaru */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold" style={{ color: '#0A2A8A' }}>
                📹 Video Terbaru
              </h2>
              <a
                href="https://tiktok.com/@centralpetstore.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold hover:underline"
                style={{ color: '#39A7FF' }}
              >
                @centralpetstore.id
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Video grid */}
            <div className="grid grid-cols-2 gap-3">
              {videos.map((video, i) => (
                <a
                  key={video.id}
                  href="https://tiktok.com/@centralpetstore.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow ${i === 0 ? 'col-span-2' : ''}`}
                >
                  {/* Thumbnail bg */}
                  <div
                    className={`${i === 0 ? 'h-40' : 'h-32'} flex items-center justify-center relative`}
                    style={{ background: `linear-gradient(135deg, ${video.color}22, ${video.color}44)` }}
                  >
                    {/* Emoji */}
                    <span className="text-5xl opacity-50">{video.emoji}</span>

                    {/* Play button */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(0,0,0,0.3)' }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: video.color }}
                      >
                        <Play size={20} className="text-white ml-1" />
                      </div>
                    </div>

                    {/* Views badge */}
                    <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded-full">
                      {video.views}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="bg-white p-2.5">
                    <p className="text-xs font-semibold text-gray-700 line-clamp-2 leading-tight">
                      {video.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* TikTok CTA */}
            <a
              href="https://tiktok.com/@centralpetstore.id"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 text-sm font-semibold transition-colors hover:text-white"
              style={{ borderColor: '#0A2A8A', color: '#0A2A8A' }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#0A2A8A'
                el.style.color = 'white'
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'transparent'
                el.style.color = '#0A2A8A'
              }}
            >
              Lihat Semua Video di TikTok
            </a>
          </div>

          {/* RIGHT: Testimoni + About */}
          <TestimoniSection />
        </div>
      </div>
    </section>
  )
}
