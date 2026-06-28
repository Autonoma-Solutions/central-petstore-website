'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { supabase, type Video } from '@/lib/supabase'

const platformLabels: Record<string, string> = {
  tiktok: 'TikTok',
  youtube: 'YouTube',
  instagram: 'Instagram',
}

export default function VideoDetail({ id }: { id: string }) {
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          setMissing(true)
        } else {
          setVideo(data)
        }
        setLoading(false)
      })
  }, [id])

  if (missing) notFound()

  if (loading || !video) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <p className="text-sm text-gray-400">Memuat...</p>
      </div>
    )
  }

  const platformLabel = platformLabels[video.platform] || video.platform

  return (
    <article className="max-w-2xl mx-auto px-4 py-12 md:py-16">
      <Link
        href="/video"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 hover:underline"
        style={{ color: '#39A7FF' }}
      >
        <ArrowLeft size={14} />
        Kembali ke Video
      </Link>

      <div className="rounded-2xl overflow-hidden mb-6 bg-gray-100">
        <img
          src={video.thumbnail_url || 'https://placehold.co/800x450/39A7FF/FFFFFF?text=Video'}
          alt={video.title}
          className="w-full h-auto object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://placehold.co/800x450/39A7FF/FFFFFF?text=Video'
          }}
        />
      </div>

      <div
        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 capitalize"
        style={{ background: '#EFF6FF', color: '#0A2A8A' }}
      >
        {platformLabel}
      </div>

      <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3" style={{ color: '#0A2A8A' }}>
        {video.title}
      </h1>

      {video.description && (
        <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line mb-8">
          {video.description}
        </p>
      )}

      {video.video_url && video.video_url !== '#' && (
        <a
          href={video.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: '#0A2A8A' }}
        >
          Tonton di {platformLabel}
          <ExternalLink size={14} />
        </a>
      )}

      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link
          href="/video"
          className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold hover:underline"
          style={{ color: '#39A7FF' }}
        >
          ← Lihat Video Lainnya
        </Link>
      </div>
    </article>
  )
}
