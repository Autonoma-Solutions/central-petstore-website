'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Menu } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type AdminHeaderProps = {
  onMenuClick: () => void
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Buka menu"
        >
          <Menu size={20} />
        </button>
        <span className="font-bold text-sm sm:text-base truncate lg:hidden" style={{ color: '#0A2A8A' }}>
          Central Petstore
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Keluar</span>
      </button>
    </header>
  )
}
