'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase, type Video } from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

const platformLabels: Record<string, string> = {
  tiktok: 'TikTok',
  youtube: 'YouTube',
  instagram: 'Instagram',
}

export default function VideosListPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Video | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('videos').select('*').order('sort_order', { ascending: true })
    setVideos(data || [])
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await load()
    })()
  }, [])

  const toggleActive = async (video: Video) => {
    await supabase.from('videos').update({ is_active: !video.is_active }).eq('id', video.id)
    setVideos((prev) => prev.map((v) => (v.id === video.id ? { ...v, is_active: !v.is_active } : v)))
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    await supabase.from('videos').delete().eq('id', deleteTarget.id)
    setDeleting(false)
    setDeleteTarget(null)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold" style={{ color: '#0A2A8A' }}>
          Video Terbaru
        </h1>
        <Link
          href="/admin/videos/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#0A2A8A' }}
        >
          <Plus size={16} />
          Tambah Video
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Memuat...</p>
      ) : (
        <DataTable headers={['Thumbnail', 'Judul', 'Platform', 'Aktif', 'Aksi']} empty={videos.length === 0}>
          {videos.map((video) => (
            <tr key={video.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden">
                  {video.thumbnail_url && (
                    <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                  )}
                </div>
              </td>
              <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{video.title}</td>
              <td className="px-4 py-3 text-gray-500">{platformLabels[video.platform] || video.platform}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => toggleActive(video)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: video.is_active ? '#DCFCE7' : '#F3F4F6',
                    color: video.is_active ? '#16A34A' : '#6B7280',
                  }}
                >
                  {video.is_active ? 'Aktif' : 'Nonaktif'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/videos/${video.id}/edit`}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(video)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Video"
        message={`Yakin ingin menghapus "${deleteTarget?.title}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
