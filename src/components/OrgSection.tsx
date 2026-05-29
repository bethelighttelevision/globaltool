'use client';

import React, { useEffect, useRef, useState } from 'react';

const toolsContent = [
  {
    label: 'CONTENT',
    color: '#818cf8',
    items: [
      'AI Hook Generator', 'AI Content Humanizer', 'Blog to Social',
      'Instagram Caption', 'TikTok Hashtags', 'Shorts Ideas',
    ],
  },
  {
    label: 'SEO & GROWTH',
    color: '#2997ff',
    items: [
      'Page SEO Analyzer', 'YouTube SEO', 'Meta Tags Builder',
      'Keyword Clustering', 'Thumbnail Analyzer', 'Tag Extractor',
    ],
  },
  {
    label: 'WEB UTILITIES',
    color: '#32d74b',
    items: [
      'Tax Calculator', 'Crypto Profit Calc', 'Password Generator',
      'JSON Formatter', 'Image Upscaler', 'AI BG Remover',
    ],
  },
];

function useOnScreen(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

const orbits = [
  { count: 3, speed: 30, size: 300, top: '50%', left: '0%' },
  { count: 4, speed: 45, size: 420, top: '50%', left: '0%' },
  { count: 5, speed: 60, size: 540, top: '50%', left: '0%' },
];

function OrbitRings() {
  return (
    <div className="org-orbits" aria-hidden="true">
      {/* Left orbits */}
      <div className="org-orbit-group" style={{ position: 'absolute', top: '50%', left: '0%', transform: 'translate(-30%, -50%)' }}>
        {orbits.map((o) => (
          <div
            key={o.size}
              className="org-orbit-ring"
            style={{
              width: o.size, height: o.size * 0.75,
              animationDuration: `${o.speed}s`,
            }}
          >
            {Array.from({ length: o.count }).map((_, i) => (
              <div
                key={i}
                className="org-orbit-dot"
                style={{
                  '--angle': `${(360 / o.count) * i}deg`,
                  '--dot-delay': `${i * 0.2}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Right orbits */}
      <div className="org-orbit-group" style={{ position: 'absolute', top: '50%', right: '0%', transform: 'translate(30%, -50%)' }}>
        {orbits.map((o) => (
          <div
            key={o.size}
            className="org-orbit-ring"
            style={{
              width: o.size, height: o.size * 0.75,
              animationDuration: `${o.speed}s`,
              animationDirection: 'reverse',
            }}
          >
            {Array.from({ length: o.count }).map((_, i) => (
              <div
                key={i}
                className="org-orbit-dot org-orbit-dot--alt"
                style={{
                  '--angle': `${(360 / o.count) * i + 30}deg`,
                  '--dot-delay': `${i * 0.3}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrgSection() {
  const [sectionRef, visible] = useOnScreen(0.1);
  const [, setTooltip] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      className="org-section"
      style={{ padding: '140px 0 100px', position: 'relative', overflow: 'hidden' }}
    >
      <OrbitRings />

      {/* Background glow */}
      <div className="org-glow" />

      <div className="content-container">
        {/* Heading */}
        <header style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2
            className="org-heading"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              lineHeight: 1.1, marginBottom: '12px', letterSpacing: '-0.03em',
            }}
          >
            An entire{' '}
            <span className="gradient-text-accent">toolkit</span> working
            {' '}for you
          </h2>
          <p
            className="org-lede"
            style={{
              fontSize: '18px', color: 'var(--muted-light)',
              maxWidth: '500px', margin: '0 auto',
            }}
          >
            Even when you&apos;re asleep.
          </p>
        </header>

        {/* === ORG CHART === */}
        <div className={`org-chart ${visible ? 'org-chart--visible' : ''}`}>
          <div className="org-node org-node--you">
            <div className="org-node__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="org-node__label">You</span>
          </div>

          <div className="org-arrow">
            <svg viewBox="0 0 40 24" fill="none" className="org-arrow-svg">
              <path d="M4 12h30M26 4l8 8-8 8" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="org-arrow-path" />
            </svg>
          </div>

          <div className="org-node org-node--ai">
            <div className="org-node__icon" style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
                <path d="M6 13a2 2 0 0 0-2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2Z" />
                <path d="M18 13a2 2 0 0 0-2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2Z" />
                <path d="M12 16v4" />
              </svg>
            </div>
            <span className="org-node__label">Snappy AI</span>
            <span className="org-node__sub">Powered by Groq + Gemini</span>
          </div>

          <div className="org-arrow org-arrow--down">
            <svg viewBox="0 0 24 40" fill="none" className="org-arrow-svg">
              <path d="M12 4v30M4 26l8 8 8-8" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="org-arrow-path" />
            </svg>
          </div>

          <div className="org-categories">
            {toolsContent.map((cat, ci) => (
              <div key={cat.label} className={`org-category ${visible ? 'org-category--visible' : ''}`}>
                <div className="org-category__header" style={{ borderColor: cat.color, color: cat.color }}>
                  {cat.label}
                </div>
                <ul className="org-category__list">
                  {cat.items.map((item, ii) => (
                    <li
                      key={item}
                      className="org-category__item"
                      style={{ '--float-delay': `${(ci * 6 + ii) * 0.4}s` } as React.CSSProperties}
                      onClick={() => setTooltip((prev) => prev === item ? null : item)}
                    >
                      <span className="org-item-dot" style={{ background: cat.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* === BENEFIT CARDS === */}
        <div className={`org-benefits ${visible ? 'org-benefits--visible' : ''}`}>
          <div className="org-benefit-card">
            <div className="org-benefit-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#32d74b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                <path d="M20 12v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4" />
                <path d="M12 22v-6" />
                <path d="m16 16-4-4-4 4" />
              </svg>
            </div>
            <h3>Free to Use</h3>
            <p>Every tool is completely free. No trials, no credit cards, no limits.</p>
          </div>
          <div className="org-benefit-card">
            <div className="org-benefit-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
                <path d="M6 13a2 2 0 0 0-2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2Z" />
                <path d="M18 13a2 2 0 0 0-2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2Z" />
                <path d="M12 16v4" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            </div>
            <h3>AI-Powered</h3>
            <p>Smart AI tools for hooks, captions, hashtags, SEO, and more.</p>
          </div>
          <div className="org-benefit-card">
            <div className="org-benefit-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2997ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Always Available</h3>
            <p>24/7 access. No sign-up needed, no downtime, no excuses.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
