"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Tags, Copy, CheckCircle2, ArrowLeft } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

export default function MetaTagsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [copied, setCopied] = useState(false);

  const generatedTags = `<!-- Basic HTML Meta Tags -->
<title>${title || 'Your Page Title'}</title>
<meta name="description" content="${description || 'Description of your page content.'}">
<meta name="keywords" content="${keywords || 'keyword1, keyword2, keyword3'}">
<meta name="author" content="${author || 'Author Name'}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title || 'Your Page Title'}">
<meta property="og:description" content="${description || 'Description of your page content.'}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title || 'Your Page Title'}">
<meta property="twitter:description" content="${description || 'Description of your page content.'}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="SEO Meta Tag Generator" 
        description="Generate professional meta tags, OpenGraph tags, and Twitter cards to improve your website&apos;s search engine ranking." 
        url="https://globalutilitytoolbox.com/meta-tags" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>
      
      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Tags size={48} color="#fff" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>SEO Meta Tag Generator</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Instantly generate perfectly formatted HTML meta tags, Open Graph (Facebook), and Twitter Cards to boost your 2026 SEO ranking.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--foreground)' }}>Input Details</h3>
            
            <label className="label-text">Site Title ({title.length}/60)</label>
            <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Best Crypto Tools 2026" style={{ marginBottom: '16px' }} />
            
            <label className="label-text">Description ({description.length}/160)</label>
            <textarea className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a compelling description to increase CTR..." rows={3} style={{ marginBottom: '16px', resize: 'vertical' }} />
            
            <label className="label-text">Keywords (Comma separated)</label>
            <input type="text" className="input-field" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="crypto, tools, calculator, SEO" style={{ marginBottom: '16px' }} />
            
            <label className="label-text">Author</label>
            <input type="text" className="input-field" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="John Doe" />
          </div>

          <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--foreground)' }}>Generated Code</h3>
              <button 
                onClick={handleCopy}
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--foreground)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
              >
                {copied ? <CheckCircle2 size={16} color="var(--success)" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            
            <pre style={{ background: '#000', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#a8c7fa', lineHeight: 1.6 }}>
              <code>{generatedTags}</code>
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Definitive Guide to SEO Meta Tags and Open Graph</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Meta tags are the silent communicators between your website and search engines.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Meta Descriptions Still Matter for Traffic</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Although meta descriptions are not a direct ranking factor for Google, they are the &quot;Ad Copy&quot; that appears in search results.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #a8c7fa' }}>
            <h4 style={{ marginTop: 0, color: '#a8c7fa' }}>Social Media Optimization (Open Graph)</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              When you share a link on Facebook, Twitter, or LinkedIn, the platform looks for Open Graph (OG) tags.
            </p>
          </div>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/meta-tags" />
    </div>
  );
}
