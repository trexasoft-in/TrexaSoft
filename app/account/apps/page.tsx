'use client'

import { ExternalLink, CheckCircle2 } from 'lucide-react'

const apps = [
  {
    id: 'trexaflow',
    name: 'TrexaFlow',
    description: 'Team workspace with channels, threads, and real-time messaging.',
    url: 'https://flow.trexasoft.in',
    status: 'active',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    id: 'trexameet',
    name: 'TrexaMeet',
    description: 'Video conferencing and virtual meetings for your team.',
    url: 'https://meet.trexasoft.in',
    status: 'active',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    )
  },
  {
    id: 'repoweave',
    name: 'RepoWeave',
    description: 'Analyze repositories and structure development context into organized outputs.',
    url: 'https://repoweave.trexasoft.in',
    status: 'active',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    )
  }
]

export default function AppsPage() {
  return (
    <div style={{ maxWidth: '640px', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)' }}>

      {/* PAGE TITLE */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800,
          letterSpacing: '-0.025em', color: '#0f0a1a', marginBottom: '6px'
        }}>
          Connected Apps
        </h1>
        <p style={{ fontSize: '14px', color: '#4a4458', lineHeight: 1.6 }}>
          Your TrexaSoft account gives you access to every product below.
          No separate logins needed.
        </p>
      </div>

      {/* ALL APPS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {apps.map(app => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      {/* INFO BANNER */}
      <div style={{
        marginTop: '32px',
        background: '#f3e6ff',
        border: '1px solid rgba(157,0,255,0.15)',
        borderRadius: '12px', padding: '16px 20px',
        display: 'flex', alignItems: 'flex-start', gap: '12px'
      }}>
        <CheckCircle2 size={18} color="#9D00FF" style={{ flexShrink: 0, marginTop: '1px' }} />
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f0a1a', marginBottom: '4px' }}>
            Single sign-on across all products
          </p>
          <p style={{ fontSize: '13px', color: '#4a4458', lineHeight: 1.6 }}>
            When new TrexaSoft products launch, your account will automatically
            have access. No action needed on your end.
          </p>
        </div>
      </div>

    </div>
  )
}

/* ── App Card ── */
function AppCard({ app }: { app: typeof apps[number] }) {
  const is_active = app.status === 'active'

  const card = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '16px',
      padding: '16px 20px',
      background: '#ffffff',
      border: `1px solid ${is_active ? 'rgba(157,0,255,0.15)' : 'rgba(157,0,255,0.08)'}`,
      borderRadius: '12px',
      opacity: is_active ? 1 : 0.65,
      transition: 'box-shadow 0.15s, border-color 0.15s',
      textDecoration: 'none', color: 'inherit',
      cursor: is_active ? 'pointer' : 'default'
    }}
      onMouseEnter={e => {
        if (is_active) {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(157,0,255,0.1)'
          e.currentTarget.style.borderColor = 'rgba(157,0,255,0.3)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = is_active ? 'rgba(157,0,255,0.15)' : 'rgba(157,0,255,0.08)'
      }}
    >
      {/* APP ICON */}
      <div style={{
        width: '44px', height: '44px', borderRadius: '10px',
        background: is_active ? '#f3e6ff' : '#f5f5f5',
        color: is_active ? '#9D00FF' : '#8a7fa0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        {app.icon}
      </div>

      {/* APP INFO */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f0a1a' }}>
            {app.name}
          </p>
          {is_active ? (
            <span style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: '#15803d',
              background: '#f0fdf4', border: '1px solid rgba(22,163,74,0.2)',
              padding: '2px 8px', borderRadius: '99px'
            }}>
              Connected
            </span>
          ) : (
            <span style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: '#8a7fa0',
              background: '#f5f5f5', border: '1px solid rgba(0,0,0,0.07)',
              padding: '2px 8px', borderRadius: '99px'
            }}>
              Coming soon
            </span>
          )}
        </div>
        <p style={{ fontSize: '13px', color: '#4a4458', lineHeight: 1.5 }}>
          {app.description}
        </p>
      </div>

      {/* ARROW */}
      {is_active && (
        <ExternalLink size={15} color="#9D00FF" style={{ flexShrink: 0 }} />
      )}
    </div>
  )

  if (is_active && app.url) {
    return (
      <a href={app.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {card}
      </a>
    )
  }

  return card
}
