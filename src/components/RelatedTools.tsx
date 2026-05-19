import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const tools = [
  { name: 'SEO Analyzer', path: '/seo-analyzer' },
  { name: 'YouTube SEO', path: '/youtube-seo' },
  { name: 'Crypto Calc', path: '/crypto' },
  { name: 'AI Viral Hooks', path: '/ai-hook' },
  { name: 'Word Counter', path: '/word-counter' },
  { name: 'Car Loan Calculator', path: '/car-loan-calculator' },
  { name: 'Mortgage Calculator', path: '/mortgage-calculator' },
  { name: 'Image Upscaler', path: '/image-upscaler' },
  { name: 'Background Remover', path: '/bg-remover' },
  { name: 'JSON Formatter', path: '/json-formatter' },
  { name: 'YouTube Monetization', path: '/youtube-monetization' },
  { name: 'Facebook Monetization', path: '/facebook-monetization' },
  { name: 'Instagram Monetization', path: '/instagram-monetization' },
];

export default function RelatedTools({ currentPath }: { currentPath: string }) {
  const filtered = tools.filter(t => t.path !== currentPath).slice(0, 3);

  return (
    <div style={{ marginTop: '80px', borderTop: '1px solid var(--card-border)', paddingTop: '40px' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--foreground)' }}>Explore Related Tools</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {filtered.map((t) => (
          <Link key={t.path} href={t.path} style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s ease' }}>
              <span style={{ fontSize: '15px', color: 'var(--foreground)', fontWeight: '500' }}>{t.name}</span>
              <ChevronRight size={16} color="var(--muted)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
