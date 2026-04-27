'use client'

import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import {
    FileText,
    FolderKanban,
    LayoutDashboard,
    LogOut,
    Settings,
    Share2,
    Users
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Blog', href: '/dashboard/blog', icon: FileText },
  { name: 'Social Posts', href: '/dashboard/social', icon: Share2 },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    await authApi.logout()
    logout()
    router.push('/login')
  }

  return (
    <div className="flex flex-col w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 h-screen border-r border-gray-800/50 backdrop-blur-xl">
      <div className="flex items-center justify-center h-20 bg-gradient-to-r from-primary-600/10 to-accent-600/10 border-b border-gray-800/50">
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Prime Staffing</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="px-3 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-glow'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white hover:scale-105'
                  }
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800/50 bg-gradient-to-r from-primary-600/5 to-accent-600/5">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 mb-3 border border-white/10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-white">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-red-600/20 rounded-xl transition-all duration-300 hover:scale-105 border border-white/10 hover:border-red-500/50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
