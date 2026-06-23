'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

/* ─── Principle icons (inline SVG, no extra deps) ─── */
const icons = {
  Simplicity: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Coordination: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Continuity: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Focus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
}

const principles = [
  { title: 'Simplicity', desc: 'Software should be approachable, clear, and easy to navigate.' },
  { title: 'Coordination', desc: 'Better communication and visibility help teams stay aligned.' },
  { title: 'Continuity', desc: 'Workflows should remain connected rather than fragmented.' },
  { title: 'Focus', desc: 'Every product should have a clear purpose and solve a specific problem.' },
]

const products = [
  {
    name: 'TrexaFlow',
    href: 'https://flow.trexasoft.in',
    tag: 'Communication & workflow coordination',
    desc: 'Bring conversations, tasks, and collaboration into one shared workspace designed for everyday team workflows.',
    icon: <img src="/TrexaFlow_logo_purple.png" alt="TrexaFlow" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />,
  },
  {
    name: 'TrexaMeet',
    href: 'https://meet.trexasoft.in',
    tag: 'Meetings & virtual collaboration',
    desc: 'A space for teams to connect through video meetings, discussions, and real-time collaboration from anywhere.',
    icon: <img src="/TrexaMeet_favicon_purple.png" alt="TrexaMeet" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />,
  },
  {
    name: 'RepoWeave',
    href: 'https://repoweave.trexasoft.in',
    tag: 'Repository context & code understanding',
    desc: 'Analyze repositories and structure development context into organized outputs that can be shared across workflows and AI systems.',
    icon: <img src="/RepoWeave_inappicon_purple.png" alt="RepoWeave" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />,
  },
]

const stats = [
  { number: '3+', label: 'Products' },
  { number: '1', label: 'Ecosystem' },
  { number: '∞', label: 'Workflows' },
  { number: 'Free', label: 'To get started' },
]

export default function HomePage() {
  return (
    <>
      {/* PAGE-LEVEL STYLES — all scoped to hp- prefix, no conflict with other pages */}
      <style>{`
        .hp-skip-link {
          position: absolute; top: -48px; left: 16px; z-index: 9999;
          background: #9D00FF; color: #fff; padding: 8px 16px;
          border-radius: 8px; font-size: 14px; font-weight: 600;
          transition: top 0.2s; text-decoration: none;
        }
        .hp-skip-link:focus { top: 16px; }

        .hp-navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid rgba(157,0,255,0.08);
        }
        .hp-navbar-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 24px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .hp-nav-signin {
          font-size: 14px; font-weight: 500; color: #4a4458;
          padding: 8px 16px; border-radius: 8px; text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .hp-nav-signin:hover { background: rgba(157,0,255,0.07); color: #9D00FF; }
        .hp-nav-cta {
          font-size: 14px; font-weight: 600; color: #fff;
          background: #9D00FF; padding: 8px 20px; border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(157,0,255,0.28);
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .hp-nav-cta:hover { background: #8200d4; transform: translateY(-1px); box-shadow: 0 4px 18px rgba(157,0,255,0.34); }

        .hp-hero {
          position: relative; overflow: hidden;
          padding: clamp(80px, 12vw, 96px) 24px clamp(64px, 10vw, 96px);
          text-align: center; display: flex; flex-direction: column; align-items: center;
        }
        .hp-hero::before {
          content: ''; position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
          width: 900px; height: 600px; pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(157,0,255,0.055) 0%, transparent 70%);
          z-index: 0;
        }
        .hp-hero-inner { position: relative; z-index: 1; max-width: 740px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .hp-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(157,0,255,0.07); border: 1px solid rgba(157,0,255,0.18);
          color: #9D00FF; font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 99px; margin-bottom: 20px;
        }
        .hp-hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #9D00FF; flex-shrink: 0; }
        .hp-hero-h1 {
          font-size: clamp(2.25rem, 6vw, 3.5rem);
          font-weight: 800; line-height: 1.08; letter-spacing: -0.04em;
          color: #0f0a1a; margin-bottom: 24px; max-width: 760px;
        }
        .hp-hero-desc-p { font-size: clamp(1.05rem, 2.5vw, 1.2rem); line-height: 1.75; color: #4a4458; margin-bottom: 16px; max-width: 600px; }
        .hp-hero-desc-s { font-size: 1rem; line-height: 1.85; color: #6b6477; max-width: 600px; }
        .hp-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 36px; }
        .hp-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #9D00FF; color: #fff;
          font-size: 15px; font-weight: 700;
          padding: 14px 32px; border-radius: 12px; text-decoration: none;
          box-shadow: 0 6px 28px rgba(157,0,255,0.30);
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .hp-cta-primary:hover { background: #8200d4; transform: translateY(-2px); box-shadow: 0 12px 36px rgba(157,0,255,0.38); }
        .hp-cta-secondary {
          display: inline-flex; align-items: center; gap: 6px;
          color: #0f0a1a; font-size: 15px; font-weight: 600;
          padding: 14px 28px; border-radius: 12px;
          border: 1.5px solid rgba(157,0,255,0.16); background: #fafafa;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s, transform 0.15s;
          box-shadow: 0 1px 4px rgba(157,0,255,0.06);
        }
        .hp-cta-secondary:hover { background: rgba(157,0,255,0.07); border-color: rgba(157,0,255,0.28); transform: translateY(-1px); }

        .hp-statbar {
          background: #fafafa;
          border-top: 1px solid rgba(157,0,255,0.06);
          border-bottom: 1px solid rgba(157,0,255,0.06);
        }
        .hp-statbar-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 24px;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .hp-stat {
          display: flex; flex-direction: column; align-items: center;
          gap: 4px; padding: 28px 16px; text-align: center;
          border-right: 1px solid rgba(157,0,255,0.06);
        }
        .hp-stat:last-child { border-right: none; }
        .hp-stat-number { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; color: #9D00FF; letter-spacing: -0.03em; }
        .hp-stat-label { font-size: 11px; color: #8a7fa0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; }

        .hp-section { padding: clamp(64px, 8vw, 96px) 24px; }
        .hp-section-center { max-width: 860px; margin: 0 auto; text-align: center; }
        .hp-section-label {
          display: inline-block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #9D00FF; margin-bottom: 12px;
        }
        .hp-section-h2 {
          font-size: clamp(1.875rem, 4vw, 2.75rem); font-weight: 800;
          color: #0f0a1a; letter-spacing: -0.03em; margin-bottom: 20px;
        }
        .hp-section-p { font-size: 1.05rem; line-height: 1.9; color: #4a4458; }

        .hp-principles { background: #fafafa; border-top: 1px solid rgba(157,0,255,0.06); border-bottom: 1px solid rgba(157,0,255,0.06); }
        .hp-principles-grid {
          max-width: 1200px; margin: 48px auto 0;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;
        }
        .hp-principle-card {
          background: #fff; padding: 28px; border-radius: 16px;
          border: 1px solid rgba(157,0,255,0.08);
          position: relative; overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
        }
        .hp-principle-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #9D00FF, transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .hp-principle-card:hover { box-shadow: 0 8px 28px rgba(157,0,255,0.10); transform: translateY(-3px); border-color: rgba(157,0,255,0.18); }
        .hp-principle-card:hover::before { opacity: 1; }
        .hp-principle-icon {
          width: 36px; height: 36px; background: rgba(157,0,255,0.08);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          color: #9D00FF; margin-bottom: 18px;
        }
        .hp-principle-title { font-size: 15px; font-weight: 700; color: #0f0a1a; margin-bottom: 8px; }
        .hp-principle-desc { font-size: 14px; color: #4a4458; line-height: 1.7; }

        .hp-products { background: #fff; border-top: 1px solid rgba(157,0,255,0.06); }
        .hp-products-header { max-width: 1200px; margin: 0 auto 48px; text-align: center; }
        .hp-products-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;
        }
        .hp-product-card {
          background: #fafafa; border: 1px solid rgba(157,0,255,0.08); border-radius: 20px;
          padding: 32px; display: flex; flex-direction: column; gap: 20px;
          text-decoration: none; color: inherit; position: relative; overflow: hidden;
          box-shadow: 0 2px 8px rgba(157,0,255,0.03);
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s, border-color 0.2s;
        }
        .hp-product-card::after {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(135deg, rgba(157,0,255,0.05) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.2s; pointer-events: none;
        }
        .hp-product-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(157,0,255,0.13); border-color: rgba(157,0,255,0.22); }
        .hp-product-card:hover::after { opacity: 1; }
        .hp-product-top { display: flex; align-items: flex-start; justify-content: space-between; position: relative; z-index: 1; }
        .hp-product-arrow {
          width: 36px; height: 36px; border-radius: 99px;
          border: 1.5px solid rgba(157,0,255,0.16); background: #fff;
          display: flex; align-items: center; justify-content: center;
          color: #9D00FF; flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .hp-product-card:hover .hp-product-arrow { background: #9D00FF; border-color: #9D00FF; color: #fff; transform: translate(2px, -2px); }
        .hp-product-info { position: relative; z-index: 1; }
        .hp-product-name { font-size: 18px; font-weight: 700; color: #0f0a1a; margin-bottom: 4px; }
        .hp-product-tag { font-size: 12px; font-weight: 700; color: #9D00FF; margin-bottom: 10px; line-height: 1.4; text-transform: uppercase; letter-spacing: 0.05em; }
        .hp-product-desc { font-size: 14px; line-height: 1.65; color: #4a4458; }

        .hp-footer { border-top: 1px solid rgba(157,0,255,0.08); background: #fafafa; padding: 48px 24px; }
        .hp-footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 16px; align-items: center; text-align: center;
        }
        .hp-footer-tagline { font-size: 14px; color: #4a4458; }
        .hp-footer-copy { font-size: 13px; color: #8a7fa0; }

        @media (max-width: 640px) {
          .hp-statbar-inner { grid-template-columns: repeat(2, 1fr); }
          .hp-stat:nth-child(2) { border-right: none; }
          .hp-stat:nth-child(3), .hp-stat:nth-child(4) { border-top: 1px solid rgba(157,0,255,0.06); }
        }
        @media (max-width: 400px) {
          .hp-statbar-inner { grid-template-columns: 1fr; }
          .hp-stat { border-right: none !important; border-top: 1px solid rgba(157,0,255,0.06); }
          .hp-stat:first-child { border-top: none; }
        }
      `}</style>

      <div style={{ background: '#ffffff', color: '#0f0a1a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* SKIP LINK */}
        <a href="#main" className="hp-skip-link">Skip to content</a>

        {/* NAVBAR */}
        <header className="hp-navbar" role="banner">
          <div className="hp-navbar-inner">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="TrexaSoft home">
              <img src="/trexasoft_text_purple.png" alt="TrexaSoft" style={{ height: '34px', width: 'auto' }} />
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} aria-label="Main navigation">
              <Link href="/auth/login" className="hp-nav-signin">Sign in</Link>
              <Link href="/auth/signup" className="hp-nav-cta">Get started</Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main id="main" style={{ flex: 1 }}>

          {/* HERO */}
          <section className="hp-hero" aria-label="Hero">
            <div className="hp-hero-inner">
              <div style={{ marginBottom: '32px' }}>
                <img
                  src="/trexasoft_text_purple.png"
                  alt="TrexaSoft"
                  style={{ height: '96px', width: 'auto', filter: 'drop-shadow(0 8px 28px rgba(157,0,255,0.10))' }}
                />
              </div>
              <div className="hp-hero-badge">
                <span className="hp-hero-badge-dot" />
                Productivity suite for modern teams
              </div>
              <h1 className="hp-hero-h1">Focused tools for growing teams.</h1>
              <p className="hp-hero-desc-p">
                Tools built around the way teams communicate, organize, and work together through simpler and more connected workflows.
              </p>
              <p className="hp-hero-desc-s">
                From planning and coordination to meetings and development workflows,
                TrexaSoft supports the activities that shape how teams collaborate every day.
                Each product is designed around a specific purpose while contributing to a
                broader ecosystem of connected experiences.
              </p>
              <div className="hp-hero-ctas">
                <Link href="/auth/signup" className="hp-cta-primary">
                  Create free account
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="#products" className="hp-cta-secondary">
                  Explore products
                </Link>
              </div>
            </div>
          </section>

          {/* STAT BAR */}
          <div className="hp-statbar" role="presentation">
            <div className="hp-statbar-inner">
              {stats.map((s) => (
                <div key={s.label} className="hp-stat">
                  <span className="hp-stat-number">{s.number}</span>
                  <span className="hp-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SUPPORTING THE FLOW */}
          <section className="hp-section" style={{ background: '#ffffff' }} aria-label="Supporting the flow of work">
            <div className="hp-section-center">
              <span className="hp-section-label">Philosophy</span>
              <h2 className="hp-section-h2">Supporting the flow of work</h2>
              <p className="hp-section-p">
                Modern work depends on communication, planning, coordination, and access
                to information. TrexaSoft develops products that support these activities,
                helping teams stay organized as projects, discussions, and decisions move
                forward.
              </p>
            </div>
          </section>

          {/* PRINCIPLES */}
          <section className={`hp-section hp-principles`} aria-label="Principles">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center' }}>
                <span className="hp-section-label">Our approach</span>
                <h2 className="hp-section-h2">Built on simple principles</h2>
              </div>
              <div className="hp-principles-grid">
                {principles.map((item) => (
                  <div key={item.title} className="hp-principle-card">
                    <div className="hp-principle-icon">{icons[item.title as keyof typeof icons]}</div>
                    <p className="hp-principle-title">{item.title}</p>
                    <p className="hp-principle-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRODUCTS */}
          <section id="products" className={`hp-section hp-products`} aria-label="Products">
            <div className="hp-products-header">
              <span className="hp-section-label">Products</span>
              <h2 className="hp-section-h2">Seamless utilities for productivity</h2>
            </div>
            <div className="hp-products-grid">
              {products.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="hp-product-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="hp-product-top">
                    <div style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {product.icon}
                    </div>
                    <div className="hp-product-arrow" aria-hidden="true">
                      <ArrowUpRight size={16} strokeWidth={2.2} />
                    </div>
                  </div>
                  <div className="hp-product-info">
                    <p className="hp-product-name">{product.name}</p>
                    <p className="hp-product-tag">{product.tag}</p>
                    <p className="hp-product-desc">{product.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ECOSYSTEM */}
          <section className="hp-section" style={{ background: '#fafafa', borderTop: '1px solid rgba(157,0,255,0.06)' }} aria-label="Ecosystem">
            <div className="hp-section-center">
              <span className="hp-section-label">Ecosystem</span>
              <h2 className="hp-section-h2">A growing ecosystem of products</h2>
              <p className="hp-section-p">
                TrexaSoft brings together tools for communication, collaboration,
                scheduling, and development workflows. Each product serves a distinct
                purpose while contributing to a broader ecosystem designed around the
                needs of modern teams.
              </p>
            </div>
          </section>

          {/* BUILT FOR GROWING TEAMS */}
          <section className="hp-section" style={{ background: '#ffffff', borderTop: '1px solid rgba(157,0,255,0.06)' }} aria-label="Built for growing teams">
            <div className="hp-section-center">
              <span className="hp-section-label">Who it&apos;s for</span>
              <h2 className="hp-section-h2">Built for growing teams</h2>
              <p className="hp-section-p">
                From independent professionals and project-based teams to growing
                businesses, TrexaSoft supports the workflows that help work move forward
                every day.
              </p>
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="hp-footer">
          <div className="hp-footer-inner">
            <img src="/trexasoft_text_purple.png" alt="TrexaSoft" style={{ height: '22px', width: 'auto' }} />
            <p className="hp-footer-tagline">Focused tools for growing teams.</p>
            <p className="hp-footer-copy">&copy; {new Date().getFullYear()} TrexaSoft. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  )
}