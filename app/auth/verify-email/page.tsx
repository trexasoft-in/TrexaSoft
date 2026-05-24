'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react'
import { auth_api } from '@/lib/auth_api'

function VerifyEmailForm() {
  const router = useRouter()
  const params = useSearchParams()
  const email = params.get('email') || ''

  const [otp, set_otp] = useState(['', '', '', '', '', ''])
  const [loading, set_loading] = useState(false)
  const [resending, set_resending] = useState(false)
  const [error, set_error] = useState('')
  const [success, set_success] = useState('')
  const [countdown, set_countdown] = useState(60)
  const [can_resend, set_can_resend] = useState(false)

  const inputs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { set_can_resend(true); return }
    const t = setTimeout(() => set_countdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handle_otp_change = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = digit
    set_otp(next)
    set_error('')
    if (digit && index < 5) inputs.current[index + 1]?.focus()
  }

  const handle_key_down = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handle_paste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const next = ['', '', '', '', '', '']
    pasted.split('').forEach((d, i) => { next[i] = d })
    set_otp(next)
    const focus_idx = Math.min(pasted.length, 5)
    inputs.current[focus_idx]?.focus()
  }

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) { set_error('Please enter the 6-digit code.'); return }
    set_loading(true)
    set_error('')
    try {
      const res = await auth_api.verify_email({ email, otp: code })
      if (res.error || res.message?.toLowerCase().includes('invalid') || res.message?.toLowerCase().includes('error')) {
        set_error(res.error || res.message || 'Invalid code. Please try again.')
        set_otp(['', '', '', '', '', ''])
        inputs.current[0]?.focus()
      } else {
        const params = new URLSearchParams(window.location.search)
        const returnTo = params.get('returnTo')
        const next = new URLSearchParams({ verified: 'true' })

        if (returnTo) next.set('returnTo', returnTo)

        router.push(`/auth/login?${next.toString()}`)
      }
    } catch {
      set_error('Unable to connect. Please try again.')
    } finally {
      set_loading(false)
    }
  }

  const handle_resend = async () => {
    if (!can_resend) return
    set_resending(true)
    set_error('')
    set_success('')
    try {
      const res = await auth_api.resend_otp({ email })
      if (res.error) {
        set_error(res.error)
      } else {
        set_success('A new code has been sent to your email.')
        set_countdown(60)
        set_can_resend(false)
        set_otp(['', '', '', '', '', ''])
        inputs.current[0]?.focus()
      }
    } catch {
      set_error('Failed to resend. Please try again.')
    } finally {
      set_resending(false)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: '420px' }}>

      {/* ICON */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: '#f5f5f5', display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginBottom: '24px'
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>

      {/* HEADING */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800,
          letterSpacing: '-0.025em', color: '#0f0a1a', marginBottom: '8px'
        }}>
          Check your email
        </h1>
        <p style={{ fontSize: '15px', color: '#4a4458', lineHeight: 1.65 }}>
          We sent a 6-digit verification code to{' '}
          <span style={{ fontWeight: 600, color: '#0f0a1a' }}>{email || 'your email'}</span>.
          Enter it below to verify your account.
        </p>
      </div>

      <form onSubmit={handle_submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

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

        {/* SUCCESS */}
        {success && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            background: '#f0fdf4', border: '1px solid rgba(22,163,74,0.2)',
            borderRadius: '8px', padding: '12px 14px',
            fontSize: '14px', color: '#15803d'
          }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
            {success}
          </div>
        )}

        {/* OTP INPUT */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a', display: 'block', marginBottom: '12px' }}>
            Verification code
          </label>
          <div style={{ display: 'flex', gap: '10px' }} onPaste={handle_paste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handle_otp_change(i, e.target.value)}
                onKeyDown={e => handle_key_down(i, e)}
                aria-label={`Digit ${i + 1}`}
                style={{
                  width: '100%', aspectRatio: '1',
                  textAlign: 'center', fontSize: '22px', fontWeight: 700,
                  border: `1.5px solid ${digit ? '#111111' : 'rgba(0,0,0,0.16)'}`,
                  borderRadius: '10px', color: '#0f0a1a',
                  background: digit ? '#f5f5f5' : '#ffffff',
                  outline: 'none', transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
                  caretColor: '#111111'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#111111'
                  e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
                }}
                onBlur={e => {
                  e.target.style.boxShadow = 'none'
                  if (!digit) e.target.style.borderColor = 'rgba(0,0,0,0.16)'
                }}
              />
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading || otp.join('').length < 6}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
            background: otp.join('').length < 6 ? '#e0b3ff' : loading ? '#666666' : '#111111',
            color: '#ffffff', fontSize: '15px', fontWeight: 600,
            padding: '13px', borderRadius: '10px', border: 'none',
            cursor: loading || otp.join('').length < 6 ? 'not-allowed' : 'pointer',
            boxShadow: otp.join('').length === 6 ? '0 4px 16px rgba(0,0,0,0.16)' : 'none',
            transition: 'background 0.2s, box-shadow 0.2s'
          }}
        >
          {loading ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Verifying…
            </>
          ) : (
            <>
              Verify email
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* RESEND */}
        <div style={{ textAlign: 'center' }}>
          {can_resend ? (
            <button
              type="button"
              onClick={handle_resend}
              disabled={resending}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '14px', fontWeight: 600, color: '#111111',
                opacity: resending ? 0.6 : 1
              }}
            >
              <RotateCcw size={14} />
              {resending ? 'Sending…' : 'Resend code'}
            </button>
          ) : (
            <p style={{ fontSize: '13px', color: '#8a7fa0' }}>
              Resend code in{' '}
              <span style={{ fontWeight: 600, color: '#4a4458' }}>
                {countdown}s
              </span>
            </p>
          )}
        </div>

      </form>
    </div>
  )
}

export default function VerifyEmailPage() {
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
        <Link href="/auth/signup" style={{ fontSize: '14px', color: '#111111', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to sign up
        </Link>
      </header>

      {/* FORM AREA */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px'
      }}>
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyEmailForm />
        </Suspense>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
