'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

/* ─── Principle icons (inline SVG, no extra deps) ─── */
const icons = {
  Simplicity: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Coordination: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Continuity: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Focus: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
}

const principles = [
  { title: 'Simplicity', desc: 'Should be approachable, clear, and easy to navigate.' },
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .hp-container {
          --primary: #9D00FF;
          --primary-hover: #8200d4;
          --primary-light: rgba(157, 0, 255, 0.08);
          --text-main: #0f0a1a;
          --text-muted: #4a4458;
          --text-light: #8a7fa0;
          --bg-main: #ffffff;
          --bg-alt: #fafafa;
          --border: rgba(157, 0, 255, 0.08);
          
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: var(--bg-main);
          color: var(--text-main);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          /* overflow-x: hidden removed to fix position: sticky */
          -webkit-font-smoothing: antialiased;
        }

        /* Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes blobBounce {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(157,0,255,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(157,0,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(157,0,255,0); }
        }

        .hp-skip-link {
          position: absolute; top: -48px; left: 16px; z-index: 9999;
          background: var(--primary); color: #fff; padding: 8px 16px;
          border-radius: 8px; font-size: 14px; font-weight: 600;
          transition: top 0.2s; text-decoration: none;
        }
        .hp-skip-link:focus { top: 16px; }

        /* Navbar */
        .hp-navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
        }
        .hp-navbar-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 24px; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .hp-nav-signin {
          font-size: 15px; font-weight: 500; color: var(--text-muted);
          padding: 8px 20px; border-radius: 99px; text-decoration: none;
          transition: all 0.2s ease;
        }
        .hp-nav-signin:hover { background: var(--primary-light); color: var(--primary); }
        .hp-nav-cta {
          font-size: 15px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, var(--primary) 0%, #c471ed 100%);
          padding: 10px 24px; border-radius: 99px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(157,0,255,0.25);
          transition: all 0.3s ease;
          background-size: 200% 200%;
        }
        .hp-nav-cta:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 8px 25px rgba(157,0,255,0.35); 
          background-position: right center;
        }

        /* Hero */
        .hp-hero {
          position: relative; overflow: hidden;
          padding: clamp(70px, 10vw, 70px) 24px clamp(60px, 8vw, 90px);
          text-align: center; display: flex; flex-direction: column; align-items: center;
        }
        .hp-hero-bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          overflow: hidden; z-index: 0; pointer-events: none;
        }
        .hp-hero-blob {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(157,0,255,0.08) 0%, transparent 60%);
          filter: blur(80px);
          animation: blobBounce 15s infinite alternate ease-in-out;
        }
        .hp-hero-blob-2 {
          position: absolute; top: 20%; right: -20%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(196,113,237,0.08) 0%, transparent 60%);
          filter: blur(80px);
          animation: blobBounce 20s infinite alternate-reverse ease-in-out;
        }

        .hp-hero-inner { 
          position: relative; z-index: 1; max-width: 860px; margin: 0 auto; 
          display: flex; flex-direction: column; align-items: center; 
          opacity: 0; animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .hp-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(157,0,255,0.2);
          color: var(--primary); font-size: 13px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          padding: 8px 20px; border-radius: 99px; margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(157,0,255,0.1);
          transition: all 0.3s ease;
        }
        .hp-hero-badge:hover { transform: translateY(-2px); box-shadow: 0 6px 25px rgba(157,0,255,0.15); border-color: rgba(157,0,255,0.3); }
        .hp-hero-badge-dot { 
          width: 8px; height: 8px; border-radius: 50%; 
          background: var(--primary); flex-shrink: 0;
          animation: pulseGlow 2s infinite;
        }

        .hp-hero-h1 {
          font-size: clamp(3rem, 7vw, 5rem);
          font-weight: 800; line-height: 1.1; letter-spacing: -0.03em;
          margin-bottom: 18px; max-width: 860px;
          background: linear-gradient(135deg, #0f0a1a 0%, #4a3b69 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hp-hero-desc-p { 
          font-size: clamp(1.15rem, 2.5vw, 1.35rem); line-height: 1.6; 
          color: var(--text-muted); margin-bottom: 16px; max-width: 700px; 
          font-weight: 400;
        }
        .hp-hero-desc-s { 
          font-size: 1.05rem; line-height: 1.7; 
          color: var(--text-light); max-width: 700px; 
          font-weight: 300;
        }
        .hp-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 32px; }
        
        .hp-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, var(--primary) 0%, #c471ed 100%);
          color: #fff; font-size: 16px; font-weight: 600;
          padding: 16px 36px; border-radius: 99px; text-decoration: none;
          box-shadow: 0 10px 30px rgba(157,0,255,0.3);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background-size: 200% 200%;
        }
        .hp-cta-primary:hover { 
          transform: translateY(-4px) scale(1.02); 
          box-shadow: 0 15px 40px rgba(157,0,255,0.4); 
          background-position: right center;
        }
        .hp-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          color: var(--text-main); font-size: 16px; font-weight: 600;
          padding: 16px 36px; border-radius: 99px;
          border: 1px solid rgba(157,0,255,0.2); 
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .hp-cta-secondary:hover { 
          background: #fff; border-color: var(--primary); 
          transform: translateY(-4px) scale(1.02); 
          box-shadow: 0 10px 25px rgba(157,0,255,0.1); 
        }

        /* Stat Bar */
        .hp-statbar-wrapper {
          position: relative; z-index: 10;
          margin-top: -45px; padding: 0 24px;
        }
        .hp-statbar-inner {
          max-width: 1000px; margin: 0 auto;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
          display: grid; grid-template-columns: repeat(4, 1fr);
          overflow: hidden;
        }
        .hp-stat {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; padding: 28px 20px; text-align: center;
          position: relative;
        }
        .hp-stat:not(:last-child)::after {
          content: ''; position: absolute; right: 0; top: 25%; bottom: 25%; width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(157,0,255,0.15), transparent);
        }
        .hp-stat-number { 
          font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 800; 
          background: linear-gradient(135deg, var(--primary) 0%, #c471ed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          letter-spacing: -0.04em; line-height: 1;
        }
        .hp-stat-label { 
          font-size: 13px; color: var(--text-light); font-weight: 700; 
          text-transform: uppercase; letter-spacing: 0.1em; 
        }

        /* Sections */
        .hp-section { padding: clamp(48px, 6vw, 80px) 24px; position: relative; }
        .hp-section-center { max-width: 800px; margin: 0 auto; text-align: center; }
        .hp-section-label {
          display: inline-block; font-size: 13px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 14px;
          background: var(--primary-light); padding: 6px 16px; border-radius: 99px;
        }
        .hp-section-h2 {
          font-size: clamp(2rem, 5vw, 2.5rem); font-weight: 800;
          color: var(--text-main); letter-spacing: -0.03em; margin-bottom: 16px;
          line-height: 1.1;
        }
        .hp-section-p { 
          font-size: 1.15rem; line-height: 1.8; color: var(--text-muted); 
          font-weight: 400; max-width: 700px; margin: 0 auto;
        }

        /* Philosophy */
        .hp-philosophy { background: linear-gradient(to bottom, #ffffff, var(--bg-alt)); }

        /* Principles */
        .hp-principles { background: var(--bg-alt); position: relative; }
        .hp-principles-grid {
          max-width: 1200px; margin: 40px auto 0;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;
        }
        .hp-principle-card {
          background: #fff; padding: 36px 28px; border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.03);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        .hp-principle-card::before {
          content: ''; position: absolute; inset: 0;
          border-radius: inherit; padding: 2px;
          background: linear-gradient(135deg, rgba(157,0,255,0.4), transparent, transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.4s; z-index: -1;
        }
        .hp-principle-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px rgba(157,0,255,0.08); 
        }
        .hp-principle-card:hover::before { opacity: 1; }
        .hp-principle-icon {
          width: 64px; height: 64px; 
          background: linear-gradient(135deg, rgba(157,0,255,0.1) 0%, rgba(196,113,237,0.1) 100%);
          border-radius: 20px; display: flex; align-items: center; justify-content: center;
          color: var(--primary); margin-bottom: 20px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hp-principle-card:hover .hp-principle-icon { transform: scale(1.1) rotate(5deg); }
        .hp-principle-title { font-size: 22px; font-weight: 700; color: var(--text-main); margin-bottom: 12px; }
        .hp-principle-desc { font-size: 16px; color: var(--text-muted); line-height: 1.6; }

        /* Products */
        .hp-products { 
          background: linear-gradient(to bottom, #ffffff 0%, #faf8ff 50%, #ffffff 100%);
          position: relative;
        }
        .hp-products-header { max-width: 1200px; margin: 0 auto 40px; text-align: center; }
        .hp-products-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 28px;
        }
        .hp-product-card {
          background: #ffffff; 
          border: 1.5px solid rgba(157, 0, 255, 0.18); 
          border-radius: 24px;
          padding: 38px 32px; display: flex; flex-direction: column; gap: 24px;
          text-decoration: none; color: inherit; position: relative; overflow: hidden;
          box-shadow: 0 10px 30px rgba(157, 0, 255, 0.05), 0 2px 4px rgba(157, 0, 255, 0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        .hp-product-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 300px;
          background: radial-gradient(circle at top left, rgba(157,0,255,0.08) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.4s; z-index: -1;
        }
        /* Glowing top accent stripe */
        .hp-product-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--primary) 0%, #c471ed 100%);
          opacity: 0.3; transition: opacity 0.3s ease;
        }
        .hp-product-card:hover { 
          transform: translateY(-10px); 
          box-shadow: 0 25px 50px rgba(157, 0, 255, 0.12), 0 1px 2px rgba(157, 0, 255, 0.05); 
          background: #ffffff;
          border-color: rgba(157, 0, 255, 0.45);
        }
        .hp-product-card:hover::before { opacity: 1; }
        .hp-product-card:hover::after { opacity: 1; }
        .hp-product-top { display: flex; align-items: flex-start; justify-content: space-between; position: relative; z-index: 1; }
        .hp-product-icon-wrap {
          width: 88px; height: 88px; display: flex; align-items: center; justify-content: center;
          background: #ffffff; border-radius: 20px;
          border: 1px solid rgba(157, 0, 255, 0.08);
          box-shadow: 0 8px 24px rgba(157, 0, 255, 0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hp-product-card:hover .hp-product-icon-wrap { 
          transform: scale(1.05); 
          border-color: rgba(157, 0, 255, 0.20);
          box-shadow: 0 12px 30px rgba(157, 0, 255, 0.12);
        }
        .hp-product-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(157, 0, 255, 0.04); border: 1px solid rgba(157, 0, 255, 0.08);
          display: flex; align-items: center; justify-content: center;
          color: var(--primary); flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .hp-product-card:hover .hp-product-arrow { 
          background: var(--primary); border-color: var(--primary); 
          color: #fff; transform: translate(3px, -3px) rotate(45deg); 
          box-shadow: 0 4px 12px rgba(157, 0, 255, 0.3);
        }
        .hp-product-info { position: relative; z-index: 1; margin-top: auto; }
        .hp-product-name { font-size: 26px; font-weight: 800; color: var(--text-main); margin-bottom: 10px; letter-spacing: -0.02em; }
        .hp-product-tag { 
          display: inline-block;
          font-size: 11px; font-weight: 700; color: var(--primary); 
          background: var(--primary-light); 
          padding: 6px 14px; border-radius: 99px;
          margin-bottom: 16px; line-height: 1; 
          text-transform: uppercase; letter-spacing: 0.05em; 
        }
        .hp-product-desc { font-size: 16px; line-height: 1.6; color: var(--text-muted); }

        /* Ecosystem */
        .hp-ecosystem {
          background: var(--bg-alt);
          position: relative; overflow: hidden;
        }
        .hp-ecosystem::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(157,0,255,0.03) 0%, transparent 60%);
          z-index: 0; pointer-events: none;
        }
        
        /* Built For */
        .hp-built-for {
          background: #fff;
        }
        
        /* Footer */
        .hp-footer { 
          border-top: 1px solid rgba(0,0,0,0.05); 
          background: var(--bg-main); 
          padding: 48px 24px; 
          position: relative; z-index: 1;
        }
        .hp-footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 24px; align-items: center; text-align: center;
        }
        .hp-footer-tagline { font-size: 16px; color: var(--text-muted); font-weight: 500; }
        .hp-footer-copy { font-size: 14px; color: var(--text-light); }

        /* Responsive */
        @media (max-width: 900px) {
          .hp-statbar-inner { grid-template-columns: repeat(2, 1fr); border-radius: 16px; }
          .hp-stat:nth-child(2)::after { display: none; }
          .hp-stat:nth-child(1), .hp-stat:nth-child(2) { border-bottom: 1px solid rgba(157,0,255,0.08); }
        }
        @media (max-width: 600px) {
          .hp-statbar-inner { grid-template-columns: 1fr; }
          .hp-stat { padding: 24px 20px; }
          .hp-stat:not(:last-child)::after { display: none; }
          .hp-stat:not(:last-child) { border-bottom: 1px solid rgba(157,0,255,0.08); }
          .hp-hero { padding: 60px 20px 80px; }
          .hp-hero-h1 { font-size: 2.5rem; }
          .hp-section-h2 { font-size: 2rem; }
          .hp-product-card { padding: 28px 20px; }
        }
      `}</style>

      <div className="hp-container">

        {/* SKIP LINK */}
        <a href="#main" className="hp-skip-link">Skip to content</a>

        {/* NAVBAR */}
        <header className="hp-navbar" role="banner">
          <div className="hp-navbar-inner">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="TrexaSoft home">
              <img src="/trexasoft_text_purple.png" alt="TrexaSoft" style={{ height: '36px', width: 'auto' }} />
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} aria-label="Main navigation">
              <Link href="/auth/login" className="hp-nav-signin">Sign in</Link>
              <Link href="/auth/signup" className="hp-nav-cta">Get started</Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main id="main" style={{ flex: 1 }}>

          {/* HERO */}
          <section className="hp-hero" aria-label="Hero">
            <div className="hp-hero-bg">
              <div className="hp-hero-blob"></div>
              <div className="hp-hero-blob-2"></div>
            </div>
            <div className="hp-hero-inner">
              <div style={{ marginBottom: '0px' }}>
                <img
                  src="/trexasoft_text_purple.png"
                  alt="TrexaSoft"
                  style={{ height: '150px', width: 'auto', filter: 'drop-shadow(0 10px 30px rgba(157,0,255,0.15))' }}
                />
              </div>
              <div className="hp-hero-badge">
                <span className="hp-hero-badge-dot" />
                Focused tools for growing teams
              </div>
              {/* <h1 className="hp-hero-h1">Focused tools for growing teams.</h1> */}
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
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link href="#products" className="hp-cta-secondary">
                  Explore products
                </Link>
              </div>
            </div>
          </section>

          {/* STAT BAR */}
          {/* <div className="hp-statbar-wrapper" role="presentation">
            <div className="hp-statbar-inner">
              {stats.map((s) => (
                <div key={s.label} className="hp-stat">
                  <span className="hp-stat-number">{s.number}</span>
                  <span className="hp-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* SUPPORTING THE FLOW */}
          <section className="hp-section hp-philosophy" aria-label="Supporting the flow of work">
            <div className="hp-section-center" style={{ position: 'relative', zIndex: 1 }}>
              {/* <span className="hp-section-label">Philosophy</span> */}
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
          <section className="hp-section hp-principles" aria-label="Principles">
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                {/* <span className="hp-section-label">Our approach</span> */}
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
          <section id="products" className="hp-section hp-products" aria-label="Products">
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
                    <div className="hp-product-icon-wrap">
                      {product.icon}
                    </div>
                    <div className="hp-product-arrow" aria-hidden="true">
                      <ArrowUpRight size={20} strokeWidth={2.5} />
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
          <section className="hp-section hp-ecosystem" aria-label="Ecosystem">
            <div className="hp-section-center" style={{ position: 'relative', zIndex: 1 }}>
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
          <section className="hp-section hp-built-for" aria-label="Built for growing teams">
            <div className="hp-section-center" style={{ position: 'relative', zIndex: 1 }}>
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
            <img src="/trexasoft_text_purple.png" alt="TrexaSoft" style={{ height: '28px', width: 'auto' }} />
            <p className="hp-footer-tagline">Focused tools for growing teams.</p>
            <p className="hp-footer-copy">&copy; {new Date().getFullYear()} TrexaSoft. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  )
}