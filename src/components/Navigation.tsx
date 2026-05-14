import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="glass-nav">
      <div className="content-container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/logo.png" 
              alt="ToolSnappy Logo" 
              style={{ 
                height: '38px', 
                width: '38px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '1.5px solid rgba(255,255,255,0.1)',
                boxShadow: '0 0 15px rgba(0,210,255,0.3)'
              }} 
            />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--foreground)', letterSpacing: '1px' }}>
            TOOL<span style={{ color: 'var(--accent)' }}>SNAPPY</span>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '32px', fontSize: '15px', fontWeight: '500' }}>
          <Link href="/seo-analyzer" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>SEO Audit</Link>
          <Link href="/bg-remover" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>BG Remover</Link>
          <Link href="/blog" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>Blog</Link>
          <Link href="/crypto" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>Crypto</Link>
          <Link href="/ai-hook" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>AI Hook</Link>
        </div>
      </div>
    </nav>
  );
}
