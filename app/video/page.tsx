'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { supabase, type Video } from '@/lib/supabase'

const ASSETS = 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets'
const TIKTOK_ICON = `${ASSETS}/tiktok-icon-free-png.webp`

export default function VideoListPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('videos')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setVideos(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2 flex items-center gap-2" style={{ color: '#0A2A8A' }}>
        <img src={TIKTOK_ICON} alt="" className="w-8 h-8 object-contain rounded-full" /><span>Video Terbaru</span>
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Tips dan konten seputar petshop, aquarium, dan pancing dari Central Petstore.
      </p>

      {loading ? (
        <p className="text-sm text-gray-400">Memuat...</p>
      ) : videos.length === 0 ? (
        <p className="text-sm text-gray-400">Belum ada video.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/video/${video.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-40 relative bg-gray-100">
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
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#0A2A8A' }}>
                    <Play size={20} className="text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded-full capitalize">
                  {video.platform}
                </div>
              </div>
              <div className="bg-white p-2.5">
                <p className="text-xs font-semibold text-gray-700 line-clamp-2 leading-tight">{video.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
