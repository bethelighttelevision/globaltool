"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { ArrowLeft, Globe, ShieldAlert, Check, AlertCircle, Sparkles } from 'lucide-react';
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

          <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} /> AI Expert Recommendation
            </h3>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--foreground)', fontStyle: 'italic' }}>
              &quot;{audit.expertAdvice}&quot;
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {/* Audit Checklist */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '24px', borderBottom: '1px solid var(--card-border)', paddingBottom: '16px' }}>Audit Checklist</h3>
              {audit.metrics.map((m: { status: string; name: string; desc: string }, i: number) => (
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
      
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>How to Conduct a Professional SEO Audit in 2026</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            In the ever-evolving landscape of search engine optimization, staying ahead of the algorithm is a full-time job. Our <strong>Professional Page SEO Analyzer</strong> is designed to give you an instant, data-driven overview of your website&apos;s health. By analyzing critical elements like Title Tags, Meta Descriptions, and Heading Structures, you can identify precisely what is holding your site back from the first page of Google.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Importance of On-Page SEO Factors</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            While backlinks and off-page signals are important, your on-page SEO is the foundation of your digital presence. If your H1 tags are missing or your meta description is too long, search engine crawlers may struggle to understand your content&apos;s intent. Our tool extracts these elements in real-time, allowing you to fix technical errors before they impact your traffic.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #0071e3' }}>
            <h4 style={{ marginTop: 0, color: '#0071e3' }}>2026 SEO Checklist for Success</h4>
            <ul style={{ color: 'var(--muted)', fontSize: '14px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Title Strength:</strong> Ensure your primary keyword is at the beginning of the title.</li>
              <li style={{ marginBottom: '8px' }}><strong>Heading Hierarchy:</strong> Use only one H1 tag and maintain a logical H2-H3 flow.</li>
              <li style={{ marginBottom: '8px' }}><strong>Mobile Optimization:</strong> Verify that your site loads perfectly on small screens.</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Interpreting Your SEO Health Score</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            A high SEO score (80+) indicates that your page is technically sound and ready to compete for high-volume keywords. If your score is lower, focus on the &quot;ShieldAlert&quot; items in our audit checklist first. These are high-priority issues that typically have the fastest impact on your search engine rankings when resolved.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/seo-analyzer" />
    </div>
  );
}
