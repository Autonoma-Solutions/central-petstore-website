'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase, type Promo } from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

export default function PromosListPage() {
  const [promos, setPromos] = useState<Promo[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Promo | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('promos').select('*').order('sort_order', { ascending: true })
    setPromos(data || [])
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await load()
    })()
  }, [])

  const toggleActive = async (promo: Promo) => {
    await supabase.from('promos').update({ is_active: !promo.is_active }).eq('id', promo.id)
    setPromos((prev) => prev.map((p) => (p.id === promo.id ? { ...p, is_active: !p.is_active } : p)))
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    await supabase.from('promos').delete().eq('id', deleteTarget.id)
    setDeleting(false)
    setDeleteTarget(null)
    load()
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-extrabold" style={{ color: '#0A2A8A' }}>
          Promo
        </h1>
        <Link
          href="/admin/promos/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white w-full sm:w-auto"
          style={{ background: '#0A2A8A' }}
        >
          <Plus size={16} />
          Tambah Promo
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Memuat...</p>
      ) : (
        <DataTable
          headers={['Banner', 'URL Tujuan', 'Urutan', 'Aktif', 'Aksi']}
          items={promos}
          keyExtractor={(promo) => promo.id}
          empty={promos.length === 0}
          renderRow={(promo) => (
            <>
              <td className="px-4 py-3">
                <div className="w-20 h-12 rounded-lg bg-gray-100 overflow-hidden">
                  {promo.image_url && (
                    <img src={promo.image_url} alt="Promo" className="w-full h-full object-cover" />
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{promo.link_url}</td>
              <td className="px-4 py-3 text-gray-500">{promo.sort_order}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => toggleActive(promo)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: promo.is_active ? '#DCFCE7' : '#F3F4F6',
                    color: promo.is_active ? '#16A34A' : '#6B7280',
                  }}
                >
                  {promo.is_active ? 'Aktif' : 'Nonaktif'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/promos/${promo.id}/edit`}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(promo)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </>
          )}
          renderCard={(promo) => (
            <div className="flex gap-3">
              <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                {promo.image_url && (
                  <img src={promo.image_url} alt="Promo" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{promo.link_url}</p>
                <p className="text-xs text-gray-400 mt-0.5">Urutan: {promo.sort_order}</p>
                <button
                  onClick={() => toggleActive(promo)}
                  className="mt-2 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: promo.is_active ? '#DCFCE7' : '#F3F4F6',
                    color: promo.is_active ? '#16A34A' : '#6B7280',
                  }}
                >
                  {promo.is_active ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  href={`/admin/promos/${promo.id}/edit`}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(promo)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Promo"
        message="Yakin ingin menghapus promo ini?"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
