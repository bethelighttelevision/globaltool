"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Search, Globe, Bot, ImageIcon, Video, DollarSign, Code, FileText,
  Layers, Sparkles, RefreshCw, Calculator, TrendingUp, Pen, Hash, Camera, Eye,
  Download, List, ShieldCheck, Braces, FileCode2, Tags, Star, Type, Music, Play, Film,
  ChevronDown, ArrowUpRight, ShoppingBag, Package,
} from 'lucide-react';

interface ToolItem {
  label: string;
  path: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

interface CategoryGroup {
  label: string;
  color: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  tools: ToolItem[];
}

const categories: CategoryGroup[] = [
  {
    label: 'SEO & Marketing',
    color: '#2997ff',
    icon: Search,
    tools: [
      { label: 'SEO Analyzer', path: '/site-audit', desc: 'Full website audit & score', icon: Globe },
      { label: 'Meta Tags Builder', path: '/meta-tags', desc: 'OG & SEO meta generator', icon: Tags },
      { label: 'Keyword Clustering', path: '/keyword-clustering', desc: 'Group keywords by topic', icon: Layers },
      { label: 'YouTube SEO', path: '/youtube-seo', desc: 'Optimize video rankings', icon: Play },
    ],
  },
  {
    label: 'AI & Content',
    color: '#818cf8',
    icon: Bot,
    tools: [
      { label: 'AI Hook Generator', path: '/ai-hook', desc: 'Viral content hooks', icon: Pen },
      { label: 'AI Content Humanizer', path: '/ai-humanizer', desc: 'Make AI text undetectable', icon: Sparkles },
      { label: 'Blog to Social', path: '/blog-to-social', desc: 'Repurpose blog posts', icon: RefreshCw },
      { label: 'Instagram Captions', path: '/instagram-caption', desc: 'AI caption generator', icon: Camera },
      { label: 'TikTok Hashtags', path: '/tiktok-hashtags', desc: 'Trending tag generator', icon: Hash },
    ],
  },
  {
    label: 'Video & YouTube',
    color: '#ff3b30',
    icon: Video,
    tools: [
      { label: 'Thumbnail Analyzer', path: '/youtube-thumbnail-analyzer', desc: 'AI thumbnail scoring', icon: Eye },
      { label: 'Thumbnail Tester', path: '/youtube-thumbnail-tester', desc: 'Preview in search results', icon: Eye },
      { label: 'Thumbnail Downloader', path: '/youtube-thumbnail-downloader', desc: 'Save HD thumbnails', icon: Download },
      { label: 'Tag Extractor', path: '/youtube-tag-extractor', desc: 'Extract video tags', icon: List },
      { label: 'Shorts Ideas', path: '/shorts-ideas', desc: 'AI Shorts idea generator', icon: Film },

    ],
  },
  {
    label: 'Calculators',
    color: '#32d74b',
    icon: Calculator,
    tools: [
      { label: 'Crypto Profit Calculator', path: '/crypto-profit', desc: 'ROI & tax estimator', icon: TrendingUp },
      { label: 'Mortgage Calculator', path: '/mortgage-calculator', desc: 'Home loan planner', icon: Calculator },
      { label: 'Car Loan Calculator', path: '/car-loan-calculator', desc: 'Auto finance estimator', icon: TrendingUp },
      { label: 'US Tax Calculator', path: '/tax-calculator', desc: '2026 federal tax', icon: Calculator },
      { label: 'Salary Calculator', path: '/salary-calculator', desc: 'Take-home pay estimator', icon: DollarSign },
      { label: 'Retirement Calculator', path: '/retirement-calculator', desc: 'Savings projection', icon: TrendingUp },
    ],
  },
  {
    label: 'Images & Media',
    color: '#ff9f0a',
    icon: ImageIcon,
    tools: [
      { label: 'AI BG Remover', path: '/bg-remover', desc: 'Remove backgrounds', icon: ImageIcon },
      { label: 'Image Upscaler', path: '/image-upscaler', desc: 'Enhance resolution', icon: ImageIcon },
      { label: 'PDF Converter', path: '/pdf-converter', desc: 'PDF to SVG conversion', icon: FileText },
      { label: 'Base64 Converter', path: '/base64-converter', desc: 'Image to Base64', icon: FileCode2 },
    ],
  },
  {
    label: 'Downloaders',
    color: '#0071e3',
    icon: Download,
    tools: [

    ],
  },
  {
    label: 'E-commerce',
    color: '#ff9500',
    icon: ShoppingBag,
    tools: [
      { label: 'Listing Optimizer', path: '/amazon-listing-optimizer', desc: 'AI Amazon listing generator', icon: Package },
      { label: 'Keyword Researcher', path: '/amazon-keyword-tool', desc: 'AI keyword ideas organized', icon: Tags },
    ],
  },
  {
    label: 'Developer Tools',
    color: '#a8c7fa',
    icon: Code,
    tools: [
      { label: 'JSON Formatter', path: '/json-formatter', desc: 'Validate & beautify', icon: Braces },
      { label: 'Password Generator', path: '/password-gen', desc: 'Secure passwords', icon: ShieldCheck },
      { label: 'Word Counter', path: '/word-counter', desc: 'Count words & more', icon: Type },
      { label: 'CV Maker', path: '/cv-maker', desc: 'Professional resumes', icon: FileText },
    ],
  },
];

const allToolsLink = '/free-online-tools-for-creators';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleMegaEnter = (label: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(label);
  };

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  useEffect(() => {
    return () => {
      if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <nav className="glass-nav" style={{ position: 'relative', zIndex: 1000 }}>
      <div className="content-container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0,
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <Image src="/logo-icon.svg" alt="ToolSnappy" width={38} height={38} priority
            style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(41,151,255,0.3))' }}
          />
          <div style={{ fontSize: '22px', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--foreground)', letterSpacing: '1.5px', lineHeight: 1 }}>
            TOOL<span style={{ color: 'var(--accent)' }}>SNAPPY</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2px' }} ref={megaRef}>
          {/* All Tools Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMegaEnter('tools')}
            onMouseLeave={handleMegaLeave}
          >
            <button style={{
              background: activeMega === 'tools' ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none', color: 'var(--foreground)', cursor: 'pointer',
              padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s ease', fontFamily: 'inherit',
            }}>
              All Tools
              <ChevronDown size={14} style={{
                transition: 'transform 0.3s ease',
                transform: activeMega === 'tools' ? 'rotate(180deg)' : 'rotate(0deg)',
                color: 'var(--muted)',
              }} />
            </button>

            {activeMega === 'tools' && (
              <div
                style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(12,12,18,0.98)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px', padding: '24px', marginTop: '8px',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(40px) saturate(1.4)',
                  width: '800px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px',
                  animation: 'fadeIn 0.2s ease-out, slideDown 0.2s ease-out',
                }}
                onMouseEnter={() => handleMegaEnter('tools')}
                onMouseLeave={handleMegaLeave}
              >
                {categories.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <div key={cat.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px',
                        paddingBottom: '8px', borderBottom: `1px solid ${cat.color}20`,
                      }}>
                        <div style={{
                          width: '24px', height: '24px', borderRadius: '8px',
                          background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <CatIcon size={13} style={{ color: cat.color }} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: cat.color }}>{cat.label}</span>
                      </div>
                      {cat.tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        return (
                          <Link key={tool.path} href={tool.path}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none',
                              color: 'var(--muted)', padding: '7px 10px', borderRadius: '8px',
                              fontSize: '13px', transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                              e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--muted)';
                            }}
                          >
                            <ToolIcon size={13} style={{ color: cat.color, flexShrink: 0, opacity: 0.8 }} />
                            <span>{tool.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}

                <div style={{
                  gridColumn: '1 / -1', borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '14px', marginTop: '6px', display: 'flex', justifyContent: 'center',
                }}>
                  <Link href={allToolsLink} style={{
                    color: 'var(--accent)', textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                    padding: '10px 24px', borderRadius: '10px',
                    background: 'rgba(41,151,255,0.08)',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(41,151,255,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(41,151,255,0.08)'; }}
                  >
                    View All 34+ Free Tools <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Nav Links */}
          {[
            { label: 'Blog', path: '/blog' },
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
          ].map((link) => {
            const isActive = pathname === link.path || pathname.startsWith(link.path + '/');
            return (
              <Link key={link.path} href={link.path}
                style={{
                  textDecoration: 'none', color: isActive ? '#fff' : 'var(--muted)',
                  padding: '10px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 500,
                  position: 'relative', transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--foreground)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--muted)'; }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Search Icon */}
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s', marginLeft: '4px',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            <Search size={18} />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            cursor: 'pointer', display: 'none', width: '42px', height: '42px',
            borderRadius: '12px', background: isOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
            alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
          }}
        >
          {isOpen ? <X size={24} color="var(--foreground)" /> : <Menu size={24} color="var(--foreground)" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="animate-fade-in" style={{
          padding: '8px 16px 24px',
          background: 'rgba(8,8,12,0.98)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          maxHeight: '80vh', overflowY: 'auto',
          backdropFilter: 'blur(20px)',
        }}>
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.label} style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: cat.color, fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '6px', padding: '8px 8px',
                }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '6px',
                    background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CatIcon size={12} style={{ color: cat.color }} />
                  </div>
                  {cat.label}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                  {cat.tools.map((tool) => (
                    <Link key={tool.path} href={tool.path} onClick={() => setIsOpen(false)}
                      style={{
                        textDecoration: 'none', color: 'var(--muted)', padding: '8px 10px',
                        borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                        display: 'flex', alignItems: 'center', gap: '8px',
                        transition: 'all 0.15s',
                      }}
                    >
                      <tool.icon size={13} style={{ color: cat.color, opacity: 0.8 }} />
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px', marginTop: '8px' }}>
            <Link href="/blog" onClick={() => setIsOpen(false)}
              style={{ display: 'block', textDecoration: 'none', color: 'var(--foreground)', fontSize: '15px', fontWeight: 600, padding: '10px 8px' }}
            >Blog</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}
              style={{ display: 'block', textDecoration: 'none', color: 'var(--foreground)', fontSize: '15px', fontWeight: 600, padding: '10px 8px' }}
            >About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}
              style={{ display: 'block', textDecoration: 'none', color: 'var(--foreground)', fontSize: '15px', fontWeight: 600, padding: '10px 8px' }}
            >Contact</Link>
            <Link href={allToolsLink} onClick={() => setIsOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                textDecoration: 'none', color: 'var(--accent)', fontSize: '14px', fontWeight: 600,
                padding: '12px 8px', marginTop: '4px',
                background: 'rgba(41,151,255,0.06)', borderRadius: '10px',
              }}
            >View All 34+ Free Tools <ArrowUpRight size={14} /></Link>
          </div>
        </div>
      )}
    </nav>
  );
}
