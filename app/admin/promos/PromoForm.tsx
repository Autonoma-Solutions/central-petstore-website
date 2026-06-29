'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'

type PromoFormProps = {
  id?: string
}

export default function PromoForm({ id }: PromoFormProps) {
  const router = useRouter()
  const isEdit = !!id
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [sortOrder, setSortOrder] = useState('0')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase
      .from('promos')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setImageUrl(data.image_url)
          setLinkUrl(data.link_url)
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
      image_url: imageUrl,
      link_url: linkUrl,
      sort_order: Number(sortOrder) || 0,
      is_active: isActive,
    }

    const { error: saveError } = isEdit
      ? await supabase.from('promos').update(payload).eq('id', id)
      : await supabase.from('promos').insert(payload)

    setSaving(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    router.push('/admin/promos')
  }

  if (loading) return <p className="text-sm text-gray-400">Memuat...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl shadow-sm p-4 sm:p-6 space-y-5">
      <ImageUpload value={imageUrl} onChange={setImageUrl} label="Gambar Banner" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL Tujuan</label>
          <input
            type="text"
            required
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://wa.me/6281342513200?text=Promo+Aquarium"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Urutan Tampil</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
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

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
          style={{ background: '#0A2A8A' }}
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/promos')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          Batalkan
        </button>
      </div>
    </form>
  )
}
