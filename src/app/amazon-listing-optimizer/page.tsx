"use client";

import React, { useState, useEffect } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Sparkles, Copy, Check, Loader2, Package, List, FileText, Search, BarChart3 } from 'lucide-react';

interface ListingOptimizerResult {
  title: string;
  bulletPoints: string[];
  description: string;
  backendTerms: string;
}

const STORAGE_KEY = 'amazon-listing-count';
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

export default function AmazonListingPage() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ListingOptimizerResult | null>(null);
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
    if (!category.trim()) { setError('Please enter a category.'); return; }
    if (count >= MAX_FREE) { setShowEmail(true); setError('Free limit reached. Enter your email to continue.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/amazon-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: productName.trim(),
          category: category.trim(),
          targetAudience: targetAudience.trim(),
          keyFeatures: keyFeatures.trim(),
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate listing.');
      }
      const data = await res.json();
      setResult(data as ListingOptimizerResult);
      increment();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate listing.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tool: 'amazon-listing-optimizer' }) });
    } catch {}
    setEmailSent(true);
    localStorage.setItem(STORAGE_KEY, '0');
    setCount(0);
    setShowEmail(false);
  };

  const remaining = MAX_FREE - count;

  return (
    <ToolLayout
      icon={<Package size={40} />}
      title="Amazon Listing Optimizer"
      description="Generate AI-powered Amazon product listings — optimized titles, bullet points, product descriptions, and backend search terms to help you list with confidence."
      seo={{
        toolName: 'Amazon Listing Optimizer',
        description: 'Generate optimized Amazon product listings with AI. Free tool for titles, bullet points, descriptions, and backend search terms.',
        url: 'https://toolsnappy.com/amazon-listing-optimizer',
      }}
      currentPath="/amazon-listing-optimizer"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Write Better Amazon Listings Faster</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Creating a compelling Amazon product listing takes time. You need an optimized title, persuasive bullet points, a detailed product description, and the right backend search terms — all working together to help shoppers find and understand your product. Our <strong>Amazon listing generator</strong> uses AI to create complete, well-structured listings based on your product details. Enter your product name, category, target audience, and key features, and get a professionally formatted listing in seconds.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>What Makes a Good Amazon Listing</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Amazon customers scan listings quickly. A clear title with relevant keywords, bullet points that explain features and benefits, and a description that tells the product story all help shoppers make informed decisions. Backend search terms ensure your product appears for relevant searches. Our <strong>Amazon listing optimizer</strong> structures all these elements so you can focus on your product rather than the formatting.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How the Listing Optimizer Works</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Tell us your product name, the category it belongs to, your target audience, and its key features. The AI generates an optimized product title under 200 characters, five feature-benefit bullet points, a descriptive product description, and 15-20 backend search terms. Each section follows Amazon listing best practices and uses natural, readable language. Copy any section with one click and paste it directly into your seller account.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Who Benefits from This Tool</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            <strong>Amazon Sellers:</strong> Save time writing and formatting listings for new products. Use the generated content as a starting point and customize for your brand voice.<br />
            <strong>Product Researchers:</strong> Quickly generate listing drafts to evaluate product ideas before sourcing.<br />
            <strong>Freelance Listing Writers:</strong> Speed up your workflow by generating structured listing drafts for clients.<br />
            <strong>New Sellers:</strong> Learn the structure of effective Amazon listings by seeing how titles, bullets, descriptions, and backend terms work together.
          </p>
        </article>
      }
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          {showEmail && !emailSent ? (
            <div style={{ textAlign: 'center' }}>
              <BarChart3 size={32} color="#0071e3" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', color: '#fff', margin: '0 0 8px 0' }}>Want More Listings?</h3>
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
                <input type="text" className="input-field" placeholder="Product name (e.g., Wireless Bluetooth Earbuds)" value={productName}
                  onChange={(e) => setProductName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} />
                <input type="text" className="input-field" placeholder="Category (e.g., Electronics, Home & Kitchen, Sports)" value={category}
                  onChange={(e) => setCategory(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} />
                <input type="text" className="input-field" placeholder="Target audience (e.g., fitness enthusiasts, commuters)" value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} />
                <textarea className="input-field" placeholder="Key features (comma separated: e.g., noise cancelling, 30hr battery, IPX5 waterproof)" value={keyFeatures}
                  onChange={(e) => setKeyFeatures(e.target.value)} style={{ minHeight: '60px', resize: 'vertical' }} />
                <button className="premium-button" onClick={handleGenerate} disabled={loading || !productName.trim() || !category.trim() || count >= MAX_FREE}
                  style={{ minWidth: '140px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
                  {loading ? 'Generating...' : 'Generate Listing'}
                </button>
              </div>
              {error && <p style={{ color: '#ff3b30', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
            </>
          )}
        </div>

        {result && !showEmail && (
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <List size={16} color="#ff9f0a" />
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Optimized Title</h3>
                </div>
                <CopyBtn text={result.title} label="Copy" />
              </div>
              <p style={{ color: 'var(--muted-light)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{result.title}</p>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} color="#32d74b" />
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Bullet Points</h3>
                </div>
                <CopyBtn text={result.bulletPoints.map((b, i) => (i + 1) + '. ' + b).join('\n\n')} label="Copy All" />
              </div>
              <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.bulletPoints.map((b, i) => (
                  <li key={i} style={{ color: 'var(--muted-light)', fontSize: '13px', lineHeight: 1.5 }}>
                    {b}
                    <span style={{ marginLeft: '8px' }}><CopyBtn text={b} label="Copy" /></span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Package size={16} color="#0071e3" />
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Product Description</h3>
                </div>
                <CopyBtn text={result.description} label="Copy" />
              </div>
              <p style={{ color: 'var(--muted-light)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{result.description}</p>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={16} color="#ffcc00" />
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Backend Search Terms</h3>
                </div>
                <CopyBtn text={result.backendTerms} label="Copy" />
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {result.backendTerms.split(',').map((t, i) => (
                  <span key={i} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,204,0,0.1)', color: '#ffcc00' }}>{t.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {!productName && !result && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--card-border)', marginTop: '32px' }}>
            <Package size={40} color="var(--muted)" style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ color: 'var(--muted)' }}>Enter your product details above and generate an optimized Amazon listing</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
