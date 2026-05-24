'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { auth_api } from '@/lib/auth_api'

export default function SignupPage() {
  const router = useRouter()

  const [form, set_form] = useState({ name: '', email: '', password: '' })
  const [show_password, set_show_password] = useState(false)
  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState('')

  const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_form(prev => ({ ...prev, [e.target.name]: e.target.value }))
    set_error('')
  }

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      set_error('All fields are required.')
      return
    }
    if (form.password.length < 8) {
      set_error('Password must be at least 8 characters.')
      return
    }
    set_loading(true)
    set_error('')
    try {
      const res = await auth_api.signup(form)
      if (res.error || res.message?.toLowerCase().includes('error')) {
        set_error(res.error || res.message || 'Something went wrong.')
      } else {
        const params = new URLSearchParams(window.location.search)
        const returnTo = params.get('returnTo')
        const next = new URLSearchParams({ email: form.email })

        if (returnTo) next.set('returnTo', returnTo)

        router.push(`/auth/verify-email?${next.toString()}`)
      }
    } catch {
      set_error('Unable to connect. Please try again.')
    } finally {
      set_loading(false)
    }
  }

  const password_strength = (() => {
    const p = form.password
    if (!p) return null
    if (p.length < 6) return { label: 'Weak', color: '#e53935', width: '33%' }
    if (p.length < 10 || !/[0-9]/.test(p)) return { label: 'Fair', color: '#f59e0b', width: '66%' }
    return { label: 'Strong', color: '#16a34a', width: '100%' }
  })()

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      fontFamily: "'Satoshi', sans-serif", background: '#ffffff', color: '#0f0a1a'
    }}>

      {/* TOP BAR */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'right',
        padding: '16px 24px', borderBottom: '1px solid rgba(157,0,255,0.08)'
      }}>
        {/* <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/trexasoft_text_purple.png"
            alt="TrexaSoft Logo"
            style={{ height: '32px', width: 'auto' }}
          />
        </Link> */}
        <p style={{ fontSize: '14px', color: '#4a4458' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: '#111111', fontWeight: 600, textDecoration: 'none', alignItems: 'center' }}>
            Sign in
          </Link>
        </p>
      </header>

      {/* FORM AREA */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px'
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* HEADING */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800,
              letterSpacing: '-0.025em', color: '#0f0a1a', marginBottom: '8px'
            }}>
              Create your account
            </h1>
            <p style={{ fontSize: '15px', color: '#4a4458', lineHeight: 1.6 }}>
              One account gives you access to every TrexaSoft product.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handle_submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

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

            {/* FULL NAME */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="name" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Name"
                value={form.name}
                onChange={handle_change}
                required
                style={{
                  width: '100%', padding: '11px 14px',
                  border: '1px solid rgba(0,0,0,0.16)',
                  borderRadius: '9px', fontSize: '15px',
                  color: '#0f0a1a', background: '#ffffff',
                  outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#111111'
                  e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(0,0,0,0.16)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

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
                placeholder="Your Email Address"
                value={form.email}
                onChange={handle_change}
                required
                style={{
                  width: '100%', padding: '11px 14px',
                  border: '1px solid rgba(0,0,0,0.16)',
                  borderRadius: '9px', fontSize: '15px',
                  color: '#0f0a1a', background: '#ffffff',
                  outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#111111'
                  e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(0,0,0,0.16)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* PASSWORD */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="password" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  name="password"
                  type={show_password ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handle_change}
                  required
                  style={{
                    width: '100%', padding: '11px 44px 11px 14px',
                    border: '1px solid rgba(0,0,0,0.16)',
                    borderRadius: '9px', fontSize: '15px',
                    color: '#0f0a1a', background: '#ffffff',
                    outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#111111'
                    e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(0,0,0,0.16)'
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

              {/* PASSWORD STRENGTH */}
              {password_strength && (
                <div>
                  <div style={{
                    height: '3px', background: '#f0ebf8', borderRadius: '99px',
                    overflow: 'hidden', marginTop: '8px'
                  }}>
                    <div style={{
                      height: '100%', width: password_strength.width,
                      background: password_strength.color,
                      borderRadius: '99px', transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <p style={{ fontSize: '12px', color: password_strength.color, marginTop: '5px', fontWeight: 500 }}>
                    {password_strength.label} password
                  </p>
                </div>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '8px',
                background: loading ? '#666666' : '#111111',
                color: '#ffffff', fontSize: '15px', fontWeight: 600,
                padding: '13px', borderRadius: '10px', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
                transition: 'opacity 0.15s, transform 0.15s'
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* TERMS NOTE */}
            <p style={{ fontSize: '12px', color: '#8a7fa0', lineHeight: 1.6, textAlign: 'center' }}>
              By creating an account you agree to our{' '}
              <Link href="/terms" style={{ color: '#111111', textDecoration: 'none', fontWeight: 500 }}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" style={{ color: '#111111', textDecoration: 'none', fontWeight: 500 }}>
                Privacy Policy
              </Link>.
            </p>

          </form>
        </div>
      </main>

      {/* SPIN KEYFRAME */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

    </div>
  )
}
