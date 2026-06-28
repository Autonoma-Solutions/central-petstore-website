'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, formatRupiah } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'

type ProductFormProps = {
  id?: string
}

const categories = [
  { value: 'petshop', label: 'Petshop' },
  { value: 'aquarium', label: 'Aquarium' },
  { value: 'pancing', label: 'Pancing' },
]

export default function ProductForm({ id }: ProductFormProps) {
  const router = useRouter()
  const isEdit = !!id
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('petshop')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [waMessage, setWaMessage] = useState('')
  const [waMessageTouched, setWaMessageTouched] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)

  useEffect(() => {
    if (!id) return
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setName(data.name)
          setPrice(String(data.price))
          setCategory(data.category || 'petshop')
          setDescription(data.description || '')
          setImageUrl(data.image_url || '')
          setWaMessage(data.wa_message || '')
          setIsFeatured(data.is_featured)
          setWaMessageTouched(true)
        }
        setLoading(false)
      })
  }, [id])

  const handleNameChange = (value: string) => {
    setName(value)
    if (!waMessageTouched) setWaMessage(value ? `Halo, saya tertarik dengan ${value}` : '')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      name,
      price: Number(price) || 0,
      category,
      description,
      image_url: imageUrl || null,
      wa_message: waMessage || `Halo, saya tertarik dengan ${name}`,
      is_featured: isFeatured,
    }

    const { error: saveError } = isEdit
      ? await supabase.from('products').update(payload).eq('id', id)
      : await supabase.from('products').insert(payload)

    setSaving(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    router.push('/admin/products')
  }

  if (loading) return <p className="text-sm text-gray-400">Memuat...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Produk</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Harga (Rp)</label>
        <input
          type="number"
          required
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {price !== '' && <p className="text-xs text-gray-400 mt-1">{formatRupiah(Number(price) || 0)}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Singkat</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <ImageUpload value={imageUrl} onChange={setImageUrl} label="Gambar Produk" />

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pesan WhatsApp</label>
        <input
          type="text"
          value={waMessage}
          onChange={(e) => {
            setWaMessage(e.target.value)
            setWaMessageTouched(true)
          }}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm font-semibold text-gray-700">Tampilkan di Homepage (Featured)</span>
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
          onClick={() => router.push('/admin/products')}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          Batalkan
        </button>
      </div>
    </form>
  )
}
