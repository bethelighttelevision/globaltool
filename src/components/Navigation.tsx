import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="glass-nav">
      <div className="content-container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--foreground)' }}>
            GLOBAL<span style={{ color: 'var(--accent)' }}>TOOLBOX</span>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '32px', fontSize: '15px', fontWeight: '500' }}>
          <Link href="/seo-analyzer" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>SEO Audit</Link>
          <Link href="/bg-remover" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>BG Remover</Link>
          <Link href="/crypto" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>Crypto Calc</Link>
          <Link href="/ai-hook" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>AI Hook</Link>
        </div>
      </div>
    </nav>
  );
}
