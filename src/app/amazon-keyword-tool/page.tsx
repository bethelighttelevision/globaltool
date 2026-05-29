"use client";

import React, { useState, useEffect } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Sparkles, Copy, Check, Loader2, Search, TrendingUp, Tag, BarChart3, Package } from 'lucide-react';

interface KeywordResult {
  highIntent: string[];
  longTail: string[];
  feature: string[];
  benefit: string[];
  related: string[];
}

const STORAGE_KEY = 'amazon-keyword-count';
const MAX_FREE = 3;

function CopyBtn({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      style={{ background: copied ? 'rgba(50,215,75,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid ' + (copied ? 'rgba(50,215,75,0.3)' : 'rgba(255,255,255,0.1)'), color: copied ? '#32d74b' : 'var(--muted)', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : (label || 'Copy')}
    </button>
  );
}

const sectionColors: Record<string, string> = {
  highIntent: '#ff3b30',
  longTail: '#0071e3',
  feature: '#32d74b',
  benefit: '#ff9f0a',
  related: '#818cf8',
};

const sectionLabels: Record<string, string> = {
  highIntent: 'High-Intent Keywords',
  longTail: 'Long-Tail Keywords',
  feature: 'Feature Keywords',
  benefit: 'Benefit Keywords',
  related: 'Related Keywords',
};

const sectionDescs: Record<string, string> = {
  highIntent: 'Shoppers ready to buy',
  longTail: 'Specific phrases close to purchase',
  feature: 'Based on product features',
  benefit: 'Customer benefit focused',
  related: 'Broader category terms',
};

function KeywordSection({ title, desc, keywords, color, allText }: { title: string; desc: string; keywords: string[]; color: string; allText: string }) {
  return (
    <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag size={14} color={color} />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>{title}</h3>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '11px', margin: '4px 0 0 0' }}>{desc} &middot; {keywords.length} keywords</p>
        </div>
        <CopyBtn text={allText} label="Copy All" />
      </div>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {keywords.map((kw, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', padding: '3px 10px', borderRadius: '6px', background: '#fff' + '08', border: '1px solid ' + color + '20', color: color }}>
            {kw}
            <CopyBtn text={kw} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AmazonKeywordPage() {
  const [productName, setProductName] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<KeywordResult | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [count, setCount] = useState(0);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    setCount(stored);
    if (stored >= MAX_FREE) setShowEmail(true);
  }, []);

  const increment = () => {
    const next = count + 1;
    setCount(next);
    localStorage.setItem(STORAGE_KEY, String(next));
    if (next >= MAX_FREE) setShowEmail(true);
  };

  const handleGenerate = async () => {
    if (!productName.trim()) { setError('Please enter a product name.'); return; }
    if (!niche.trim()) { setError('Please enter a category or niche.'); return; }
    if (count >= MAX_FREE) { setShowEmail(true); setError('Free limit reached. Enter your email to continue.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/amazon-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: productName.trim(),
          niche: niche.trim(),
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate keywords.');
      }
      const data = await res.json();
      setResult(data as KeywordResult);
      increment();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate keywords.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tool: 'amazon-keyword-tool' }) });
    } catch {}
    setEmailSent(true);
    localStorage.setItem(STORAGE_KEY, '0');
    setCount(0);
    setShowEmail(false);
  };

  const remaining = MAX_FREE - count;

  const allKeywords = result
    ? [...result.highIntent, ...result.longTail, ...result.feature, ...result.benefit, ...result.related]
    : [];

  return (
    <ToolLayout
      icon={<Search size={40} />}
      title="Amazon Keyword Researcher"
      description="Generate organized Amazon keyword ideas with AI. Get high-intent, long-tail, feature, benefit, and related keywords to help with product research."
      seo={{
        toolName: 'Amazon Keyword Researcher',
        description: 'Generate Amazon keyword ideas organized by category. Free AI tool for high-intent, long-tail, feature, and benefit keyword research.',
        url: 'https://toolsnappy.com/amazon-keyword-tool',
      }}
      currentPath="/amazon-keyword-tool"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Find the Right Amazon Keywords for Your Products</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Keywords are how Amazon shoppers find products. The right keywords help your product appear in relevant searches, while the wrong ones waste opportunities. Our <strong>Amazon keyword researcher</strong> uses AI to generate keyword ideas organized by category — high-intent keywords from shoppers ready to buy, long-tail phrases that capture specific searches, feature keywords based on product attributes, benefit keywords focused on customer needs, and related terms in your product category.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Keyword Organization Matters</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Most keyword tools give you a flat list of terms. Our <strong>Amazon keyword generator</strong> categorizes keywords so you can strategically place them in your listing. High-intent keywords belong in your title and backend search terms. Long-tail keywords go in bullet points and description. Feature and benefit keywords help shoppers understand what your product does and why they need it. This structured approach helps you cover more relevant search queries without keyword stuffing.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How the Keyword Researcher Works</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Enter your product name and category or niche. The AI generates 50-70 keywords organized into five categories. Each category serves a different purpose in your Amazon listing strategy. Review the keywords, copy them individually or by category, and use them as a starting point for your own research.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Who Benefits from This Tool</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            <strong>Amazon Sellers:</strong> Discover keyword ideas for new and existing products to refine your listing strategy.<br />
            <strong>Product Launch Specialists:</strong> Build keyword lists for PPC campaigns and listing optimization before launch.<br />
            <strong>Content Writers:</strong> Use categorized keywords to write more targeted bullet points and product descriptions.<br />
            <strong>Freelance Researchers:</strong> Speed up client keyword research with organized, AI-generated ideas.
          </p>
        </article>
      }
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          {showEmail && !emailSent ? (
            <div style={{ textAlign: 'center' }}>
              <BarChart3 size={32} color="#0071e3" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', color: '#fff', margin: '0 0 8px 0' }}>Want More Keyword Research?</h3>
              <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '16px' }}>You have used all {MAX_FREE} free generations. Enter your email to get 3 more and early access to our paid plan.</p>
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
                <input type="email" className="input-field" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1 }} />
                <button type="submit" className="premium-button" style={{ whiteSpace: 'nowrap' }}>Get 3 More</button>
              </form>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '12px', textAlign: 'center' }}>
                {remaining > 0 ? (remaining + ' free generation' + (remaining !== 1 ? 's' : '') + ' remaining') : 'All free generations used'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" className="input-field" placeholder="Product name (e.g., Yoga Mat, Bluetooth Speaker)" value={productName}
                  onChange={(e) => setProductName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} />
                <input type="text" className="input-field" placeholder="Category or niche (e.g., Fitness, Electronics, Home Decor)" value={niche}
                  onChange={(e) => setNiche(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} />
                <button className="premium-button" onClick={handleGenerate} disabled={loading || !productName.trim() || !niche.trim() || count >= MAX_FREE}
                  style={{ minWidth: '140px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
                  {loading ? 'Generating...' : 'Generate Keywords'}
                </button>
              </div>
              {error && <p style={{ color: '#ff3b30', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
            </>
          )}
        </div>

        {result && !showEmail && (
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ color: 'var(--muted)', fontSize: '12px', margin: 0 }}>{allKeywords.length} keywords generated</p>
              <CopyBtn text={allKeywords.join(', ')} label="Copy All Keywords" />
            </div>

            {(['highIntent', 'longTail', 'feature', 'benefit', 'related'] as const).map(section => (
              <KeywordSection
                key={section}
                title={sectionLabels[section]}
                desc={sectionDescs[section]}
                keywords={result[section]}
                color={sectionColors[section]}
                allText={result[section].join(', ')}
              />
            ))}
          </div>
        )}

        {!productName && !result && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--card-border)', marginTop: '32px' }}>
            <Search size={40} color="var(--muted)" style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ color: 'var(--muted)' }}>Enter your product details above and generate organized keyword ideas</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
