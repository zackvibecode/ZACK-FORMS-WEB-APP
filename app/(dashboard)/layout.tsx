'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import { LayoutDashboard, FileText, LogOut, Plus, Menu, X } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setEmail(data.user.email ?? '')
    })
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ]

  return (
    <div className="min-h-screen bg-charcoal-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-5 border-b border-slate-100">
          <Logo size={32} textSize="text-lg" />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${pathname === href
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-charcoal-600 hover:bg-charcoal-50 hover:text-charcoal-900'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </nav>

        {/* New Form CTA */}
        <div className="p-4 border-t border-slate-100">
          <a
            href="/dashboard/builder/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition"
          >
            <Plus className="w-4 h-4" /> New Form
          </a>
        </div>

        {/* User */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-charcoal-700 truncate max-w-[140px]">{email}</div>
              <div className="text-xs text-charcoal-400">Free plan</div>
            </div>
            <button onClick={logout} className="p-2 hover:bg-red-50 rounded-lg text-charcoal-400 hover:text-red-500 transition">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
          <Logo size={28} textSize="text-base" />
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-charcoal-50">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
