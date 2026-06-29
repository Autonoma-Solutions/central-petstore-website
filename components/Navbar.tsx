'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  MessageCircle,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Home,
} from 'lucide-react'

const APP_LOGO = '/app-logo.png'

const menuItems = [
  { label: 'Beranda', href: '/', icon: <Home size={14} />, dropdown: null },
  {
    label: 'Petshop',
    href: '/petshop',
    dropdown: [
      { label: 'Anjing', href: '/petshop#anjing' },
      { label: 'Kucing', href: '/petshop#kucing' },
      { label: 'Grooming', href: '/petshop#grooming' },
      { label: 'Kesehatan', href: '/petshop#kesehatan' },
    ],
  },
  {
    label: 'Aquarium',
    href: '/aquarium',
    dropdown: [
      { label: 'Filter', href: '/aquarium#filter' },
      { label: 'Pompa', href: '/aquarium#pompa' },
      { label: 'Lampu LED', href: '/aquarium#lampu' },
      { label: 'Pakan Ikan', href: '/aquarium#pakan' },
    ],
  },
  {
    label: 'Pancing',
    href: '/pancing',
    dropdown: [
      { label: 'Joran', href: '/pancing#joran' },
      { label: 'Reel', href: '/pancing#reel' },
      { label: 'Senar', href: '/pancing#senar' },
      { label: 'Umpan', href: '/pancing#umpan' },
    ],
  },
  { label: 'Promo', href: '/promo', dropdown: null },
  { label: 'Blog & Tips', href: '/blog', dropdown: null },
  { label: 'Tentang Kami', href: '/tentang', dropdown: null },
  { label: 'Kontak', href: '/kontak', dropdown: null },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* ROW 1 - White bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src={APP_LOGO} alt="Central Petstore" className="h-[78px] sm:h-[94px] w-auto object-contain" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari produk di Central Petstore..."
                className="w-full pl-4 pr-10 py-2 rounded-full border-2 text-sm outline-none transition-all"
                style={{ borderColor: '#39A7FF' }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: '#39A7FF' }}
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href="https://wa.me/6281342513200"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img src="/whatsapp-icon.png" alt="WhatsApp" className="w-5 h-5 shrink-0" />
              <span className="hidden lg:flex flex-col leading-tight">
                <span className="text-xs font-semibold text-gray-700">WhatsApp</span>
                <span className="text-xs" style={{ color: '#25D366' }}>0813 4251 3200</span>
              </span>
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <img src="/profile-icon.png" alt="Akun Admin" className="w-5 h-5 shrink-0" />
              <span className="hidden lg:flex flex-col leading-tight">
                <span className="text-xs font-semibold text-gray-700">Akun Admin</span>
                <span className="text-xs text-gray-400">Masuk</span>
              </span>
            </Link>
            <button className="relative flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors">
              <ShoppingCart size={20} />
              <span
                className="absolute -top-2 -right-2 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold"
                style={{ background: '#0A2A8A' }}
              >
                0
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ROW 2 - Dark blue nav bar (desktop) */}
      <nav className="hidden md:block" style={{ background: '#0A2A8A' }}>
        <div className="max-w-[1600px] mx-auto px-4">
          <ul className="flex items-center">
            {menuItems.map((item) => (
              <li key={item.label} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.icon}
                      {item.label}
                      <ChevronDown size={14} />
                    </button>
                    {/* Dropdown */}
                    <div
                      className="absolute top-full left-0 bg-white shadow-xl rounded-b-lg overflow-hidden min-w-40 z-50 transition-all"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      style={{
                        display: openDropdown === item.label ? 'block' : 'none',
                      }}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-2">
            <a
              href="https://wa.me/6281342513200"
              className="flex items-center gap-2 py-2 text-sm font-semibold"
              style={{ color: '#25D366' }}
            >
              <MessageCircle size={18} />
              WhatsApp: 0813 4251 3200
            </a>
          </div>
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="bg-gray-50 pl-6">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          • {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sticky WA button (mobile) */}
      <a
        href="https://wa.me/6281342513200"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl wa-pulse"
        style={{ background: '#25D366' }}
      >
        <MessageCircle size={28} />
      </a>
    </header>
  )
}
