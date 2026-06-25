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
  price: number
  image_url: string | null
  category: string | null
  description: string | null
  is_featured: boolean
  wa_message: string | null
  created_at: string
}

export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '6281342513200'

export function formatRupiah(amount: number): string {
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
