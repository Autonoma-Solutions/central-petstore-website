'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, slugify } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'

type ArticleFormProps = {
  id?: string
}

const categories = [
  { value: 'petshop', label: 'Petshop' },
  { value: 'aquarium', label: 'Aquarium' },
  { value: 'pancing', label: 'Pancing' },
  { value: 'umum', label: 'Umum' },
]

export default function ArticleForm({ id }: ArticleFormProps) {
  const router = useRouter()
  const isEdit = !!id
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('umum')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [published, setPublished] = useState(false)

  useEffect(() => {
    if (!id) return
    supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title)
          setSlug(data.slug)
          setCategory(data.category || 'umum')
          setExcerpt(data.excerpt || '')
          setContent(data.content || '')
          setImageUrl(data.image_url || '')
          setPublished(data.published)
          setSlugTouched(true)
        }
        setLoading(false)
      })
  }, [id])

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      title,
      slug: slug || slugify(title),
      category,
      excerpt: excerpt.slice(0, 200),
      content,
      image_url: imageUrl || null,
      published,
    }

    const { error: saveError } = isEdit
      ? await supabase.from('articles').update(payload).eq('id', id)
      : await supabase.from('articles').insert(payload)

    setSaving(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    router.push('/admin/articles')
  }

  if (loading) return <p className="text-sm text-gray-400">Memuat...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug</label>
        <input
          type="text"
          required
          value={slug}
          onChange={(e) => {
            setSlug(slugify(e.target.value))
            setSlugTouched(true)
          }}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
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
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Excerpt <span className="text-gray-400 font-normal">({excerpt.length}/200)</span>
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value.slice(0, 200))}
          rows={2}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Konten</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <ImageUpload value={imageUrl} onChange={setImageUrl} label="Gambar Artikel" />

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm font-semibold text-gray-700">Published</span>
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
          onClick={() => router.push('/admin/articles')}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          Batalkan
        </button>
      </div>
    </form>
  )
}
