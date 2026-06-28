'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase, type Article } from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

const categoryLabels: Record<string, string> = {
  petshop: 'Petshop',
  aquarium: 'Aquarium',
  pancing: 'Pancing',
  umum: 'Umum',
}

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
    setArticles(data || [])
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await load()
    })()
  }, [])

  const togglePublished = async (article: Article) => {
    await supabase.from('articles').update({ published: !article.published }).eq('id', article.id)
    setArticles((prev) => prev.map((a) => (a.id === article.id ? { ...a, published: !a.published } : a)))
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    await supabase.from('articles').delete().eq('id', deleteTarget.id)
    setDeleting(false)
    setDeleteTarget(null)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold" style={{ color: '#0A2A8A' }}>
          Artikel / Blog
        </h1>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#0A2A8A' }}
        >
          <Plus size={16} />
          Tambah Artikel Baru
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Memuat...</p>
      ) : (
        <DataTable headers={['Judul', 'Kategori', 'Status', 'Tanggal', 'Aksi']} empty={articles.length === 0}>
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{article.title}</td>
              <td className="px-4 py-3 text-gray-500">
                {categoryLabels[article.category || 'umum'] || article.category}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => togglePublished(article)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: article.published ? '#DCFCE7' : '#F3F4F6',
                    color: article.published ? '#16A34A' : '#6B7280',
                  }}
                >
                  {article.published ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(article.created_at))}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(article)}
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
        title="Hapus Artikel"
        message={`Yakin ingin menghapus "${deleteTarget?.title}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
