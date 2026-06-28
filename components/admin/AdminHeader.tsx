'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-6 shrink-0">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <LogOut size={16} />
        Keluar
      </button>
    </header>
  )
}
