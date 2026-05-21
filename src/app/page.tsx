import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
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
  Type,
  Image as ImageIcon,
  TrendingUp,
  Search,
  Globe,
  ZoomIn,
  Star,
  Video,
  Hash,
  Download,
  Eye,
  List,
  DollarSign,
  Award,
  FileText,
  Music
} from 'lucide-react';

export const metadata = {
  title: 'ToolSnappy | #1 Free SEO & Social Media Suite 2026',
  description: 'Access 15+ professional tools: AI Lucky Number Finder, Page SEO Analyzer, AI Background Remover, Crypto ROI Calculator, and TikTok tools. 100% Free.',
  keywords: 'ToolSnappy, AI Lucky Number Finder, Free SEO Tools 2026, Best AI Hook Generator, AI Background Remover, Crypto Profit Calculator USA, YouTube SEO Tool, Instagram Caption Generator, TikTok Hashtag Generator',
};

export default function Home() {
  return (
    <div className="content-container animate-fade-in" style={{ padding: '40px 24px' }}>
      <AdSensePlaceholder type="header" />
      
      {/* JSON-LD WebSite + Organization Schema */}
      <Script id="website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", "name": "ToolSnappy", "url": "https://toolsnappy.com", "description": "Free SEO, social media, and developer tools suite.", "potentialAction": { "@type": "SearchAction", "target": "https://toolsnappy.com/search?q={search_term_string}", "query-input": "required name=search_term_string" } }, { "@type": "Organization", "name": "ToolSnappy", "url": "https://toolsnappy.com", "logo": "https://toolsnappy.com/logo.png" }] }) }} />
      
      <section className="animate-slide-up" style={{ textAlign: 'center', marginBottom: '80px', marginTop: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '100px', marginBottom: '24px', border: '1px solid var(--card-border)' }}>
          <TrendingUp size={16} color="var(--accent)" />
          <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--muted)' }}>New: Page SEO Analyzer Audit Tool</span>
        </div>
        <h1 className="gradient-text text-4xl sm:text-5xl md:text-6xl font-bold" style={{ lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
          Your Ultimate Digital<br />Arsenal for 2026
        </h1>
        <p className="text-base sm:text-lg md:text-xl" style={{ color: 'var(--muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
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

        <Link href="/lucky-number" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%', border: '1px solid rgba(168, 199, 250, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Star size={24} color="#a8c7fa" />
              <span className="tag-badge" style={{ color: '#a8c7fa', borderColor: '#a8c7fa', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>VIRAL AI</span>
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>AI Lucky Number</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Find your destiny number & 2026 predictions.</p>
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
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%', borderTop: '4px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <ImageIcon size={24} color="var(--accent)" />
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>AI BG Remover</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Adobe-grade neural engine to remove backgrounds instantly.</p>
          </div>
        </Link>

        <Link href="/image-upscaler" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', height: '100%', borderTop: '4px solid #32d74b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <ZoomIn size={24} color="#32d74b" />
              <span className="tag-badge" style={{ color: '#32d74b', borderColor: '#32d74b', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>NEW AI</span>
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--foreground)' }}>Image Upscaler</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>Increase resolution of low-quality images using AI.</p>
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

      {/* YouTube Creator Tools */}
      <h2 style={{ fontSize: '24px', marginTop: '60px', marginBottom: '32px', paddingBottom: '12px', borderBottom: '1px solid var(--card-border)', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Play size={22} color="#ff0000" /> YouTube Creator Tools
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>

        <Link href="/youtube-tag-extractor" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #0071e3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <List size={28} color="#0071e3" />
              <span className="tag-badge" style={{ color: '#0071e3', borderColor: '#0071e3', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>FREE</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>YouTube Tag Extractor</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Extract all tags, hashtags, and keywords from any YouTube video instantly.</p>
          </div>
        </Link>

        <Link href="/youtube-thumbnail-analyzer" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #32d74b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <ImageIcon size={28} color="#32d74b" />
              <span className="tag-badge" style={{ color: '#32d74b', borderColor: '#32d74b', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>AI</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>YouTube Thumbnail Analyzer</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>AI-powered analysis of composition, colors, text, and CTR potential.</p>
          </div>
        </Link>

        <Link href="/youtube-thumbnail-tester" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #ffcc00' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Eye size={28} color="#ffcc00" />
              <span className="tag-badge" style={{ color: '#ffcc00', borderColor: '#ffcc00', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>FREE</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>YouTube Thumbnail Tester</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Preview your thumbnail in search, suggested, and home page mockups.</p>
          </div>
        </Link>

        <Link href="/youtube-thumbnail-downloader" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #ff3b30' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Download size={28} color="#ff3b30" />
              <span className="tag-badge" style={{ color: '#ff3b30', borderColor: '#ff3b30', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>FREE</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>YouTube Thumbnail Downloader</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Download thumbnails in all resolutions from HD to default quality.</p>
          </div>
        </Link>

      </div>

      {/* Video Downloaders Section */}
      <h2 style={{ fontSize: '24px', marginTop: '60px', marginBottom: '32px', paddingBottom: '12px', borderBottom: '1px solid var(--card-border)', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Download size={22} color="var(--accent)" /> Video Downloaders
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>

        <Link href="/youtube-video-downloader" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #ff0000' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Play size={28} color="#ff0000" />
              <span className="tag-badge" style={{ color: '#ff0000', borderColor: '#ff0000', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>NEW</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>YouTube Video Downloader</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Download YouTube videos in HD quality. Paste URL and save directly.</p>
          </div>
        </Link>

        <Link href="/facebook-video-downloader" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #1877f2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Video size={28} color="#1877f2" />
              <span className="tag-badge" style={{ color: '#1877f2', borderColor: '#1877f2', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>NEW</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>Facebook Video Downloader</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Download Facebook videos. Paste any video URL and save to your device.</p>
          </div>
        </Link>

        <Link href="/instagram-video-downloader" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #cc2366' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Camera size={28} color="#cc2366" />
              <span className="tag-badge" style={{ color: '#cc2366', borderColor: '#cc2366', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>NEW</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>Instagram Video Downloader</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Download Instagram videos, reels, and stories. Paste URL and save.</p>
          </div>
        </Link>

        <Link href="/tiktok-video-downloader" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #00f2ea' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Music size={28} color="#00f2ea" />
              <span className="tag-badge" style={{ color: '#00f2ea', borderColor: '#00f2ea', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>NEW</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>TikTok Video Downloader</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Download TikTok videos. Paste any URL and save to your device.</p>
          </div>
        </Link>

      </div>

      {/* Finance Arsenal Section (HIGH CPC) */}
      <h2 style={{ fontSize: '24px', marginTop: '60px', marginBottom: '32px', paddingBottom: '12px', borderBottom: '1px solid var(--card-border)', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <TrendingUp size={22} color="#32d74b" /> Finance & Loan Arsenal
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
        <Link href="/car-loan-calculator" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #32d74b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <TrendingUp size={28} color="#32d74b" />
              <span className="tag-badge" style={{ color: '#32d74b', borderColor: '#32d74b', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>HIGH CPC</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>Car Loan Calculator</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Calculate monthly EMI and total interest for your vehicle finance.</p>
          </div>
        </Link>

        <Link href="/mortgage-calculator" style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ padding: '32px', cursor: 'pointer', height: '100%', borderTop: '4px solid #0071e3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Globe size={28} color="#0071e3" />
              <span className="tag-badge" style={{ color: '#0071e3', borderColor: '#0071e3', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>PREMIUM</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--foreground)' }}>Mortgage Calculator</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>Advanced home loan planner with amortization and interest breakdown.</p>
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
