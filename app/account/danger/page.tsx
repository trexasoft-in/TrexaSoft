'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { auth_api } from '@/lib/auth_api'
import { use_auth_store } from '@/lib/store'

export default function DangerPage() {
  const router = useRouter()
  const { user, access_token, clear_auth } = use_auth_store()

  const [step, set_step] = useState<'idle' | 'confirm' | 'deleting' | 'deleted'>('idle')
  const [password, set_password] = useState('')
  const [show_password, set_show_password] = useState(false)
  const [confirm_text, set_confirm_text] = useState('')
  const [error, set_error] = useState('')

  const CONFIRM_PHRASE = 'delete my account'
  const phrase_matches = confirm_text.trim().toLowerCase() === CONFIRM_PHRASE
  const can_submit = phrase_matches && password.length >= 1

  const handle_delete = async () => {
    if (!can_submit) return
    set_step('deleting')
    set_error('')
    try {
      const res = await auth_api.delete_account(access_token!, { password })
      if (res.error) {
        set_error(res.error)
        set_step('confirm')
      } else {
        set_step('deleted')
        setTimeout(() => {
          clear_auth()
          router.replace('/')
        }, 3000)
      }
    } catch {
      set_error('Unable to connect. Please try again.')
      set_step('confirm')
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
          Delete Account
        </h1>
        <p style={{ fontSize: '14px', color: '#4a4458', lineHeight: 1.6 }}>
          Permanently remove your TrexaSoft account and all associated data.
        </p>
      </div>

      {/* DELETED STATE */}
      {step === 'deleted' && (
        <div style={{
          border: '1px solid rgba(22,163,74,0.2)', borderRadius: '14px',
          padding: '40px 32px', textAlign: 'center', background: '#f0fdf4'
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: '#dcfce7', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 20px'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f0a1a', marginBottom: '8px' }}>
            Account deleted
          </h2>
          <p style={{ fontSize: '14px', color: '#4a4458', lineHeight: 1.6 }}>
            Your account and all data have been permanently deleted.
            You will be redirected shortly.
          </p>
        </div>
      )}

      {/* IDLE STATE */}
      {step === 'idle' && (
        <>
          {/* WARNING CARD */}
          <div style={{
            border: '1px solid rgba(190,18,60,0.2)',
            borderRadius: '14px', overflow: 'hidden', marginBottom: '24px'
          }}>
            <div style={{
              padding: '16px 20px',
              background: '#fff0f3',
              borderBottom: '1px solid rgba(190,18,60,0.1)',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <AlertTriangle size={17} color="#be123c" />
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#be123c' }}>
                This action is permanent and cannot be undone
              </p>
            </div>
            <div style={{ padding: '20px', background: '#ffffff' }}>
              <p style={{ fontSize: '14px', color: '#4a4458', lineHeight: 1.7, marginBottom: '16px' }}>
                Deleting your account will permanently remove:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'Your profile, name, bio, and avatar',
                  'Access to all TrexaSoft products (TrexaFlow, TrexaMeet, etc.)',
                  'All data associated with your account across every product',
                  'Your login credentials — you will be signed out immediately'
                ].map(item => (
                  <li key={item} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    fontSize: '13px', color: '#4a4458'
                  }}>
                    <div style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: '#be123c', flexShrink: 0, marginTop: '6px'
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ACCOUNT INFO */}
          <div style={{
            border: '1px solid rgba(157,0,255,0.1)',
            borderRadius: '12px', padding: '16px 20px',
            background: '#fafafa', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: '#9D00FF', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#fff',
              fontSize: '14px', fontWeight: 700, flexShrink: 0
            }}>
              {user?.name?.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase() || '?'}
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>{user?.name}</p>
              <p style={{ fontSize: '12px', color: '#8a7fa0' }}>{user?.email}</p>
            </div>
          </div>

          {/* DELETE BUTTON */}
          <button
            onClick={() => set_step('confirm')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#fff0f3', color: '#be123c',
              border: '1px solid rgba(190,18,60,0.25)',
              fontSize: '14px', fontWeight: 600,
              padding: '11px 24px', borderRadius: '9px',
              cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ffe4e6'
              e.currentTarget.style.borderColor = 'rgba(190,18,60,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#fff0f3'
              e.currentTarget.style.borderColor = 'rgba(190,18,60,0.25)'
            }}
          >
            <Trash2 size={14} />
            Delete my account
          </button>
        </>
      )}

      {/* CONFIRM STEP */}
      {(step === 'confirm' || step === 'deleting') && (
        <div style={{
          border: '1px solid rgba(190,18,60,0.2)',
          borderRadius: '14px', overflow: 'hidden'
        }}>
          {/* HEADER */}
          <div style={{
            padding: '16px 24px',
            background: '#fff0f3',
            borderBottom: '1px solid rgba(190,18,60,0.1)',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <AlertCircle size={17} color="#be123c" />
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#be123c' }}>
              Confirm account deletion
            </p>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

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

            {/* CONFIRM PHRASE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="confirm_text" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
                Type{' '}
                <span style={{
                  fontFamily: 'monospace', background: '#f5f5f5',
                  padding: '2px 6px', borderRadius: '4px',
                  color: '#be123c', fontSize: '13px'
                }}>
                  {CONFIRM_PHRASE}
                </span>{' '}
                to confirm
              </label>
              <input
                id="confirm_text"
                type="text"
                placeholder={CONFIRM_PHRASE}
                value={confirm_text}
                onChange={e => { set_confirm_text(e.target.value); set_error('') }}
                disabled={step === 'deleting'}
                style={{
                  width: '100%', padding: '11px 14px',
                  border: `1px solid ${phrase_matches ? 'rgba(190,18,60,0.4)' : 'rgba(157,0,255,0.2)'}`,
                  borderRadius: '9px', fontSize: '15px',
                  color: '#0f0a1a', background: '#ffffff',
                  outline: 'none', fontFamily: "'Satoshi', sans-serif",
                  transition: 'border-color 0.15s, box-shadow 0.15s'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#be123c'
                  e.target.style.boxShadow = '0 0 0 3px rgba(190,18,60,0.08)'
                }}
                onBlur={e => {
                  e.target.style.boxShadow = 'none'
                  e.target.style.borderColor = phrase_matches ? 'rgba(190,18,60,0.4)' : 'rgba(157,0,255,0.2)'
                }}
              />
            </div>

            {/* PASSWORD */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="del_password" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a' }}>
                Enter your password to confirm
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="del_password"
                  type={show_password ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Your current password"
                  value={password}
                  onChange={e => { set_password(e.target.value); set_error('') }}
                  disabled={step === 'deleting'}
                  style={{
                    width: '100%', padding: '11px 44px 11px 14px',
                    border: '1px solid rgba(157,0,255,0.2)',
                    borderRadius: '9px', fontSize: '15px',
                    color: '#0f0a1a', background: '#ffffff',
                    outline: 'none', fontFamily: "'Satoshi', sans-serif",
                    transition: 'border-color 0.15s, box-shadow 0.15s'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#be123c'
                    e.target.style.boxShadow = '0 0 0 3px rgba(190,18,60,0.08)'
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

            {/* ACTIONS */}
            <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
              <button
                type="button"
                onClick={handle_delete}
                disabled={!can_submit || step === 'deleting'}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px',
                  background: !can_submit ? '#fecdd3' : step === 'deleting' ? '#f87171' : '#be123c',
                  color: '#ffffff', fontSize: '14px', fontWeight: 600,
                  padding: '12px', borderRadius: '9px', border: 'none',
                  cursor: !can_submit || step === 'deleting' ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.15s'
                }}
                onMouseEnter={e => { if (can_submit && step !== 'deleting') e.currentTarget.style.opacity = '0.9' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {step === 'deleting' ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Delete permanently
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  set_step('idle')
                  set_password('')
                  set_confirm_text('')
                  set_error('')
                }}
                disabled={step === 'deleting'}
                style={{
                  flex: 1, background: 'none',
                  border: '1px solid rgba(157,0,255,0.2)',
                  borderRadius: '9px', padding: '12px',
                  fontSize: '14px', fontWeight: 500, color: '#4a4458',
                  cursor: step === 'deleting' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => { if (step !== 'deleting') e.currentTarget.style.background = '#f3e6ff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
