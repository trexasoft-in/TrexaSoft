'use client'

import { useState } from 'react'
import { Eye, EyeOff, Save, AlertCircle, CheckCircle2 } from 'lucide-react'
import { auth_api } from '@/lib/auth_api'
import { use_auth_store } from '@/lib/store'

export default function SecurityPage() {
  const { access_token } = use_auth_store()

  const [form, set_form] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })
  const [show, set_show] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [loading, set_loading] = useState(false)
  const [error, set_error] = useState('')
  const [success, set_success] = useState('')

  const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_form(prev => ({ ...prev, [e.target.name]: e.target.value }))
    set_error('')
    set_success('')
  }

  const toggle_show = (field: 'current' | 'new' | 'confirm') => {
    set_show(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const password_strength = (() => {
    const p = form.new_password
    if (!p) return null
    if (p.length < 6) return { label: 'Weak', color: '#e53935', width: '33%' }
    if (p.length < 10 || !/[0-9]/.test(p)) return { label: 'Fair', color: '#f59e0b', width: '66%' }
    return { label: 'Strong', color: '#16a34a', width: '100%' }
  })()

  const passwords_match   = form.confirm_password.length > 0 && form.new_password === form.confirm_password
  const passwords_mismatch = form.confirm_password.length > 0 && form.new_password !== form.confirm_password

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current_password) { set_error('Please enter your current password.'); return }
    if (form.new_password.length < 8) { set_error('New password must be at least 8 characters.'); return }
    if (form.new_password !== form.confirm_password) { set_error('New passwords do not match.'); return }
    if (form.current_password === form.new_password) { set_error('New password must be different from current password.'); return }

    set_loading(true)
    set_error('')
    set_success('')
    try {
      const res = await auth_api.change_password(access_token!, {
        current_password: form.current_password,
        new_password: form.new_password
      })
      if (res.error) {
        set_error(res.error)
      } else {
        set_success('Password changed successfully.')
        set_form({ current_password: '', new_password: '', confirm_password: '' })
      }
    } catch {
      set_error('Unable to connect. Please try again.')
    } finally {
      set_loading(false)
    }
  }

  return (
    <div style={{ maxWidth: '640px', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)' }}>

      {/* PAGE TITLE */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800,
          letterSpacing: '-0.025em', color: '#0f0a1a', marginBottom: '6px'
        }}>
          Security
        </h1>
        <p style={{ fontSize: '14px', color: '#4a4458', lineHeight: 1.6 }}>
          Keep your account safe by using a strong, unique password.
        </p>
      </div>

      {/* CHANGE PASSWORD CARD */}
      <div style={{
        border: '1px solid rgba(157,0,255,0.1)',
        borderRadius: '14px', overflow: 'hidden'
      }}>
        {/* CARD HEADER */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(157,0,255,0.08)',
          background: '#fafafa'
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0f0a1a', marginBottom: '4px' }}>
            Change password
          </h2>
          <p style={{ fontSize: '13px', color: '#4a4458' }}>
            You will remain signed in after changing your password.
          </p>
        </div>

        {/* CARD BODY */}
        <div style={{ padding: '24px' }}>
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

            {/* CURRENT PASSWORD */}
            <PasswordField
              id="current_password"
              label="Current password"
              value={form.current_password}
              show={show.current}
              on_toggle={() => toggle_show('current')}
              on_change={handle_change}
              placeholder="Your current password"
              autocomplete="current-password"
            />

            <hr style={{ border: 'none', borderTop: '1px solid rgba(157,0,255,0.08)' }} />

            {/* NEW PASSWORD */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <PasswordField
                id="new_password"
                label="New password"
                value={form.new_password}
                show={show.new}
                on_toggle={() => toggle_show('new')}
                on_change={handle_change}
                placeholder="Min. 8 characters"
                autocomplete="new-password"
              />
              {password_strength && (
                <div style={{ marginTop: '4px' }}>
                  <div style={{
                    height: '3px', background: '#f0ebf8',
                    borderRadius: '99px', overflow: 'hidden'
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
              <PasswordField
                id="confirm_password"
                label="Confirm new password"
                value={form.confirm_password}
                show={show.confirm}
                on_toggle={() => toggle_show('confirm')}
                on_change={handle_change}
                placeholder="Re-enter new password"
                autocomplete="new-password"
                border_override={
                  passwords_mismatch ? 'rgba(225,29,72,0.4)'
                  : passwords_match  ? 'rgba(22,163,74,0.4)'
                  : undefined
                }
              />
              {passwords_mismatch && (
                <p style={{ fontSize: '12px', color: '#be123c' }}>Passwords do not match</p>
              )}
              {passwords_match && (
                <p style={{ fontSize: '12px', color: '#15803d' }}>Passwords match</p>
              )}
            </div>

            {/* SUBMIT */}
            <div style={{ paddingTop: '4px' }}>
              <button
                type="submit" disabled={loading}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: loading ? '#c97dff' : '#9D00FF',
                  color: '#ffffff', fontSize: '14px', fontWeight: 600,
                  padding: '11px 24px', borderRadius: '99px', border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 16px rgba(157,0,255,0.2)',
                  transition: 'opacity 0.15s'
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {loading ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Saving…
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Update password
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* SECURITY TIPS CARD */}
      <div style={{
        marginTop: '20px',
        border: '1px solid rgba(157,0,255,0.08)',
        borderRadius: '14px', padding: '20px 24px',
        background: '#fafafa'
      }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f0a1a', marginBottom: '12px' }}>
          Password tips
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Use at least 8 characters',
            'Mix letters, numbers, and symbols',
            'Avoid using the same password on other sites',
            'Never share your password with anyone'
          ].map(tip => (
            <li key={tip} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4a4458' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9D00FF', flexShrink: 0 }} />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/* ── Password Field Component ── */
function PasswordField({
  id, label, value, show, on_toggle, on_change,
  placeholder, autocomplete, border_override
}: {
  id: string
  label: string
  value: string
  show: boolean
  on_toggle: () => void
  on_change: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  autocomplete: string
  border_override?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label htmlFor={id} style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          autoComplete={autocomplete}
          placeholder={placeholder}
          value={value}
          onChange={on_change}
          required
          style={{
            width: '100%', padding: '11px 44px 11px 14px',
            border: `1px solid ${border_override ?? 'rgba(157,0,255,0.2)'}`,
            borderRadius: '9px', fontSize: '15px',
            color: '#0f0a1a', background: '#ffffff',
            outline: 'none', fontFamily: "'Satoshi', sans-serif",
            transition: 'border-color 0.15s, box-shadow 0.15s'
          }}
          onFocus={e => {
            e.target.style.borderColor = '#9D00FF'
            e.target.style.boxShadow = '0 0 0 3px rgba(157,0,255,0.1)'
          }}
          onBlur={e => {
            e.target.style.borderColor = border_override ?? 'rgba(157,0,255,0.2)'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button
          type="button"
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={on_toggle}
          style={{
            position: 'absolute', right: '12px', top: '50%',
            transform: 'translateY(-50%)', background: 'none',
            border: 'none', cursor: 'pointer', color: '#8a7fa0',
            display: 'flex', alignItems: 'center', padding: '4px'
          }}
        >
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  )
}
