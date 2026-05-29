"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Globe, ShieldAlert, Check, AlertCircle, Sparkles } from 'lucide-react';
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

    const res = await fetch('/api/site-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url.trim() }),
    });
    const result = await res.json();

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
        url: "https://toolsnappy.com/site-audit",
      }}
      currentPath="/site-audit"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Complete Guide to SEO Auditing for Higher Rankings</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            A comprehensive SEO audit is the foundation of every successful search engine optimization strategy. Our free <strong>SEO Analyzer</strong> at ToolSnappy scans any webpage against fifty critical ranking factors and provides actionable recommendations to improve your search visibility. In the 2026 digital landscape, where Google&rsquo;s algorithm updates increasingly prioritize user experience and content quality, regular SEO audits are no longer optional for webmasters, content marketers, and business owners who want to maintain competitive organic traffic levels. Understanding what your site does well and where it falls short is the first step toward dominating your niche search results.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Regular SEO Audits Are Critical in 2026</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Search engine algorithms have evolved dramatically beyond simple keyword matching. Modern ranking systems evaluate hundreds of on-page and off-page signals, including Core Web Vitals, semantic relevance, entity recognition, and content helpfulness. Our Page SEO Analyzer examines every aspect of your webpage that Google considers during its crawling and indexing process. From meta tag optimization and heading hierarchy to structured data markup and internal linking patterns, we surface the specific issues that could be holding your pages back from achieving top search result positions. Regular auditing helps you catch technical problems early, before they compound into traffic losses that take months to recover from.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Key SEO Factors Our Analyzer Evaluates</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Our audit tool examines title tags for optimal length and keyword placement, meta descriptions for click-through rate potential, heading structure for logical content hierarchy, image alt text for accessibility and image search visibility, internal and external link quality, page loading speed indicators, mobile responsiveness signals, and content relevance scoring. Each factor is scored individually and aggregated into an overall SEO health score that ranges from zero to one hundred. We provide specific, actionable recommendations for every underperforming metric so you know exactly what changes to make. This comprehensive approach ensures that no critical ranking factor is overlooked during your optimization process.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #0071e3' }}>
            <h4 style={{ marginTop: 0, color: '#0071e3' }}>What Our SEO Score Means for Your Rankings</h4>
            <ul style={{ color: 'var(--muted)', fontSize: '14px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>90-100 (Excellent):</strong> Your page is well-optimized. Focus on building backlinks and creating additional supporting content.</li>
              <li style={{ marginBottom: '8px' }}><strong>70-89 (Good):</strong> Minor improvements needed. Address the flagged issues to close the gap with top competitors.</li>
              <li style={{ marginBottom: '8px' }}><strong>50-69 (Average):</strong> Several important factors need attention. Prioritize fixes based on impact potential.</li>
              <li style={{ marginBottom: '8px' }}><strong>Below 50 (Poor):</strong> Fundamental SEO issues exist. Start with title tags, meta descriptions, and heading structure before moving to advanced optimizations.</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Common SEO Issues Found Across the Web</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            After analyzing thousands of webpages, our tool has identified several recurring issues that consistently drag down search performance. Missing or duplicate meta descriptions appear on over forty percent of webpages, leading to poor click-through rates from search results. Improper heading hierarchy, where content jumps from H1 directly to H3 or H4 without a logical H2 structure, confuses both search engine crawlers and human readers. Pages with thin content under three hundred words struggle to establish topical authority. Slow loading times, especially on mobile devices, directly impact user engagement signals that Google uses as ranking factors. Our analyzer catches all these issues and more in a single scan.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Act on Your SEO Audit Results</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Once your audit is complete, prioritize fixes based on their potential ranking impact. Start with critical technical issues like missing title tags, broken links, and slow-loading resources. Next, optimize your meta descriptions to improve click-through rates. Then restructure your heading hierarchy to create a clear topical outline that both users and search engines can navigate easily. Finally, use the AI Expert Recommendation provided with each audit to identify strategic content improvements that can push your page from good to great. Schedule recurring audits to track your progress and catch new issues as your site evolves over time.
          </p>
        </article>
      }
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
