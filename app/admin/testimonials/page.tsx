'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import { supabase, type Testimonial } from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

export default function TestimonialsListPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('testimonials').select('*').order('sort_order', { ascending: true })
    setTestimonials(data || [])
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await load()
    })()
  }, [])

  const toggleActive = async (testimonial: Testimonial) => {
    await supabase.from('testimonials').update({ is_active: !testimonial.is_active }).eq('id', testimonial.id)
    setTestimonials((prev) =>
      prev.map((t) => (t.id === testimonial.id ? { ...t, is_active: !t.is_active } : t))
    )
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    await supabase.from('testimonials').delete().eq('id', deleteTarget.id)
    setDeleting(false)
    setDeleteTarget(null)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold" style={{ color: '#0A2A8A' }}>
          Testimoni
        </h1>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#0A2A8A' }}
        >
          <Plus size={16} />
          Tambah Testimoni
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Memuat...</p>
      ) : (
        <DataTable headers={['Nama', 'Lokasi', 'Rating', 'Aktif', 'Aksi']} empty={testimonials.length === 0}>
          {testimonials.map((testimonial) => (
            <tr key={testimonial.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">{testimonial.name}</td>
              <td className="px-4 py-3 text-gray-500">{testimonial.location || '-'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-current" style={{ color: '#FFA726' }} />
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => toggleActive(testimonial)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: testimonial.is_active ? '#DCFCE7' : '#F3F4F6',
                    color: testimonial.is_active ? '#16A34A' : '#6B7280',
                  }}
                >
                  {testimonial.is_active ? 'Aktif' : 'Nonaktif'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}/edit`}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(testimonial)}
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
        title="Hapus Testimoni"
        message={`Yakin ingin menghapus testimoni "${deleteTarget?.name}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
