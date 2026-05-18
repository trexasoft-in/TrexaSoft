'use client'

import { useState, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { auth_api } from '@/lib/auth_api'

function ResetPasswordForm() {
  const router = useRouter()
  const params = useSearchParams()
  const email = params.get('email') || ''

  const [otp, set_otp] = useState(['', '', '', '', '', ''])
  const [password, set_password] = useState('')
  const [confirm, set_confirm] = useState('')
  const [show_password, set_show_password] = useState(false)
  const [show_confirm, set_show_confirm] = useState(false)
  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState('')

  const inputs = useRef<(HTMLInputElement | null)[]>([])

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

  const password_strength = (() => {
    const p = password
    if (!p) return null
    if (p.length < 6) return { label: 'Weak', color: '#e53935', width: '33%' }
    if (p.length < 10 || !/[0-9]/.test(p)) return { label: 'Fair', color: '#f59e0b', width: '66%' }
    return { label: 'Strong', color: '#16a34a', width: '100%' }
  })()

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) { set_error('Please enter the 6-digit reset code.'); return }
    if (password.length < 8) { set_error('Password must be at least 8 characters.'); return }
    if (password !== confirm) { set_error('Passwords do not match.'); return }
    set_loading(true)
    set_error('')
    try {
      const res = await auth_api.reset_password({ email, otp: code, new_password: password })
      if (res.error || res.message?.toLowerCase().includes('invalid')) {
        set_error(res.error || res.message || 'Invalid or expired code.')
        set_otp(['', '', '', '', '', ''])
        inputs.current[0]?.focus()
      } else {
        const params = new URLSearchParams(window.location.search)
        const returnTo = params.get('returnTo')
        const next = new URLSearchParams({ reset: 'true' })

        if (returnTo) next.set('returnTo', returnTo)

        router.push(`/auth/login?${next.toString()}`)
      }
    } catch {
      set_error('Unable to connect. Please try again.')
    } finally {
      set_loading(false)
    }
  }

  const passwords_match = confirm.length > 0 && password === confirm
  const passwords_mismatch = confirm.length > 0 && password !== confirm

  return (
    <div style={{ width: '100%', maxWidth: '420px' }}>

      {/* ICON */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: '#f3e6ff', display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginBottom: '24px'
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9D00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>

      {/* HEADING */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800,
          letterSpacing: '-0.025em', color: '#0f0a1a', marginBottom: '8px'
        }}>
          Reset your password
        </h1>
        <p style={{ fontSize: '15px', color: '#4a4458', lineHeight: 1.65 }}>
          Enter the code sent to{' '}
          <span style={{ fontWeight: 600, color: '#0f0a1a' }}>{email || 'your email'}</span>{' '}
          and choose a new password.
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

        {/* OTP */}
        <div>
          <label style={{
            fontSize: '13px', fontWeight: 600, color: '#0f0a1a',
            display: 'block', marginBottom: '12px'
          }}>
            Reset code
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
                  border: `1.5px solid ${digit ? '#9D00FF' : 'rgba(157,0,255,0.2)'}`,
                  borderRadius: '10px', color: '#0f0a1a',
                  background: digit ? '#faf3ff' : '#ffffff',
                  outline: 'none', caretColor: '#9D00FF',
                  transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#9D00FF'
                  e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
                }}
                onBlur={e => {
                  e.target.style.boxShadow = 'none'
                  if (!digit) e.target.style.borderColor = 'rgba(157,0,255,0.2)'
                }}
              />
            ))}
          </div>
        </div>

        {/* NEW PASSWORD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="password" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
            New password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              type={show_password ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={e => { set_password(e.target.value); set_error('') }}
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

          {/* STRENGTH */}
          {password_strength && (
            <div>
              <div style={{
                height: '3px', background: '#f0ebf8',
                borderRadius: '99px', overflow: 'hidden', marginTop: '8px'
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

        {/* CONFIRM PASSWORD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="confirm" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
            Confirm new password
              </label>
          <div style={{ position: 'relative' }}>
            <input
              id="confirm"
              type={show_confirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirm}
              onChange={e => { set_confirm(e.target.value); set_error('') }}
              required
              style={{
                width: '100%', padding: '11px 44px 11px 14px',
                border: `1px solid ${passwords_mismatch ? 'rgba(225,29,72,0.4)' : passwords_match ? 'rgba(22,163,74,0.4)' : 'rgba(157,0,255,0.2)'}`,
                borderRadius: '9px', fontSize: '15px',
                color: '#0f0a1a', background: '#ffffff',
                outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s'
              }}
              onFocus={e => {
                e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
              }}
              onBlur={e => {
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              type="button"
              aria-label={show_confirm ? 'Hide password' : 'Show password'}
              onClick={() => set_show_confirm(p => !p)}
              style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)', background: 'none',
                border: 'none', cursor: 'pointer', color: '#8a7fa0',
                display: 'flex', alignItems: 'center', padding: '4px'
              }}
            >
              {show_confirm ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {passwords_mismatch && (
            <p style={{ fontSize: '12px', color: '#be123c', marginTop: '2px' }}>
              Passwords do not match
            </p>
          )}
          {passwords_match && (
            <p style={{ fontSize: '12px', color: '#15803d', marginTop: '2px' }}>
              Passwords match
            </p>
          )}
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
              Resetting…
            </>
          ) : (
            <>
              Reset password
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* BACK TO LOGIN */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#8a7fa0' }}>
          Remembered your password?{' '}
          <Link href="/auth/login" style={{ color: '#9D00FF', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>

      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
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
        <Link href="/auth/forgot-password" style={{ fontSize: '14px', color: '#9D00FF', fontWeight: 600, textDecoration: 'none' }}>
          ← Back
        </Link>
      </header>

      {/* FORM AREA */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px'
      }}>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
