'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push(redirectTo)
      } else {
        router.push('/auth')
      }
    })
  }, [router, redirectTo])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#D4380D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#8C6F5A] text-sm">Signing you in...</p>
      </div>
    </div>
  )
}
