'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Newspaper,
  Video,
  Star,
  Megaphone,
} from 'lucide-react'

const menu = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Produk Unggulan', icon: Package },
  { href: '/admin/articles', label: 'Artikel / Blog', icon: Newspaper },
  { href: '/admin/videos', label: 'Video Terbaru', icon: Video },
  { href: '/admin/testimonials', label: 'Testimoni', icon: Star },
  { href: '/admin/promos', label: 'Promo', icon: Megaphone },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 min-h-screen text-white flex flex-col" style={{ background: '#0A2A8A' }}>
      <div className="px-5 py-6 border-b border-white/10">
        <p className="font-extrabold text-lg leading-tight">Central Petstore</p>
        <p className="text-xs text-white/60 mt-0.5">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-5 py-4 text-xs text-white/40 border-t border-white/10">
        © {new Date().getFullYear()} Central Petstore
      </div>
    </aside>
  )
}
