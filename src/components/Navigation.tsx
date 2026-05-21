"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'SEO Tools', children: [
    { label: 'SEO Analyzer', path: '/seo-analyzer' },
    { label: 'YouTube SEO', path: '/youtube-seo' },
    { label: 'Meta Tags', path: '/meta-tags' },
  ]},
  { label: 'Video Downloaders', children: [
    { label: 'YouTube Downloader', path: '/youtube-video-downloader' },
    { label: 'Facebook Downloader', path: '/facebook-video-downloader' },
    { label: 'Instagram Downloader', path: '/instagram-video-downloader' },
    { label: 'TikTok Downloader', path: '/tiktok-video-downloader' },
  ]},
  { label: 'YouTube Tools', children: [
    { label: 'YT SEO Tips', path: '/youtube-seo' },
    { label: 'Tag Extractor', path: '/youtube-tag-extractor' },
    { label: 'Thumbnail Analyzer', path: '/youtube-thumbnail-analyzer' },
    { label: 'Thumbnail Tester', path: '/youtube-thumbnail-tester' },
    { label: 'Thumbnail Downloader', path: '/youtube-thumbnail-downloader' },
  ]},
  { label: 'Calculators', children: [
    { label: 'Crypto Profit', path: '/crypto' },
    { label: 'Mortgage', path: '/mortgage-calculator' },
    { label: 'Car Loan', path: '/car-loan-calculator' },
  ]},
  { label: 'Media Tools', children: [
    { label: 'BG Remover', path: '/bg-remover' },
    { label: 'Image Upscaler', path: '/image-upscaler' },
    { label: 'PDF Converter', path: '/pdf-converter' },
  ]},
  { label: 'Content Tools', children: [
    { label: 'AI Hook Gen', path: '/ai-hook' },
    { label: 'Word Counter', path: '/word-counter' },
    { label: 'JSON Formatter', path: '/json-formatter' },
  ]},
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="glass-nav">
      <div className="content-container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
              src="/logo-icon.svg" 
              alt="ToolSnappy Logo" 
              width={44}
              height={44}
              style={{ 
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(41,151,255,0.4))'
              }} 
            />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--foreground)', letterSpacing: '1px' }}>
            TOOL<span style={{ color: 'var(--accent)' }}>SNAPPY</span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
          {navLinks.map((group) => (
            <div key={group.label} style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown(group.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button style={{
                background: activeDropdown === group.label ? 'rgba(255,255,255,0.06)' : 'none',
                border: 'none', color: 'var(--foreground)', cursor: 'pointer',
                padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500',
                display: 'flex', alignItems: 'center', gap: '4px',
                transition: 'all 0.2s', fontFamily: 'inherit'
              }}>
                {group.label}
                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: activeDropdown === group.label ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {activeDropdown === group.label && (
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(20,20,25,0.98)', border: '1px solid var(--card-border)',
                  borderRadius: '16px', padding: '8px', minWidth: '180px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)',
                  display: 'flex', flexDirection: 'column', gap: '4px'
                }}>
                  {group.children.map((child) => (
                    <Link key={child.path} href={child.path} style={{
                      textDecoration: 'none', color: 'var(--muted)', padding: '10px 16px',
                      borderRadius: '10px', fontSize: '14px', transition: 'all 0.2s'
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(41,151,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
                    >{child.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/blog" style={{
            textDecoration: 'none', color: 'var(--foreground)', padding: '8px 16px',
            borderRadius: '8px', fontSize: '14px', fontWeight: '500'
          }}>Blog</Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="mobile-menu-btn" onClick={toggleMenu} style={{ cursor: 'pointer', display: 'none' }}>
          {isOpen ? <X size={28} color="var(--foreground)" /> : <Menu size={28} color="var(--foreground)" />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay animate-fade-in" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '24px', background: 'rgba(10,10,15,0.98)', borderBottom: '1px solid var(--card-border)', backdropFilter: 'blur(20px)' }}>
          {navLinks.map((group) => (
            <div key={group.label}>
              <div style={{ color: 'var(--muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>{group.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px' }}>
                {group.children.map((child) => (
                  <Link key={child.path} href={child.path} onClick={toggleMenu}
                    style={{ textDecoration: 'none', color: 'var(--foreground)', fontSize: '16px', fontWeight: '500' }}
                  >{child.label}</Link>
                ))}
              </div>
            </div>
          ))}
          <Link href="/blog" onClick={toggleMenu} style={{ textDecoration: 'none', color: 'var(--accent)', fontSize: '16px', fontWeight: '600' }}>Blog</Link>
        </div>
      )}
    </nav>
  );
}

