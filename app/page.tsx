import HeroBanner from '@/components/HeroBanner'
import KategoriSection from '@/components/KategoriSection'
import ProdukUnggulan from '@/components/ProdukUnggulan'
import PromoSection from '@/components/PromoSection'
import VideoSection from '@/components/VideoSection'
import BlogSection from '@/components/BlogSection'

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Kategori Utama */}
      <KategoriSection />

      {/* 3. Produk Unggulan */}
      <ProdukUnggulan />

      {/* 4. Promo Hari Ini */}
      <PromoSection />

      {/* 5. Video + Testimoni */}
      <VideoSection />

      {/* 6. Blog & Tips */}
      <BlogSection />
    </>
  )
}
