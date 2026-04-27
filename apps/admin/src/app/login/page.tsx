'use client'

import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const [email, setEmail] = useState('admin@primestaffing.com')
  const [password, setPassword] = useState('Admin123!')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('📝 Login form submitted')
      const data = await authApi.login(email, password)
      console.log('✅ Login successful, user data:', data.user)

      setUser(data.user)
      console.log('🔄 Redirecting to dashboard...')

      router.push('/dashboard')
    } catch (err: any) {
      console.error('❌ Login error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float [animation-direction:reverse]" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-glass p-8 border border-white/20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Prime Staffing</span>
            </h1>
            <p className="text-gray-600 text-lg font-semibold">Admin Dashboard</p>
            <p className="mt-4 text-sm text-gray-500">
              Sign in to manage your recruitment platform
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-red-50/80 backdrop-blur-xl p-4 border border-red-200">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  placeholder="admin@primestaffing.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center space-y-2 pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Default Credentials</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> admin@primestaffing.com</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Password:</span> Admin123!</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
