'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase, formatRupiah, type Product } from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

const categoryLabels: Record<string, string> = {
  petshop: 'Petshop',
  aquarium: 'Aquarium',
  pancing: 'Pancing',
}

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await load()
    })()
  }, [])

  const toggleFeatured = async (product: Product) => {
    await supabase.from('products').update({ is_featured: !product.is_featured }).eq('id', product.id)
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, is_featured: !p.is_featured } : p)))
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    await supabase.from('products').delete().eq('id', deleteTarget.id)
    setDeleting(false)
    setDeleteTarget(null)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold" style={{ color: '#0A2A8A' }}>
          Produk Unggulan
        </h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#0A2A8A' }}
        >
          <Plus size={16} />
          Tambah Produk
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Memuat...</p>
      ) : (
        <DataTable headers={['Foto', 'Nama', 'Harga', 'Kategori', 'Featured', 'Aksi']} empty={products.length === 0}>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  )}
                </div>
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
              <td className="px-4 py-3 text-gray-500">{formatRupiah(product.price)}</td>
              <td className="px-4 py-3 text-gray-500">
                {categoryLabels[product.category || ''] || product.category}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => toggleFeatured(product)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: product.is_featured ? '#DCFCE7' : '#F3F4F6',
                    color: product.is_featured ? '#16A34A' : '#6B7280',
                  }}
                >
                  {product.is_featured ? 'Featured' : 'Tidak'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(product)}
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
        title="Hapus Produk"
        message={`Yakin ingin menghapus "${deleteTarget?.name}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
