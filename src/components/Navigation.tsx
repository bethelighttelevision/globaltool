"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
        
        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '32px', fontSize: '15px', fontWeight: '500' }}>
          <Link href="/seo-analyzer" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>SEO Audit</Link>
          <Link href="/bg-remover" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>BG Remover</Link>
          <Link href="/image-upscaler" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>Upscaler</Link>
          <Link href="/blog" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>Blog</Link>
          <Link href="/crypto" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>Crypto</Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="mobile-menu-btn" onClick={toggleMenu} style={{ cursor: 'pointer', display: 'none' }}>
          {isOpen ? <X size={28} color="var(--foreground)" /> : <Menu size={28} color="var(--foreground)" />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay animate-fade-in" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--background)', borderBottom: '1px solid var(--card-border)' }}>
          <Link href="/seo-analyzer" onClick={toggleMenu} style={{ textDecoration: 'none', color: 'var(--foreground)', fontSize: '18px', fontWeight: '500' }}>SEO Audit</Link>
          <Link href="/bg-remover" onClick={toggleMenu} style={{ textDecoration: 'none', color: 'var(--foreground)', fontSize: '18px', fontWeight: '500' }}>BG Remover</Link>
          <Link href="/image-upscaler" onClick={toggleMenu} style={{ textDecoration: 'none', color: 'var(--foreground)', fontSize: '18px', fontWeight: '500' }}>AI Upscaler</Link>
          <Link href="/blog" onClick={toggleMenu} style={{ textDecoration: 'none', color: 'var(--foreground)', fontSize: '18px', fontWeight: '500' }}>Blog</Link>
          <Link href="/crypto" onClick={toggleMenu} style={{ textDecoration: 'none', color: 'var(--foreground)', fontSize: '18px', fontWeight: '500' }}>Crypto</Link>
        </div>
      )}
    </nav>
  );
}

