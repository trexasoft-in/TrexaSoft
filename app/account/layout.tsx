'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { UserCircle, ShieldCheck, LayoutGrid, Trash2, LogOut, Menu, X } from 'lucide-react'
import { use_auth_store } from '@/lib/store'
import { auth_api } from '@/lib/auth_api'

const nav_items = [
  { href: '/account/profile', label: 'Profile', icon: UserCircle },
  { href: '/account/security', label: 'Security', icon: ShieldCheck },
  { href: '/account/apps', label: 'Connected Apps', icon: LayoutGrid },
  { href: '/account/danger', label: 'Delete Account', icon: Trash2 },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const {
    user,
    access_token,
    refresh_token,
    clear_auth,
    hydrate_auth,
    hydrated,
  } = use_auth_store()

  const [mobile_open, set_mobile_open] = useState(false)
  const [signing_out, set_signing_out] = useState(false)

  useEffect(() => {
    hydrate_auth()
  }, [hydrate_auth])

  useEffect(() => {
    if (!hydrated) return
    if (!access_token) {
      router.replace('/auth/login')
    }
  }, [hydrated, access_token, router])

  useEffect(() => {
    const load_me = async () => {
      if (!hydrated || !access_token || user) return

      try {
        const res = await auth_api.get_me(access_token)
        const me = res.user || res

        use_auth_store.setState((state) => ({
          ...state,
          user: me,
        }))
      } catch (err) {
        console.error('FAILED TO LOAD CURRENT USER:', err)
      }
    }

    load_me()
  }, [hydrated, access_token, user])

  const handle_logout = async () => {
    set_signing_out(true)
    try {
      if (refresh_token) {
        await auth_api.logout(refresh_token)
      }
    } catch {
    } finally {
      clear_auth()
      router.replace('/')
    }
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((w: string) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?'

  if (!hydrated) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          color: '#4a4458',
          fontSize: '14px',
          fontFamily: "'Satoshi', sans-serif",
        }}
      >
        Loading account...
      </div>
    )
  }

  if (!access_token) {
    return null
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      style={{
        width: mobile ? '100%' : '240px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#fafafa',
        borderRight: mobile ? 'none' : '1px solid rgba(157,0,255,0.08)',
        height: mobile ? 'auto' : '100vh',
        position: mobile ? 'relative' : 'sticky',
        top: 0,
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid rgba(157,0,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="TrexaSoft logo">
            <rect width="32" height="32" rx="8" fill="#9D00FF" />
            <path d="M8 10h16M16 10v12M11 16h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#0f0a1a', letterSpacing: '-0.3px' }}>
            TrexaSoft
          </span>
        </Link>
      </div>

      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(157,0,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              width={38}
              height={38}
              style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          ) : (
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#9D00FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
          )}

          <div style={{ overflow: 'hidden' }}>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#0f0a1a',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.name || 'Account'}
            </p>
            <p
              style={{
                fontSize: '11px',
                color: '#8a7fa0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.email || ''}
            </p>
          </div>
        </div>
      </div>

      <nav style={{ padding: '12px', flex: 1 }}>
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#8a7fa0',
            padding: '4px 8px',
            marginBottom: '4px',
          }}
        >
          Account settings
        </p>

        {nav_items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          const is_danger = href.includes('danger')

          return (
            <Link
              key={href}
              href={href}
              onClick={() => set_mobile_open(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 10px',
                borderRadius: '8px',
                marginBottom: '2px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: active ? 600 : 500,
                color: active ? '#9D00FF' : is_danger ? '#be123c' : '#4a4458',
                background: active ? '#f3e6ff' : 'transparent',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = is_danger ? '#fff0f3' : '#f0ebf8'
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon size={15} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '12px', borderTop: '1px solid rgba(157,0,255,0.08)' }}>
        <button
          onClick={handle_logout}
          disabled={signing_out}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 10px',
            borderRadius: '8px',
            background: 'none',
            border: 'none',
            cursor: signing_out ? 'not-allowed' : 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            color: '#4a4458',
            transition: 'background 0.15s, color 0.15s',
            opacity: signing_out ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f0ebf8'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <LogOut size={15} />
          {signing_out ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </aside>
  )

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100dvh',
        fontFamily: "'Satoshi', sans-serif",
        background: '#ffffff',
        color: '#0f0a1a',
      }}
    >
      <div style={{ display: 'none' }} className="sidebar-desktop">
        <Sidebar />
      </div>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(157,0,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          height: '60px',
        }}
        className="mobile-header"
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#9D00FF" />
            <path d="M8 10h16M16 10v12M11 16h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f0a1a' }}>TrexaSoft</span>
        </Link>

        <button
          aria-label={mobile_open ? 'Close menu' : 'Open menu'}
          onClick={() => set_mobile_open((o) => !o)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#4a4458',
            padding: '4px',
          }}
        >
          {mobile_open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobile_open ? (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 49,
            background: '#ffffff',
            overflowY: 'auto',
          }}
          className="mobile-drawer"
        >
          <Sidebar mobile />
        </div>
      ) : null}

      <main style={{ flex: 1, minWidth: 0 }} className="account-main">
        {children}
      </main>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop {
            display: flex !important;
          }
          .mobile-header,
          .mobile-drawer {
            display: none !important;
          }
          .account-main {
            padding-top: 0 !important;
          }
        }

        @media (max-width: 767px) {
          .account-main {
            padding-top: 60px;
          }
        }
      `}</style>
    </div>
  )
}
