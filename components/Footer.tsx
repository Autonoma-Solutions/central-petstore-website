import Link from 'next/link'
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

const ASSETS = 'https://qxxassyqepesnrydkfhq.supabase.co/storage/v1/object/public/assets'
const APP_LOGO = `${ASSETS}/app-logo.png`

const infoLinks = [
  { label: 'Tentang Kami', href: '/tentang' },
  { label: 'Blog & Tips', href: '/blog' },
  { label: 'Promo', href: '/promo' },
  { label: 'Karir', href: '/karir' },
  { label: 'Kebijakan Privasi', href: '/privasi' },
]

const kategoriLinks = [
  { label: '🐾 Petshop', href: '/petshop' },
  { label: '🐟 Aquarium', href: '/aquarium' },
  { label: '🎣 Pancing', href: '/pancing' },
  { label: '💊 Kesehatan Hewan', href: '/petshop#kesehatan' },
  { label: '🏮 Aksesoris', href: '/petshop#aksesoris' },
]

const bantuanLinks = [
  { label: 'Cara Pemesanan', href: '/bantuan/pemesanan' },
  { label: 'Pembayaran', href: '/bantuan/pembayaran' },
  { label: 'Pengiriman', href: '/bantuan/pengiriman' },
  { label: 'Retur & Refund', href: '/bantuan/retur' },
  { label: 'FAQ', href: '/bantuan/faq' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0A2A8A' }}>
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Logo & Deskripsi */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src={APP_LOGO} alt="Central Petstore" className="h-[67px] w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Toko petshop, aquarium, dan pancing terlengkap di Manado. Produk berkualitas, harga bersahabat, dan pelayanan terpercaya.
            </p>

            {/* Store Info */}
            <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: '#FFA726' }} />
                <div>
                  <div className="font-semibold text-white">Tk. Central Aquarium</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)' }}>Jl. Wolter Mongisidi 28, Malalayang 1 Timur, Manado</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: '#FFA726' }} />
                <div>
                  <div className="font-semibold text-white">Tk. Central Petstore</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)' }}>Jl. Martadinata 61B, Manado</div>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: 'https://instagram.com/centralpetstore.id', label: '📷', title: 'Instagram' },
                { href: 'https://tiktok.com/@centralpetstore.id', label: '🎵', title: 'TikTok' },
                { href: 'https://youtube.com/@centralpetstore', label: '▶', title: 'YouTube' },
                { href: 'https://facebook.com/centralpetstore', label: 'f', title: 'Facebook' },
              ].map((social) => (
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold transition-opacity hover:opacity-75"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Informasi */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Informasi</h4>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kategori */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Kategori</h4>
            <ul className="space-y-2">
              {kategoriLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Bantuan + Hubungi */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Bantuan</h4>
            <ul className="space-y-2 mb-6">
              {bantuanLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Hubungi Kami</h4>
            <div className="space-y-2">
              <a
                href="https://wa.me/6281342513200"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <MessageCircle size={15} style={{ color: '#25D366' }} />
                0813 4251 3200
              </a>
              <a
                href="tel:+6285288555557"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Phone size={15} style={{ color: '#39A7FF' }} />
                0852 8855 5557
              </a>
              <a
                href="mailto:centralpetstore.id@gmail.com"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Mail size={15} style={{ color: '#FFA726' }} />
                centralpetstore.id@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            © 2024 Central Petstore. All Rights Reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Built with ❤️ by{' '}
            <a
              href="https://autonoma.id"
              className="hover:text-white transition-colors"
              style={{ color: '#39A7FF' }}
            >
              Autonoma Teknologi Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
