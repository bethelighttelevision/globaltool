"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { Search, Copy, CheckCircle2, ArrowLeft, Globe, ShieldAlert, Zap, Smartphone, Check, X, AlertCircle } from 'lucide-react';
import { analyzeSEOAction } from './actions';

export default function SEOAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audit, setAudit] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const startAudit = async () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    setAudit(null);
    
    const result = await analyzeSEOAction(url);
    
    if (result.success) {
      setAudit(result);
    } else {
      setError(result.error || 'Could not analyze this site. Please check the URL and try again.');
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Real-Time SEO Audit Analyzer" 
        description="Get a professional SEO audit of any webpage. We analyze titles, meta tags, heading structures, and performance metrics in real-time." 
        url="https://globalutilitytoolbox.com/seo-analyzer" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(0, 113, 227, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Globe size={40} color="#0071e3" strokeWidth={2} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Page SEO Analyzer</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Enter a URL to perform a live SEO audit. We crawl the page and extract critical ranking factors instantly.
        </p>

        <div style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <Globe style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} size={20} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="https://google.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ paddingLeft: '48px', fontSize: '17px' }}
            />
          </div>
          <button 
            className="premium-button" 
            onClick={startAudit}
            disabled={isAnalyzing}
            style={{ width: '100%', padding: '16px', fontSize: '17px' }}
          >
            {isAnalyzing ? 'Crawling Domain...' : 'Analyze Page SEO'}
          </button>

          {error && (
            <div className="animate-fade-in" style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', background: 'rgba(255, 69, 58, 0.1)', border: '1px solid rgba(255, 69, 58, 0.2)', color: '#ff453a', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
              <AlertCircle size={20} />
              <span style={{ fontSize: '14px' }}>{error}</span>
            </div>
          )}
        </div>
      </div>

      {audit && (
        <div className="animate-slide-up">
          {/* Audit Summary Section */}
          <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>SEO Health Score</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Based on 50+ critical SEO signals identified for 2026 ranking factors.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '56px', fontWeight: 'bold', color: audit.score > 80 ? 'var(--success)' : '#ffcc00' }}>{audit.score}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Professional Grade</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {/* Audit Checklist */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '24px', borderBottom: '1px solid var(--card-border)', paddingBottom: '16px' }}>Audit Checklist</h3>
              {audit.metrics.map((m: any, i: number) => (
                <div key={i} style={{ marginBottom: '20px', display: 'flex', gap: '16px' }}>
                  <div style={{ marginTop: '4px' }}>
                    {m.status === 'pass' ? <Check size={20} color="var(--success)" /> : <ShieldAlert size={20} color="#ffcc00" />}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--foreground)' }}>{m.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.5 }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Analysis */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Extracted Metadata</h3>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>TITLE TAG</label>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px', fontSize: '14px' }}>{audit.details.title}</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>META DESCRIPTION</label>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px', fontSize: '14px', lineHeight: 1.5 }}>{audit.details.description}</div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Heading Hierarchy</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {audit.details.headings.map((h: string, i: number) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', borderLeft: `4px solid ${h.startsWith('H1') ? 'var(--accent)' : 'var(--card-border)'}` }}>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <AdSensePlaceholder type="mid-content" />
      <RelatedTools currentPath="/seo-analyzer" />
    </div>
  );
}
