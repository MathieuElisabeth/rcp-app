'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, clearAuth } = useAuthStore()

  useEffect(() => {
    // Check if token is expired on app load
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Date.now() / 1000
        
        if (payload.exp < currentTime) {
          clearAuth()
        }
      } catch (error) {
        // Invalid token format
        clearAuth()
      }
    }
  }, [token, clearAuth])

  return <>{children}</>
}