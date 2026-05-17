'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { auth_api } from '@/lib/auth_api'

export default function ForgotPasswordPage() {
  const router = useRouter()

  const [email, set_email] = useState('')
  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState('')
  const [sent, set_sent] = useState(false)

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { set_error('Please enter your email address.'); return }
    set_loading(true)
    set_error('')
    try {
      const res = await auth_api.forgot_password({ email })
      if (res.error) {
        set_error(res.error)
      } else {
        set_sent(true)
      }
    } catch {
      set_error('Unable to connect. Please try again.')
    } finally {
      set_loading(false)
    }
  }

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
        <Link href="/auth/login" style={{ fontSize: '14px', color: '#9D00FF', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to sign in
        </Link>
      </header>

      {/* FORM AREA */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px'
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* ICON */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: '#f3e6ff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: '24px'
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9D00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          {!sent ? (
            <>
              {/* HEADING */}
              <div style={{ marginBottom: '32px' }}>
                <h1 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800,
                  letterSpacing: '-0.025em', color: '#0f0a1a', marginBottom: '8px'
                }}>
                  Forgot your password?
                </h1>
                <p style={{ fontSize: '15px', color: '#4a4458', lineHeight: 1.65 }}>
                  Enter the email address linked to your account and we'll send
                  you a reset code.
                </p>
              </div>

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
                    value={email}
                    onChange={e => { set_email(e.target.value); set_error('') }}
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
                      Sending…
                    </>
                  ) : (
                    <>
                      Send reset code
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

              </form>
            </>
          ) : (
            /* SENT STATE */
            <div>
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: '#f0fdf4', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '24px'
                }}>
                  <CheckCircle2 size={26} color="#16a34a" />
                </div>
                <h1 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800,
                  letterSpacing: '-0.025em', color: '#0f0a1a', marginBottom: '8px'
                }}>
                  Check your email
                </h1>
                <p style={{ fontSize: '15px', color: '#4a4458', lineHeight: 1.65 }}>
                  We sent a password reset code to{' '}
                  <span style={{ fontWeight: 600, color: '#0f0a1a' }}>{email}</span>.
                  Use it on the next page to set a new password.
                </p>
              </div>

              <button
                onClick={() => router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px',
                  background: '#9D00FF', color: '#ffffff',
                  fontSize: '15px', fontWeight: 600,
                  padding: '13px', borderRadius: '10px', border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(157,0,255,0.2)',
                  transition: 'opacity 0.15s'
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Enter reset code
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => set_sent(false)}
                style={{
                  marginTop: '12px', width: '100%', background: 'none',
                  border: '1px solid rgba(157,0,255,0.2)', borderRadius: '10px',
                  padding: '12px', fontSize: '14px', fontWeight: 500,
                  color: '#4a4458', cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f3e6ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                Use a different email
              </button>
            </div>
          )}

        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
