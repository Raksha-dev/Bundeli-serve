'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '@/lib/supabase'
import { setUser, clearUser } from '@/store/authSlice'

export default function AuthListener() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(setUser({
          id: session.user.id,
          email: session.user.email!,
          fullName: session.user.user_metadata?.full_name || '',
        }))
      } else {
        dispatch(clearUser())
      }
    })

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setUser({
          id: session.user.id,
          email: session.user.email!,
          fullName: session.user.user_metadata?.full_name || '',
        }))
      } else {
        dispatch(clearUser())
      }
    })

    return () => subscription.unsubscribe()
  }, [dispatch])

  return null
}
