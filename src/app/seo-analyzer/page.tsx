"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Globe, ShieldAlert, Check, AlertCircle, Sparkles } from 'lucide-react';
import { analyzeSEOAction } from './actions';
export default function SEOAnalyzerPage() {

  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audit, setAudit] = useState<{
    success: boolean;
    score?: number;
    metrics?: { status: string; name: string; desc: string }[];
    expertAdvice?: string;
    details?: { title: string; description: string; headings: string[] };
    error?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startAudit = async () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    setAudit(null);

    const result = await analyzeSEOAction(url);

    if (result.success) {
      setAudit(result as typeof audit);
    } else {
      setError(result.error || 'Could not analyze this site. Please check the URL and try again.');
    }

    setIsAnalyzing(false);
  };

  return (
    <ToolLayout
      icon={<Globe size={40} strokeWidth={1.5} />}
      title="Page SEO Analyzer"
      description="Enter a URL to perform a live SEO audit. We crawl the page and extract critical ranking factors instantly."
      seo={{
        toolName: "Real-Time SEO Audit Analyzer",
        description: "Get a professional SEO audit of any webpage. We analyze titles, meta tags, heading structures, and performance metrics in real-time.",
        url: "https://globalutilitytoolbox.com/seo-analyzer",
      }}
      currentPath="/seo-analyzer"
      results={audit ? (
        <>
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>SEO Health Score</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Based on 50+ critical SEO signals identified for 2026 ranking factors.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="stat-value" style={{ color: (audit.score || 0) > 80 ? 'var(--success)' : '#ffcc00' }}>{audit.score}</div>
              <div className="stat-label" style={{ marginTop: '8px' }}>Professional Grade</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} /> AI Expert Recommendation
            </h3>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--foreground)', fontStyle: 'italic' }}>
              &quot;{audit.expertAdvice}&quot;
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '24px', borderBottom: '1px solid var(--card-border)', paddingBottom: '16px' }}>Audit Checklist</h3>
              {audit.metrics!.map((m: { status: string; name: string; desc: string }, i: number) => (
                <div key={i} className="tool-result-card" style={{ marginBottom: '16px', padding: '16px', display: 'flex', gap: '16px' }}>
                  <div style={{ marginTop: '2px' }}>
                    {m.status === 'pass' ? <Check size={20} color="var(--success)" /> : <ShieldAlert size={20} color="#ffcc00" />}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--foreground)' }}>{m.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.5 }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Extracted Metadata</h3>
                <div style={{ marginBottom: '20px' }}>
                  <label className="label-text">TITLE TAG</label>
                  <div className="stat-card" style={{ textAlign: 'left', padding: '12px', fontSize: '14px' }}>{audit.details!.title}</div>
                </div>
                <div>
                  <label className="label-text">META DESCRIPTION</label>
                  <div className="stat-card" style={{ textAlign: 'left', padding: '12px', fontSize: '14px', lineHeight: 1.5 }}>{audit.details!.description}</div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Heading Hierarchy</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {audit.details!.headings.map((h: string, i: number) => (
                    <div key={i} className="tool-result-card" style={{ padding: '10px 16px', fontSize: '13px', borderLeft: `4px solid ${h.startsWith('H1') ? 'var(--accent)' : 'var(--card-border)'}` }}>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : undefined}
    >
      <div className="tool-input-section">
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
    </ToolLayout>
  );
}

