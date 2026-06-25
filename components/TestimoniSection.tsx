import Link from 'next/link'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Andi Saputra',
    city: 'Manado',
    avatar: '👨',
    rating: 5,
    text: 'Barang lengkap dan pelayanan cepat. Sangat recommended untuk semua kebutuhan hewan peliharaan!',
    product: 'Louise Pet Shampoo',
  },
  {
    id: 2,
    name: 'Budi Wicaksono',
    city: 'Manado',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Pompa aquarium awet dan harga bersahabat. Sudah langganan lebih dari 2 tahun, pasti balik lagi!',
    product: 'Sakkai Pump SP-103',
  },
  {
    id: 3,
    name: 'Rudi Halim',
    city: 'Manado',
    avatar: '🧔',
    rating: 5,
    text: 'Peralatan pancing lengkap dan kualitas terjamin. Metal jig seryoma sudah proven di laut Manado!',
    product: 'Metal Jig Seryoma 40g',
  },
]

export default function TestimoniSection() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-extrabold text-lg mb-1" style={{ color: '#0A2A8A' }}>
        💬 Testimoni Pelanggan
      </h3>

      {testimonials.map((t) => (
        <div
          key={t.id}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          {/* Stars */}
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-current"
                style={{ color: '#FFA726' }}
              />
            ))}
          </div>

          {/* Text */}
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">"{t.text}"</p>

          {/* Footer */}
          <div className="flex items-center gap-2">
            <div className="text-2xl">{t.avatar}</div>
            <div>
              <div className="font-bold text-sm text-gray-800">{t.name}</div>
              <div className="text-xs text-gray-400">{t.city} • Produk: {t.product}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Mini About Card */}
      <div
        className="rounded-xl p-4 text-white"
        style={{ background: 'linear-gradient(135deg, #0A2A8A, #39A7FF)' }}
      >
        <h4 className="font-extrabold text-base mb-2">🏪 Tentang Central Petstore</h4>
        <p className="text-sm text-white/80 leading-relaxed mb-3">
          Toko petshop, aquarium, dan pancing terlengkap di Manado. Berdiri sejak 2010, kami melayani ribuan pelanggan setia dengan produk berkualitas dan harga terbaik.
        </p>
        <Link
          href="/tentang"
          className="inline-block text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full transition-colors"
        >
          Selengkapnya →
        </Link>
      </div>
    </div>
  )
}
