'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'

type VideoFormProps = {
  id?: string
}

const platforms = [
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'instagram', label: 'Instagram' },
]

export default function VideoForm({ id }: VideoFormProps) {
  const router = useRouter()
  const isEdit = !!id
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [platform, setPlatform] = useState('tiktok')
  const [sortOrder, setSortOrder] = useState('0')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title)
          setVideoUrl(data.video_url || '')
          setThumbnailUrl(data.thumbnail_url || '')
          setPlatform(data.platform || 'tiktok')
          setSortOrder(String(data.sort_order ?? 0))
          setIsActive(data.is_active)
        }
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      title,
      video_url: videoUrl || null,
      thumbnail_url: thumbnailUrl || null,
      platform,
      sort_order: Number(sortOrder) || 0,
      is_active: isActive,
    }

    const { error: saveError } = isEdit
      ? await supabase.from('videos').update(payload).eq('id', id)
      : await supabase.from('videos').insert(payload)

    setSaving(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    router.push('/admin/videos')
  }

  if (loading) return <p className="text-sm text-gray-400">Memuat...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Video</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL Video</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://tiktok.com/@centralpetstore.id/video/..."
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <ImageUpload value={thumbnailUrl} onChange={setThumbnailUrl} label="Thumbnail" />

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {platforms.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Urutan Tampil</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-32 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm font-semibold text-gray-700">Aktif</span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
          style={{ background: '#0A2A8A' }}
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/videos')}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          Batalkan
        </button>
      </div>
    </form>
  )
}
