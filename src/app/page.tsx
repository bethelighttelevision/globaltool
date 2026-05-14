import React from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../components/AdSensePlaceholder';
import { 
  LineChart, 
  Bot, 
  FileCode2, 
  Tags, 
  ShieldCheck, 
  Braces,
  Play,
  Camera,
  Eraser,
  Type,
  Image as ImageIcon,
  TrendingUp,
  Search,
  Globe
} from 'lucide-react';

export const metadata = {
  title: 'ToolSnappy | #1 Free SEO & Social Media Suite 2026',
  description: 'Access 12+ professional tools: Page SEO Analyzer, AI Background Remover, Crypto ROI Calculator, AI Hook Generator, and TikTok SEO tools. 100% Free for creators.',
  keywords: 'ToolSnappy, Free SEO Tools 2026, Best AI Hook Generator, AI Background Remover, Crypto Profit Calculator USA, YouTube SEO Tool, Instagram Caption Generator, TikTok Hashtag Generator',
};

export default function Home() {
  return (
    <div className="content-container animate-fade-in" style={{ padding: '40px 24px' }}>
      <AdSensePlaceholder type="header" />
      
      <section className="animate-slide-up" style={{ textAlign: 'center', marginBottom: '80px', marginTop: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '100px', marginBottom: '24px', border: '1px solid var(--card-border)' }}>
          <TrendingUp size={16} color="var(--accent)" />
          <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--muted)' }}>New: Page SEO Analyzer Audit Tool</span>
        </div>
        <h1 className="gradient-text" style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
          Your Ultimate Digital<br />Arsenal for 2026
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '20px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Dominate search engines and social algorithms. Access a premium suite of AI-powered SEO, Content, and Financial tools engineered for the USA market.
        </p>
      </section>

      {/* Grid: 12+ Tools */}
      <h2 style={{ fontSize: '24px', marginBottom: '32px', paddingBottom: '12px', borderBottom: '1px solid var(--card-border)', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Search size={22} color="var(--accent)" /> Explorer All Tools
      </h2>
      
      <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
        
        {/* Row 1: Master SEO Tools */}
        <Link href="/seo-analyzer" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%', borderTop: '4px solid var(--accent)' }}>
            <Globe size={24} color="var(--accent)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>Page SEO Analyzer</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Full website audit for titles, tags, and H1-H3 structure.</p>
          </div>
        </Link>

        <Link href="/youtube-seo" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <Play size={24} color="#ff0000" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>YouTube SEO Opt</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Viral titles and real-time searchability scoring.</p>
          </div>
        </Link>

        <Link href="/crypto" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <LineChart size={24} color="#0071e3" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>Crypto Profit Calc</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Advanced ROI tracker with US Tax deduction logic.</p>
          </div>
        </Link>

        {/* Row 2: Content Tools */}
        <Link href="/ai-hook" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <Bot size={24} color="#34c759" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>AI Viral Hooks</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Psychological frameworks for retention.</p>
          </div>
        </Link>

        <Link href="/instagram-caption" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <Camera size={24} color="#cc2366" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>Insta Caption Gen</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>AI-driven captions for reels and posts.</p>
          </div>
        </Link>

        <Link href="/tiktok-hashtags" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <TrendingUp size={24} color="#00f2ea" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>TikTok Hashtags</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>High-velocity trending tag generator.</p>
          </div>
        </Link>

        {/* Row 3: Utilities */}
        <Link href="/word-counter" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <Type size={24} color="#0071e3" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>Word Counter</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Readability analysis and density stats.</p>
          </div>
        </Link>

        <Link href="/pdf-converter" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <FileCode2 size={24} color="#ff3b30" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>PDF to SVG</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Private, client-side vector conversion.</p>
          </div>
        </Link>

        <Link href="/base64-converter" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <ImageIcon size={24} color="#32d74b" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>Image to Base64</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Instant encoding for developers.</p>
          </div>
        </Link>

        <Link href="/bg-remover" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%', border: '1px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Eraser size={24} color="var(--accent)" />
              <span className="tag-badge" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>AI NEW</span>
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>BG Remover HD</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Remove image backgrounds with AI precision.</p>
          </div>
        </Link>


        <Link href="/meta-tags" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <Tags size={24} color="#a8c7fa" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>Meta Tag Builder</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>SEO and OG Tag generation suite.</p>
          </div>
        </Link>

        <Link href="/password-gen" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <ShieldCheck size={24} color="#ffcc00" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>Password Maker</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Secure, randomized key generation.</p>
          </div>
        </Link>

        <Link href="/json-formatter" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
            <Braces size={24} color="#a8c7fa" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>JSON Formatter</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Validate and beautify JSON strings.</p>
          </div>
        </Link>

      </div>

      <AdSensePlaceholder type="mid-content" />

      {/* Free SEO & Dev Tools Section */}
      <h2 style={{ fontSize: '24px', marginTop: '60px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--card-border)', color: 'var(--foreground)' }}>Free SEO & Developer Tools</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '80px' }}>
        
        <Link href="/meta-tags" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px' }}>
              <Tags size={24} color="var(--foreground)" />
            </div>
            <div>
              <h4 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '4px' }}>SEO Meta Generator</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.4 }}>Create perfect HTML meta tags.</p>
            </div>
          </div>
        </Link>

        <Link href="/password-gen" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px' }}>
              <ShieldCheck size={24} color="var(--foreground)" />
            </div>
            <div>
              <h4 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '4px' }}>Secure Password Gen</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.4 }}>Military-grade string generation.</p>
            </div>
          </div>
        </Link>

        <Link href="/json-formatter" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px' }}>
              <Braces size={24} color="var(--foreground)" />
            </div>
            <div>
              <h4 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '4px' }}>JSON Formatter</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.4 }}>Validate and beautify raw JSON.</p>
            </div>
          </div>
        </Link>

      </div>
      
    </div>
  );
}
