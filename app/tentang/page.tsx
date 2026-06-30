import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Central Petstore — pusat kebutuhan hewan peliharaan, aquarium, dan hobi memancing terpercaya dan terlengkap di Manado.',
}

const whyUs = [
  { emoji: '🐾', text: 'Produk original dari berbagai merek terpercaya.' },
  {
    emoji: '🐶',
    text: 'Pilihan produk lengkap untuk anjing, kucing, ikan, burung, hamster, kelinci, dan hewan peliharaan lainnya.',
  },
  { emoji: '🐠', text: 'Spesialis perlengkapan aquarium dan ikan hias.' },
  { emoji: '🎣', text: 'Menyediakan perlengkapan memancing berkualitas.' },
  { emoji: '❤️', text: 'Tim yang siap membantu Anda memilih produk sesuai kebutuhan hewan kesayangan.' },
  { emoji: '🚚', text: 'Belanja mudah melalui toko maupun pemesanan online.' },
]

const misi = [
  'Menyediakan produk berkualitas dengan harga terbaik.',
  'Memberikan pelayanan yang ramah, cepat, dan profesional.',
  'Mengedukasi pelanggan mengenai perawatan hewan peliharaan yang baik.',
  'Terus menghadirkan inovasi dan pilihan produk terbaru sesuai kebutuhan pelanggan.',
]

export default function TentangPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 py-12 md:py-16">
      {/* Welcome */}
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#0A2A8A' }}>
          Selamat Datang di Central Petstore
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Di Central Petstore, kami percaya bahwa setiap hewan peliharaan adalah bagian dari keluarga. Karena
          itu, kami berkomitmen menghadirkan produk berkualitas, pelayanan yang ramah, dan solusi terbaik untuk
          membantu Anda merawat sahabat berbulu, bersirip, maupun bersayap dengan penuh kasih.
        </p>
      </div>

      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-12 md:mb-16 max-w-3xl mx-auto text-center">
        Kami menyediakan berbagai kebutuhan hewan peliharaan dalam satu tempat, mulai dari makanan, vitamin,
        suplemen, perlengkapan grooming, kandang, mainan, aksesori, hingga perlengkapan aquarium dan ikan hias.
        Selain itu, kami juga menyediakan berbagai produk untuk hobi memancing, sehingga menjadi destinasi
        lengkap bagi para pecinta hewan dan hobi air. Informasi publik Central Petstore juga menampilkan fokus
        pada kebutuhan anjing, kucing, burung, ikan, aquarium, perlengkapan pancing, serta layanan grooming.
      </p>

      {/* Mengapa Memilih Central Petstore */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-center" style={{ color: '#0A2A8A' }}>
          Mengapa Memilih Central Petstore?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {whyUs.map((item) => (
            <div key={item.text} className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4">
              <span className="text-xl shrink-0" aria-hidden="true">
                {item.emoji}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-16">
        <div
          className="rounded-2xl p-6 md:p-8 text-white"
          style={{ background: 'linear-gradient(135deg, #0A2A8A, #39A7FF)' }}
        >
          <h2 className="text-xl font-extrabold mb-3">Visi</h2>
          <p className="text-sm leading-relaxed text-white/90">
            Menjadi pusat kebutuhan hewan peliharaan, aquarium, dan hobi memancing yang terpercaya, lengkap,
            serta menjadi pilihan utama masyarakat Indonesia.
          </p>
        </div>

        <div className="rounded-2xl p-6 md:p-8 bg-white shadow-sm">
          <h2 className="text-xl font-extrabold mb-3" style={{ color: '#0A2A8A' }}>
            Misi
          </h2>
          <ul className="space-y-2.5">
            {misi.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: '#39A7FF' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Komitmen Kami */}
      <section className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-4" style={{ color: '#0A2A8A' }}>
          Komitmen Kami
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Bagi kami, kepuasan pelanggan bukan hanya tentang produk yang lengkap, tetapi juga pengalaman
          berbelanja yang menyenangkan. Kami terus berupaya menjadi mitra terpercaya bagi setiap pet lovers dan
          aquascape hobbyist, sehingga Anda dapat menemukan semua kebutuhan hewan kesayangan dalam satu tempat.
        </p>
      </section>

      {/* Tagline banner */}
      <div className="rounded-2xl p-6 md:p-8 text-center text-white" style={{ background: '#0A2A8A' }}>
        <p className="font-extrabold text-lg md:text-xl">Central Petstore</p>
        <p className="text-sm md:text-base text-white/80 mt-1">Everything Your Pets Need, All in One Place. 🐾</p>
      </div>
    </div>
  )
}
