import type { Metadata } from 'next'
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react'
import KontakForm from './KontakForm'

export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi Central Petstore — toko petshop, aquarium, dan pancing di Manado. Kami siap membantu melalui WhatsApp, email, dan kunjungan langsung ke toko.',
}

const toko = [
  {
    name: 'Tk. Central Aquarium',
    address: 'Jl. Wolter Mongisidi 28, Malalayang 1 Timur, Manado',
    phone: '0852 8855 5557',
    tel: '+6285288555557',
    wa: 'https://wa.me/6285288555557',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Wolter+Mongisidi+28+Malalayang+1+Timur+Manado',
  },
  {
    name: 'Tk. Central Petstore',
    address: 'Jl. Martadinata 61B, Manado',
    phone: '0813 4251 3200',
    tel: '+6281342513200',
    wa: 'https://wa.me/6281342513200',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Martadinata+61B+Manado',
  },
]

const socialMedia = [
  { href: 'https://instagram.com/centralpetstore.id', icon: 'instagram', title: 'Instagram' },
  { href: 'https://tiktok.com/@centralpetstore.id', icon: 'tiktok', title: 'TikTok' },
  { href: 'https://youtube.com/@centralpetstore', icon: 'youtube', title: 'YouTube' },
  { href: 'https://facebook.com/centralpetstore', icon: 'facebook', title: 'Facebook' },
]

export default function KontakPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3" style={{ color: '#0A2A8A' }}>
          Hubungi Kami
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          Ada pertanyaan, pesanan, atau butuh informasi produk? Kami siap membantu Anda kapan saja melalui berbagai saluran komunikasi.
        </p>
      </div>

      {/* Quick contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 md:mb-16">
        <a
          href="https://wa.me/6281342513200"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 p-6 rounded-2xl text-white hover:opacity-90 transition-opacity shadow-md"
          style={{ background: '#25D366' }}
        >
          <MessageCircle size={36} />
          <div className="text-center">
            <p className="font-bold text-base">WhatsApp</p>
            <p className="text-sm opacity-90 mt-0.5">0813 4251 3200</p>
            <p className="text-xs opacity-75 mt-1">Balas cepat setiap hari</p>
          </div>
        </a>

        <a
          href="mailto:centralpetstore.id@gmail.com"
          className="flex flex-col items-center gap-3 p-6 rounded-2xl text-white hover:opacity-90 transition-opacity shadow-md"
          style={{ background: '#39A7FF' }}
        >
          <Mail size={36} />
          <div className="text-center">
            <p className="font-bold text-base">Email</p>
            <p className="text-sm opacity-90 mt-0.5 break-all">centralpetstore.id@gmail.com</p>
            <p className="text-xs opacity-75 mt-1">Respon dalam 1×24 jam</p>
          </div>
        </a>

        <a
          href="https://instagram.com/centralpetstore.id"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 p-6 rounded-2xl text-white hover:opacity-90 transition-opacity shadow-md"
          style={{ background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)' }}
        >
          <img
            src="https://cdn.simpleicons.org/instagram/ffffff"
            alt="Instagram"
            className="w-9 h-9"
          />
          <div className="text-center">
            <p className="font-bold text-base">Instagram</p>
            <p className="text-sm opacity-90 mt-0.5">@centralpetstore.id</p>
            <p className="text-xs opacity-75 mt-1">DM kami di Instagram</p>
          </div>
        </a>
      </div>

      {/* Store locations */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
          📍 Lokasi Toko
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {toko.map((store) => (
            <div
              key={store.name}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col gap-4"
            >
              {/* Store name & address */}
              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#EFF6FF' }}
                >
                  <MapPin size={22} style={{ color: '#0A2A8A' }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{store.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{store.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0" style={{ color: '#39A7FF' }} />
                <a
                  href={`tel:${store.tel}`}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: '#39A7FF' }}
                >
                  {store.phone}
                </a>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-auto">
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all hover:bg-[#0A2A8A] hover:text-white"
                  style={{ borderColor: '#0A2A8A', color: '#0A2A8A' }}
                >
                  <MapPin size={14} />
                  Lihat di Maps
                </a>
                <a
                  href={store.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: '#25D366' }}
                >
                  <MessageCircle size={14} />
                  Chat WA
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-2" style={{ color: '#0A2A8A' }}>
          💬 Kirim Pesan
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Isi form di bawah ini dan pesan Anda akan langsung terbuka di WhatsApp — tanpa perlu install aplikasi tambahan.
        </p>
        <KontakForm />
      </section>

      {/* Social media banner */}
      <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: '#0A2A8A' }}>
        <p className="font-extrabold text-white text-lg mb-1">Ikuti Kami di Media Sosial</p>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Dapatkan info produk terbaru, promo menarik, dan tips perawatan hewan setiap hari.
        </p>
        <div className="flex items-center justify-center gap-4">
          {socialMedia.map((s) => (
            <a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.title}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <img
                src={`https://cdn.simpleicons.org/${s.icon}/ffffff`}
                alt={s.title}
                className="w-5 h-5"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
