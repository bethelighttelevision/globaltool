"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Bookmark, Search, Share2, Image, Video, DollarSign, Code, Sparkles } from 'lucide-react';

const categories = [
  {
    id: 'seo',
    icon: Search,
    color: '#5ac8fa',
    title: 'SEO & Website Tools',
    desc: 'Optimize your site, audit pages, and rank higher in search results.',
    tools: [
      { name: 'ToolSnappy SEO Analyzer', url: '/site-audit', own: true },
      { name: 'ToolSnappy Meta Tag Builder', url: '/meta-tags', own: true },
      { name: 'ToolSnappy JSON Formatter', url: '/json-formatter', own: true },
      { name: 'ToolSnappy Base64 Converter', url: '/base64-converter', own: true },
      { name: 'Google Search Console', url: 'https://search.google.com/search-console', ext: true },
      { name: 'Google Analytics', url: 'https://analytics.google.com', ext: true },
      { name: 'Ahrefs Webmaster Tools', url: 'https://ahrefs.com/webmaster-tools', ext: true },
      { name: 'PageSpeed Insights', url: 'https://pagespeed.web.dev', ext: true },
      { name: 'Schema.org Validator', url: 'https://validator.schema.org', ext: true },
      { name: 'ToolSnappy Keyword Clustering Tool', url: '/keyword-clustering', own: true },
    ],
  },
  {
    id: 'social',
    icon: Share2,
    color: '#ff9f0a',
    title: 'Social Media & Content Creation',
    desc: 'Generate hooks, captions, hashtags, and schedule posts.',
    tools: [
      { name: 'ToolSnappy AI Viral Hook Generator', url: '/ai-hook', own: true },
      { name: 'ToolSnappy TikTok Hashtag Generator', url: '/tiktok-hashtags', own: true },
      { name: 'ToolSnappy Instagram Caption Generator', url: '/instagram-caption', own: true },
      { name: 'ToolSnappy Word Counter', url: '/word-counter', own: true },
      { name: 'Canva', url: 'https://canva.com', ext: true },
      { name: 'CapCut', url: 'https://capcut.com', ext: true },
      { name: 'Later', url: 'https://later.com', ext: true },
      { name: 'Buffer', url: 'https://buffer.com', ext: true },
      { name: 'Unsplash', url: 'https://unsplash.com', ext: true },
      { name: 'Pexels', url: 'https://pexels.com', ext: true },
      { name: 'ToolSnappy AI Content Humanizer', url: '/ai-humanizer', own: true },
      { name: 'ToolSnappy Blog to Social Repurposer', url: '/blog-to-social', own: true },
    ],
  },
  {
    id: 'design',
    icon: Image,
    color: '#50d890',
    title: 'Image & Design Tools',
    desc: 'Remove backgrounds, upscale images, and edit visuals.',
    tools: [
      { name: 'ToolSnappy AI Background Remover', url: '/bg-remover', own: true },
      { name: 'ToolSnappy Image Upscaler', url: '/image-upscaler', own: true },
      { name: 'Remove.bg', url: 'https://remove.bg', ext: true },
      { name: 'TinyPNG', url: 'https://tinypng.com', ext: true },
      { name: 'Figma', url: 'https://figma.com', ext: true },
      { name: 'Photopea', url: 'https://photopea.com', ext: true },
      { name: 'Pixlr', url: 'https://pixlr.com', ext: true },
      { name: 'SVG Repo', url: 'https://svgrepo.com', ext: true },
    ],
  },
  {
    id: 'video',
    icon: Video,
    color: '#ff3b30',
    title: 'Video & YouTube Tools',
    desc: 'Optimize thumbnails, analyze videos, and grow your channel.',
    tools: [
      { name: 'ToolSnappy YouTube SEO Optimizer', url: '/youtube-seo', own: true },
      { name: 'ToolSnappy Thumbnail Analyzer', url: '/youtube-thumbnail-analyzer', own: true },
      { name: 'ToolSnappy Thumbnail A/B Tester', url: '/youtube-thumbnail-tester', own: true },
      { name: 'ToolSnappy Thumbnail Downloader', url: '/youtube-thumbnail-downloader', own: true },
      { name: 'ToolSnappy Video Downloader', url: '/youtube-video-downloader', own: true },
      { name: 'ToolSnappy Tag Extractor', url: '/youtube-tag-extractor', own: true },
      { name: 'OBS Studio', url: 'https://obsproject.com', ext: true },
      { name: 'DaVinci Resolve', url: 'https://blackmagicdesign.com/products/davinciresolve', ext: true },
      { name: 'TubeBuddy', url: 'https://tubebuddy.com', ext: true },
    ],
  },
  {
    id: 'finance',
    icon: DollarSign,
    color: '#32d74b',
    title: 'Finance & Monetization Tools',
    desc: 'Calculate crypto profits, mortgages, loans, and more.',
    tools: [
      { name: 'ToolSnappy Crypto Profit Calculator', url: '/crypto-profit', own: true },
      { name: 'ToolSnappy Mortgage Calculator', url: '/mortgage-calculator', own: true },
      { name: 'ToolSnappy Car Loan Calculator', url: '/car-loan-calculator', own: true },
      { name: 'ToolSnappy Lucky Number Generator', url: '/lucky-number', own: true },
      { name: 'Mint', url: 'https://mint.intuit.com', ext: true },
      { name: 'PayPal Fee Calculator', url: 'https://thefeecalculator.com', ext: true },
      { name: 'Wave Accounting', url: 'https://waveapps.com', ext: true },
      { name: 'ToolSnappy US Tax Calculator 2026', url: '/tax-calculator', own: true },
      { name: 'ToolSnappy Salary Take-Home Calculator', url: '/salary-calculator', own: true },
      { name: 'ToolSnappy Retirement Calculator', url: '/retirement-calculator', own: true },
    ],
  },
  {
    id: 'dev',
    icon: Code,
    color: '#007aff',
    title: 'Developer & Utility Tools',
    desc: 'Generate passwords, convert files, write CVs, and stay organized.',
    tools: [
      { name: 'ToolSnappy Password Generator', url: '/password-gen', own: true },
      { name: 'ToolSnappy PDF Converter', url: '/pdf-converter', own: true },
      { name: 'ToolSnappy CV Maker', url: '/cv-maker', own: true },
      { name: 'ToolSnappy Word Counter', url: '/word-counter', own: true },
      { name: 'Grammarly', url: 'https://grammarly.com', ext: true },
      { name: 'Notion', url: 'https://notion.so', ext: true },
      { name: 'DeepL Translator', url: 'https://deepl.com', ext: true },
    ],
  },
];

export default function FreeToolsPage() {
  const totalTools = categories.reduce((sum, c) => sum + c.tools.length, 0);

  return (
    <div className="content-container" style={{ padding: '80px 24px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '40px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="animate-slide-up" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
          <Sparkles size={40} color="var(--accent)" style={{ marginBottom: '16px' }} />
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text" style={{ marginBottom: '12px' }}>
            50 Free Online Tools for Creators
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 8px', lineHeight: 1.6 }}>
            The ultimate curated toolkit for SEO, social media, video, design, finance, and productivity.{' '}
            <strong>Every tool here is 100% free</strong> — no credit card, no sign-up required.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            <Bookmark size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Bookmark this page — we update it every quarter with the best new tools.
          </p>
        </div>

        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="glass-panel animate-fade-in" style={{ padding: '32px 24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                <Icon size={28} color={cat.color} />
                <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>{cat.title}</h2>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px', marginLeft: '42px' }}>{cat.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {cat.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target={tool.ext ? '_blank' : undefined}
                    rel={tool.ext ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)',
                      textDecoration: 'none',
                      color: 'var(--foreground)',
                      border: '1px solid transparent',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(41,151,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(41,151,255,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {tool.own && <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--accent)', background: 'rgba(41,151,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>TS</span>}
                      <span style={{ fontSize: '15px' }}>{tool.name}</span>
                    </div>
                    {tool.own && <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{'\u2192'}</span>}
                    {tool.ext && <ExternalLink size={14} color="var(--muted)" />}
                  </a>
                ))}
              </div>
            </div>
          );
        })}

        <div className="glass-panel" style={{ padding: '32px 24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>
            <strong>{totalTools} free tools</strong> and counting. Know a great free tool we missed?{' '}
            <Link href="/contact" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Let us know</Link>.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '12px' }}>
            All ToolSnappy tools are 100% free with no sign-up required. External tools may have their own terms.
          </p>
        </div>
      </div>
    </div>
  );
}
