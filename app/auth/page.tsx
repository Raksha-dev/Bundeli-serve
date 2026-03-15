'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleAuth = async () => {
    setError('')
    setSuccessMsg('')

    if (!email || !password) { setError('Please fill in all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    if (tab === 'signup' && !fullName.trim()) { setError('Please enter your full name'); return }

    setLoading(true)

    if (tab === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push(redirectTo)
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) { setError(error.message); setLoading(false); return }
      setSuccessMsg('Account created! Check your email to confirm, then log in.')
      setTab('login')
    }

    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?redirect=${redirectTo}` },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4380D]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F07427]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-[#8C6F5A] text-sm mb-6 hover:text-[#4A2C17] transition-colors">
          <ArrowLeft size={14} /> Back to home
        </Link>

        <div className="bg-white rounded-3xl border border-amber-100 shadow-xl shadow-amber-100/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#4A2C17] to-[#6B3F22] px-8 pt-8 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="text-white text-sm font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>B</span>
              </div>
              <span className="text-white font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>BundeliServe</span>
            </div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {tab === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-amber-200/70 text-sm mt-1">
              {tab === 'login' ? 'Sign in to place your order' : 'Join us to get started'}
            </p>
          </div>

          <div className="px-8 py-6">
            {/* Tabs */}
            <div className="flex bg-amber-50 rounded-xl p-1 mb-6">
              {(['login', 'signup'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(''); setSuccessMsg('') }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    tab === t
                      ? 'bg-white text-[#4A2C17] shadow-sm'
                      : 'text-[#8C6F5A] hover:text-[#4A2C17]'
                  }`}
                >
                  {t === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Success message */}
            {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-4">
                ✅ {successMsg}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                {error}
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {tab === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-[#4A2C17] mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6F5A]" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-amber-200 rounded-xl text-sm text-[#4A2C17] placeholder-[#C4A882] focus:outline-none focus:ring-2 focus:ring-[#D4380D]/30 focus:border-[#D4380D]/50 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#4A2C17] mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6F5A]" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAuth()}
                    className="w-full pl-10 pr-4 py-2.5 border border-amber-200 rounded-xl text-sm text-[#4A2C17] placeholder-[#C4A882] focus:outline-none focus:ring-2 focus:ring-[#D4380D]/30 focus:border-[#D4380D]/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A2C17] mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6F5A]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAuth()}
                    className="w-full pl-10 pr-10 py-2.5 border border-amber-200 rounded-xl text-sm text-[#4A2C17] placeholder-[#C4A882] focus:outline-none focus:ring-2 focus:ring-[#D4380D]/30 focus:border-[#D4380D]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C6F5A] hover:text-[#4A2C17]"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full mt-6 bg-[#D4380D] hover:bg-[#B83209] disabled:bg-amber-200 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-red-100 active:scale-[0.98]"
            >
              {loading ? 'Please wait...' : tab === 'login' ? 'Log In' : 'Create Account'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-amber-100" />
              <span className="text-xs text-[#C4A882]">or</span>
              <div className="flex-1 h-px bg-amber-100" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 border border-amber-200 bg-white hover:bg-amber-50 text-[#4A2C17] py-3 rounded-xl text-sm font-medium transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
