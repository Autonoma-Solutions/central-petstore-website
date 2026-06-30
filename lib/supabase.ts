import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Article = {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  image_url: string | null
  category: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  name: string
  price: number | null
  image_url: string | null
  category: string | null
  description: string | null
  is_featured: boolean
  wa_message: string | null
  created_at: string
}

export type Video = {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  video_url: string | null
  platform: 'tiktok' | 'youtube' | 'instagram'
  sort_order: number
  is_active: boolean
  created_at: string
}

export type Testimonial = {
  id: string
  name: string
  location: string | null
  avatar_url: string | null
  rating: number
  content: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export type Promo = {
  id: string
  image_url: string
  link_url: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '6281342513200'

export const STORAGE_BUCKET = 'assets'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function formatRupiah(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return 'Hubungi Kami'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function buildWaLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
