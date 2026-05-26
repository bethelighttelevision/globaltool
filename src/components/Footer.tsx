"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(10,10,15,1) 100%)',
    }}>
      <div className="content-container" style={{ padding: '64px 24px 32px' }}>
        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Image src="/logo-icon.svg" alt="ToolSnappy" width={36} height={36} style={{ objectFit: 'contain' }} />
              <h3 style={{ fontSize: '20px', margin: 0, color: '#fff', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
                TOOL<span style={{ color: 'var(--accent)' }}>SNAPPY</span>
              </h3>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7, maxWidth: '320px', marginBottom: '24px' }}>
               Free online tools for creators, marketers, and professionals. Built for speed and privacy in {currentYear}.
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(41,151,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', cursor: 'pointer', transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(41,151,255,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(41,151,255,0.1)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--muted)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--muted)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </div>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 style={{
              fontSize: '13px', marginBottom: '20px', color: '#fff',
              textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
            }}>Popular Tools</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'SEO Analyzer', path: '/site-audit' },
                { label: 'AI Hook Generator', path: '/ai-hook' },
                { label: 'Crypto Calculator', path: '/crypto-profit' },
                { label: 'AI Background Remover', path: '/bg-remover' },
                { label: 'US Tax Calculator', path: '/tax-calculator' },
                { label: 'CV Maker', path: '/cv-maker' },
              ].map((link) => (
                <Link key={link.path} href={link.path}
                  style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.paddingLeft = '4px'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.paddingLeft = '0px'; }}
                >{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{
              fontSize: '13px', marginBottom: '20px', color: '#fff',
              textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
            }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Blog', path: '/blog' },
                { label: '50 Free Tools', path: '/free-online-tools-for-creators' },
                { label: 'All Calculators', path: '/free-online-tools-for-creators' },
                { label: 'SEO Tools', path: '/free-online-tools-for-creators' },
                { label: 'YouTube Tools', path: '/free-online-tools-for-creators' },
                { label: 'Write for Us', path: '/write-for-us' },
              ].map((link) => (
                <Link key={link.label} href={link.path}
                  style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.paddingLeft = '4px'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.paddingLeft = '0px'; }}
                >{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontSize: '13px', marginBottom: '20px', color: '#fff',
              textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
            }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Terms of Service', path: '/terms' },
                { label: 'Contact@toolsnappy.com', path: 'mailto:contact@toolsnappy.com' },
              ].map((link) => (
                <Link key={link.label} href={link.path}
                  style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.paddingLeft = '4px'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.paddingLeft = '0px'; }}
                >{link.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(41,151,255,0.06), rgba(129,140,248,0.04))',
          border: '1px solid rgba(41,151,255,0.1)',
          borderRadius: '16px',
          padding: '28px 32px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'rgba(41,151,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)', flexShrink: 0,
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '15px', margin: 0, marginBottom: '2px' }}>Stay Ahead in {currentYear}</p>
              <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>Subscribe for new tools, updates, and pro tips.</p>
            </div>
          </div>
          <a href="mailto:contact@toolsnappy.com?subject=Subscribe" style={{ textDecoration: 'none' }}>
            <span className="premium-button" style={{ fontSize: '13px', padding: '10px 24px' }}>
              <Mail size={16} /> Subscribe
            </span>
          </a>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
            &copy; {currentYear} ToolSnappy. All rights reserved. Made with precision.
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/privacy-policy" style={{ color: 'var(--muted)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
            >Privacy</Link>
            <Link href="/terms" style={{ color: 'var(--muted)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
            >Terms</Link>
            <Link href="/contact" style={{ color: 'var(--muted)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
            >Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
