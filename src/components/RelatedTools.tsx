import React from 'react';
import Link from 'next/link';
import { Search, Image, Zap, FileText, Activity, DollarSign, Home, CreditCard, FileJson, PlayCircle, Camera, Globe, Download, Eye, List, Music } from 'lucide-react';

const toolIcons: Record<string, React.ReactNode> = {
  '/site-audit': <Search size={24} />,
  '/youtube-seo': <PlayCircle size={24} />,
  '/crypto-profit': <DollarSign size={24} />,
  '/ai-hook': <Zap size={24} />,
  '/word-counter': <FileText size={24} />,
  '/car-loan-calculator': <CreditCard size={24} />,
  '/mortgage-calculator': <Home size={24} />,
  '/image-upscaler': <Image size={24} />,
  '/bg-remover': <Camera size={24} />,
  '/json-formatter': <FileJson size={24} />,
  '/youtube-tag-extractor': <List size={24} />,
  '/youtube-thumbnail-analyzer': <Image size={24} />,
  '/youtube-thumbnail-tester': <Eye size={24} />,
  '/youtube-thumbnail-downloader': <Download size={24} />,

};

const tools = [
  { name: 'SEO Analyzer', path: '/site-audit', desc: 'Instant site audit & health check' },
  { name: 'YouTube SEO', path: '/youtube-seo', desc: 'Optimize your video rankings' },
  { name: 'Crypto Calc', path: '/crypto-profit', desc: 'Profit & ROI calculator' },
  { name: 'AI Viral Hooks', path: '/ai-hook', desc: 'Scroll-stopping hooks' },
  { name: 'Word Counter', path: '/word-counter', desc: 'Count words & reading time' },
  { name: 'Car Loan Calc', path: '/car-loan-calculator', desc: 'EMI & interest calculator' },
  { name: 'Mortgage Calc', path: '/mortgage-calculator', desc: 'Monthly payment estimator' },
  { name: 'Image Upscaler', path: '/image-upscaler', desc: 'AI-powered resolution boost' },
  { name: 'BG Remover', path: '/bg-remover', desc: 'Remove backgrounds instantly' },
  { name: 'JSON Formatter', path: '/json-formatter', desc: 'Format & validate JSON' },
  { name: 'YT Tag Extractor', path: '/youtube-tag-extractor', desc: 'Extract video tags & keywords' },
  { name: 'YT Thumbnail Analyzer', path: '/youtube-thumbnail-analyzer', desc: 'AI thumbnail score & feedback' },
  { name: 'YT Thumbnail Tester', path: '/youtube-thumbnail-tester', desc: 'Preview in YouTube UI mockups' },
  { name: 'YT Thumbnail Downloader', path: '/youtube-thumbnail-downloader', desc: 'Download all resolution thumbnails' },

];

export default function RelatedTools({ currentPath }: { currentPath: string }) {
  const filtered = tools.filter(t => t.path !== currentPath).slice(0, 6);

  return (
    <div style={{ marginTop: '80px', borderTop: '1px solid var(--card-border)', paddingTop: '48px' }}>
      <h3 style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--foreground)' }}>Explore More Tools</h3>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>
        Supercharge your workflow with our complete professional toolkit.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
        {filtered.map((t) => (
          <Link key={t.path} href={t.path} style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{
              padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px',
              cursor: 'pointer', height: '100%'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(41,151,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)'
              }}>
                {toolIcons[t.path] || <Activity size={20} />}
              </div>
              <div>
                <div style={{ fontSize: '14px', color: 'var(--foreground)', fontWeight: '600', marginBottom: '4px' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
