'use client'

import Link from 'next/link'
import {
  MessageSquare,
  Video,
  Calendar,
  Code2,
  ArrowRight,
  ArrowUpRight,
  Mail,
  ExternalLink
} from 'lucide-react'

// Custom high-quality SVG Brand Icons (since Lucide v1.0+ has removed all brand icons)
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  )
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  )
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <div style={{ background: '#ffffff', color: '#0f0a1a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* SKIP LINK FOR ACCESSIBILITY */}
      <a
        href="#main"
        style={{
          position: 'absolute', top: '-40px', left: '16px', zIndex: 9999,
          background: '#9D00FF', color: '#fff', padding: '8px 16px',
          borderRadius: '6px', fontSize: '14px', fontWeight: 600,
          transition: 'top 0.2s', textDecoration: 'none'
        }}
        onFocus={e => (e.currentTarget.style.top = '16px')}
        onBlur={e => (e.currentTarget.style.top = '-40px')}
      >
        Skip to content
      </a>

      {/* NAVBAR */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(157,0,255,0.08)'
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '0 24px', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          {/* BRAND LOGO */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/trexasoft_text_purple.png"
              alt="TrexaSoft Logo"
              style={{ height: '36px', width: 'auto' }}
            />
          </Link>

          {/* AUTH CONTEXT LINKS */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/auth/login" style={{
              fontSize: '14px', fontWeight: 500, color: '#4a4458',
              padding: '8px 16px', borderRadius: '8px',
              textDecoration: 'none', transition: 'background 0.15s'
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f4f0f9')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Sign in
            </Link>
            <Link href="/auth/signup" style={{
              fontSize: '14px', fontWeight: 600, color: '#ffffff',
              background: '#9D00FF', padding: '8px 20px',
              borderRadius: '8px', textDecoration: 'none',
              transition: 'opacity 0.15s'
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main id="main" style={{ flex: 1 }}>

        {/* HERO SECTION */}
        <section style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: 'clamp(80px, 12vw, 60px) 24px clamp(64px, 10vw, 110px)',
          textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          {/* Large Centered Brand Logo */}
          <div style={{
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src="/trexasoft_text_purple.png"
              alt="TrexaSoft Brand Logo"
              style={{
                height: '120px',
                width: 'auto',
                filter: 'drop-shadow(0 8px 24px rgba(157, 0, 255, 0.08))'
              }}
            />
          </div>

          {/* Tagline */}
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 2.5rem)',
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-0.04em', color: '#0f0a1a',
            marginBottom: '24px', maxWidth: '800px'
          }}>
            {/* Focused tools for <span style={{ color: '#9D00FF' }}>growing teams.</span> */}
            Focused tools for growing teams.
          </h1>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
            lineHeight: 1.6, color: '#4a4458',
            marginBottom: '40px', maxWidth: '640px'
          }}>
            Tools built around the way teams communicate, organize, and work together through simpler and more connected workflows.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/auth/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#9D00FF', color: '#ffffff',
              fontSize: '15px', fontWeight: 600,
              padding: '14px 32px', borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(157,0,255,0.25)',
              transition: 'all 0.15s ease'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Create free account
              <ArrowRight size={16} />
            </Link>
            <Link href="#products" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: '#0f0a1a', fontSize: '15px', fontWeight: 600,
              padding: '14px 28px', borderRadius: '10px',
              border: '1px solid #e8e0f0', background: '#fafafa',
              textDecoration: 'none', transition: 'all 0.15s ease'
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f4f0f9')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fafafa')}
            >
              Explore products
            </Link>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" style={{
          background: '#fafafa',
          borderTop: '1px solid rgba(157,0,255,0.06)',
          borderBottom: '1px solid rgba(157,0,255,0.06)',
          padding: 'clamp(64px, 10vw, 96px) 24px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span style={{
                fontSize: '16pt', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#9D00FF', display: 'inline-block', marginBottom: '12px'
              }}>
                Products
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f0a1a', letterSpacing: '-0.025em' }}>
                Seamless utilities for productivity
              </h2>
            </div>

            {/* 2x2 MODERN PRODUCT GRID */}
            <div className="products-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {[
                {
                  name: 'TrexaFlow',
                  href: 'https://flow.trexasoft.in',
                  tag: 'Communication & workflow coordination',
                  desc: 'Bring conversations, tasks, and collaboration into one shared workspace designed for everyday team workflows.',
                  icon: (
                    <img
                      src="/TrexaFlow_logo_purple.png"
                      alt="TrexaFlow"
                      style={{ width: '72px', height: '72px', objectFit: 'contain' }}
                    />
                  )
                },
                {
                  name: 'TrexaMeet',
                  href: 'https://meet.trexasoft.in',
                  tag: 'Meetings & virtual collaboration',
                  desc: 'A space for teams to connect through video meetings, discussions, and real-time collaboration from anywhere.',
                  icon: (
                    <img
                      src="TrexaMeet_favicon_purple.png"
                      alt="TrexaMeet"
                      style={{ width: '72px', height: '72px', objectFit: 'contain' }}
                    />
                  )
                },
                {
                  name: 'RepoWeave',
                  href: 'https://repoweave.trexasoft.in',
                  tag: 'Repository context & code understanding',
                  desc: 'Analyze repositories and structure development context into organized outputs that can be shared across workflows and AI systems.',
                  icon: (
                    <img
                      src="/RepoWeave_inappicon_purple.png"
                      alt="RepoWeave"
                      style={{ width: '72px', height: '72px', objectFit: 'contain' }}
                    />
                  )
                }
              ].map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(157,0,255,0.08)',
                    borderRadius: '16px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 4px 16px rgba(157,0,255,0.02)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                  className="product-card"
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(157,0,255,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(157,0,255,0.2)'

                    const indicator = e.currentTarget.querySelector('.product-card-indicator') as HTMLDivElement | null
                    if (indicator) {
                      indicator.style.transform = 'translate(2px, -2px)'
                      indicator.style.background = '#f3e6ff'
                      indicator.style.borderColor = 'rgba(157,0,255,0.22)'
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(157,0,255,0.02)'
                    e.currentTarget.style.borderColor = 'rgba(157,0,255,0.08)'

                    const indicator = e.currentTarget.querySelector('.product-card-indicator') as HTMLDivElement | null
                    if (indicator) {
                      indicator.style.transform = 'translate(0, 0)'
                      indicator.style.background = '#faf7ff'
                      indicator.style.borderColor = 'rgba(157,0,255,0.14)'
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '10px',
                      background: '',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {product.icon}
                    </div>

                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '999px',
                        border: '1px solid rgba(157,0,255,0.14)',
                        background: '#faf7ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9D00FF',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                      }}
                      className="product-card-indicator"
                      aria-hidden="true"
                    >
                      <ArrowUpRight size={16} strokeWidth={2.2} />
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f0a1a', marginBottom: '4px' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#9D00FF', marginBottom: '12px', lineHeight: 1.4 }}>
                      {product.tag}
                    </p>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#4a4458' }}>
                      {product.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* SOCIAL SECTION */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(64px, 8vw, 96px) 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto', marginBottom: '32px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0f0a1a', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Connect with TrexaSoft
            </h2>
            <p style={{ fontSize: '14px', color: '#4a4458', lineHeight: 1.6 }}>
              Updates, projects, and product developments across the TrexaSoft ecosystem.
            </p>
          </div>

          {/* Minimal Icon Row */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'GitHub', icon: <GithubIcon size={18} />, url: 'https://github.com' },
              { label: 'LinkedIn', icon: <LinkedinIcon size={18} />, url: 'https://linkedin.com' },
              { label: 'X (Twitter)', icon: <TwitterIcon size={18} />, url: 'https://x.com' },
              { label: 'YouTube', icon: <YoutubeIcon size={18} />, url: 'https://youtube.com' },
              { label: 'Email / Contact', icon: <Mail size={18} />, url: 'mailto:contact@trexasoft.com' }
            ].map(social => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  border: '1px solid #e8e0f0', background: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#4a4458', transition: 'all 0.15s ease', textDecoration: 'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#9D00FF'
                  e.currentTarget.style.borderColor = '#9D00FF'
                  e.currentTarget.style.background = '#f3e6ff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#4a4458'
                  e.currentTarget.style.borderColor = '#e8e0f0'
                  e.currentTarget.style.background = '#ffffff'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(157,0,255,0.08)', background: '#fafafa', padding: '48px 24px' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', flexDirection: 'column', gap: '24px',
          alignItems: 'center', textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/trexasoft_text_purple.png"
              alt="TrexaSoft brand icon"
              style={{ height: '24px', width: 'auto' }}
            />
          </div>

          <p style={{ fontSize: '14px', color: '#4a4458', margin: 0 }}>
            Focused tools for growing teams.
          </p>

          <p style={{ fontSize: '13px', color: '#8a7fa0', margin: 0 }}>
            &copy; {new Date().getFullYear()} TrexaSoft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}