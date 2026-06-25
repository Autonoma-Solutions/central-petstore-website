import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Central Petstore — Semua Kebutuhan Hewan, Aquarium & Pancing di Manado',
    template: '%s | Central Petstore',
  },
  description:
    'Toko petshop, aquarium, dan pancing terlengkap di Manado. Produk berkualitas, harga bersahabat, pelayanan terpercaya. Kunjungi kami di Jl. Martadinata 61B atau hubungi WA 0813 4251 3200.',
  keywords: [
    'petshop manado',
    'aquarium manado',
    'pancing manado',
    'central petstore',
    'toko hewan manado',
    'peralatan pancing manado',
    'makanan anjing manado',
    'makanan kucing manado',
  ],
  openGraph: {
    title: 'Central Petstore — Semua Kebutuhan Hewan, Aquarium & Pancing',
    description: 'Toko petshop, aquarium, dan pancing terlengkap di Manado.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Central Petstore',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="antialiased" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
