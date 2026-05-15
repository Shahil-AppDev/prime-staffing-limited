'use client'

import { SiteSuspended } from '@/components/SiteSuspended'
import { useEffect, useState } from 'react'

const SITE_SUSPENDED = process.env.NEXT_PUBLIC_SITE_SUSPENDED === 'true'
const UNLOCK_TOKEN = process.env.NEXT_PUBLIC_UNLOCK_TOKEN ?? ''
const STORAGE_KEY = 'prime_site_unlocked'

export function SuspensionGate({ children }: { children: React.ReactNode }) {
  const [showSite, setShowSite] = useState(!SITE_SUSPENDED)
  const [hydrated, setHydrated] = useState(!SITE_SUSPENDED)

  useEffect(() => {
    if (!SITE_SUSPENDED) return

    const params = new URLSearchParams(window.location.search)

    if (params.get('support_lock') === 'true') {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      const token = params.get('support_unlock')
      if (token && UNLOCK_TOKEN && token === UNLOCK_TOKEN) {
        localStorage.setItem(STORAGE_KEY, 'true')
      }
    }

    setShowSite(localStorage.getItem(STORAGE_KEY) === 'true')
    setHydrated(true)
  }, [])

  if (!SITE_SUSPENDED) {
    return <>{children}</>
  }

  if (!hydrated || !showSite) {
    return <SiteSuspended />
  }

  return <>{children}</>
}
