'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Play, ExternalLink } from 'lucide-react'
import { supabase, type Video } from '@/lib/supabase'
import TestimoniSection from './TestimoniSection'

const ASSETS = 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets'
const TIKTOK_ICON = `${ASSETS}/tiktok-icon-free-png.webp`

export default function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('videos')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(5)
      .then(({ data }) => {
        setVideos(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Video Terbaru */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-2" style={{ color: '#0A2A8A' }}>
                <img src={TIKTOK_ICON} alt="" className="w-6 h-6 object-contain rounded-full" /><span>Video Terbaru</span>
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

            {!loading && videos.length === 0 ? (
              <p className="text-sm text-gray-400">Belum ada video.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {videos.map((video, i) => (
                  <Link
                    key={video.id}
                    href={`/video/${video.id}`}
                    className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow ${i === 0 ? 'col-span-2' : ''}`}
                  >
                    {/* Thumbnail */}
                    <div
                      className={`${i === 0 ? 'h-40' : 'h-32'} relative bg-gray-100`}
                    >
                      <img
                        src={video.thumbnail_url || 'https://placehold.co/300x300/39A7FF/FFFFFF?text=Video'}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'https://placehold.co/300x300/39A7FF/FFFFFF?text=Video'
                        }}
                      />

                      {/* Play button */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'rgba(0,0,0,0.3)' }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: '#0A2A8A' }}
                        >
                          <Play size={20} className="text-white ml-1" />
                        </div>
                      </div>

                      {/* Platform badge */}
                      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded-full capitalize">
                        {video.platform}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="bg-white p-2.5">
                      <p className="text-xs font-semibold text-gray-700 line-clamp-2 leading-tight">
                        {video.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Lihat Semua Video CTA */}
            <Link
              href="/video"
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
              Lihat Semua Video
            </Link>
          </div>

          {/* RIGHT: Testimoni + About */}
          <TestimoniSection />
        </div>
      </div>
    </section>
  )
}
