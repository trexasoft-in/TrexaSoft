'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { auth_api } from '@/lib/auth_api'
import { use_auth_store } from '@/lib/store'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const set_auth = use_auth_store(s => s.set_auth)

  const [form, set_form] = useState({ email: '', password: '' })
  const [show_password, set_show_password] = useState(false)
  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState('')
  const [notice, set_notice] = useState('')

  useEffect(() => {
    if (params.get('verified') === 'true') {
      set_notice('Email verified successfully. You can now sign in.')
    }
    if (params.get('reset') === 'true') {
      set_notice('Password reset successfully. Sign in with your new password.')
    }
  }, [params])

  const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_form(prev => ({ ...prev, [e.target.name]: e.target.value }))
    set_error('')
  }

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      set_error('Please enter your email and password.')
      return
    }
    set_loading(true)
    set_error('')
    try {
      const res = await auth_api.login(form)
      if (res.error || !res.access_token) {
        set_error(res.error || res.message || 'Invalid email or password.')
      } else {
        const me = await auth_api.get_me(res.access_token)
        set_auth(me.user || me, res.access_token, res.refresh_token)
        router.push('/account/profile')
      }
    } catch {
      set_error('Unable to connect. Please try again.')
    } finally {
      set_loading(false)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: '420px' }}>

      {/* HEADING */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800,
          letterSpacing: '-0.025em', color: '#0f0a1a', marginBottom: '8px'
        }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '15px', color: '#4a4458', lineHeight: 1.6 }}>
          Sign in to your TrexaSoft account.
        </p>
      </div>

      <form onSubmit={handle_submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* NOTICE (verified / reset) */}
        {notice && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            background: '#f0fdf4', border: '1px solid rgba(22,163,74,0.2)',
            borderRadius: '8px', padding: '12px 14px',
            fontSize: '14px', color: '#15803d'
          }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
            {notice}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            background: '#fff0f3', border: '1px solid rgba(225,29,72,0.2)',
            borderRadius: '8px', padding: '12px 14px',
            fontSize: '14px', color: '#be123c'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="email" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handle_change}
            required
            style={{
              width: '100%', padding: '11px 14px',
              border: '1px solid rgba(157,0,255,0.2)',
              borderRadius: '9px', fontSize: '15px',
              color: '#0f0a1a', background: '#ffffff',
              outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s'
            }}
            onFocus={e => {
              e.target.style.borderColor = '#9D00FF'
              e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(157,0,255,0.2)'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        {/* PASSWORD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label htmlFor="password" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              style={{ fontSize: '13px', color: '#9D00FF', fontWeight: 500, textDecoration: 'none' }}
            >
              Forgot password?
            </Link>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              name="password"
              type={show_password ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Your password"
              value={form.password}
              onChange={handle_change}
              required
              style={{
                width: '100%', padding: '11px 44px 11px 14px',
                border: '1px solid rgba(157,0,255,0.2)',
                borderRadius: '9px', fontSize: '15px',
                color: '#0f0a1a', background: '#ffffff',
                outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s'
              }}
              onFocus={e => {
                e.target.style.borderColor = '#9D00FF'
                e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(157,0,255,0.2)'
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              type="button"
              aria-label={show_password ? 'Hide password' : 'Show password'}
              onClick={() => set_show_password(p => !p)}
              style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)', background: 'none',
                border: 'none', cursor: 'pointer', color: '#8a7fa0',
                display: 'flex', alignItems: 'center', padding: '4px'
              }}
            >
              {show_password ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
            background: loading ? '#c97dff' : '#9D00FF',
            color: '#ffffff', fontSize: '15px', fontWeight: 600,
            padding: '13px', borderRadius: '10px', border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 16px rgba(157,0,255,0.2)',
            transition: 'opacity 0.15s'
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          {loading ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight size={16} />
            </>
          )}
        </button>

      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      fontFamily: "'Satoshi', sans-serif", background: '#ffffff', color: '#0f0a1a'
    }}>

      {/* TOP BAR */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', borderBottom: '1px solid rgba(157,0,255,0.08)'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/trexasoft_text_purple.png"
            alt="TrexaSoft Logo"
            style={{ height: '32px', width: 'auto' }}
          />
        </Link>
        <p style={{ fontSize: '14px', color: '#4a4458' }}>
          No account?{' '}
          <Link href="/auth/signup" style={{ color: '#9D00FF', fontWeight: 600, textDecoration: 'none' }}>
            Sign up free
          </Link>
        </p>
      </header>

      {/* FORM AREA */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px'
      }}>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
