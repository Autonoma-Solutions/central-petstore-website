'use client'

import { useState, FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { buildWaLink } from '@/lib/supabase'

export default function KontakForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = name.trim()
      ? `Halo, saya ${name.trim()}. ${message.trim()}`
      : message.trim()
    window.open(buildWaLink(text), '_blank')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Nama <span className="text-gray-400 font-normal">(opsional)</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Budi Santoso"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pesan</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Tulis pertanyaan, pesanan, atau informasi yang Anda butuhkan..."
            className="w-full min-h-[120px] resize-y px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        style={{ background: '#25D366' }}
      >
        <MessageCircle size={16} />
        Kirim via WhatsApp
      </button>
    </form>
  )
}
