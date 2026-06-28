'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin'
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return
      if (isLoginPage && session) {
        router.replace('/admin/dashboard')
      } else if (!isLoginPage && !session) {
        router.replace('/admin')
      } else {
        setChecking(false)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isLoginPage && !session) {
        router.replace('/admin')
      }
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [isLoginPage, pathname, router])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0A2A8A] rounded-full animate-spin" />
      </div>
    )
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
