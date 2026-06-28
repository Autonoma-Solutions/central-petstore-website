'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'

type TestimonialFormProps = {
  id?: string
}

export default function TestimonialForm({ id }: TestimonialFormProps) {
  const router = useRouter()
  const isEdit = !!id
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [sortOrder, setSortOrder] = useState('0')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setName(data.name)
          setLocation(data.location || '')
          setRating(data.rating || 5)
          setContent(data.content)
          setAvatarUrl(data.avatar_url || '')
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
      name,
      location: location || null,
      rating,
      content,
      avatar_url: avatarUrl || null,
      sort_order: Number(sortOrder) || 0,
      is_active: isActive,
    }

    const { error: saveError } = isEdit
      ? await supabase.from('testimonials').update(payload).eq('id', id)
      : await supabase.from('testimonials').insert(payload)

    setSaving(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    router.push('/admin/testimonials')
  }

  if (loading) return <p className="text-sm text-gray-400">Memuat...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lokasi</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Jakarta"
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className="p-0.5">
              <Star
                size={24}
                className={star <= rating ? 'fill-current' : ''}
                style={{ color: star <= rating ? '#FFA726' : '#E5E7EB' }}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Isi Testimoni</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <ImageUpload value={avatarUrl} onChange={setAvatarUrl} label="Foto Avatar (opsional)" />

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
          onClick={() => router.push('/admin/testimonials')}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          Batalkan
        </button>
      </div>
    </form>
  )
}
