"use client";

import React, { useState } from 'react';
import { Sparkles, CheckCircle, FileText, PenLine, Globe, ArrowUpRight, Shield, Mail } from 'lucide-react';
import Link from 'next/link';

export default function WriteForUsPage() {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    website: '',
    topic: '',
    outline: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/guest-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to submit. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="content-container animate-fade-in" style={{ padding: '80px 24px', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'rgba(50, 215, 75, 0.1)', border: '2px solid rgba(50, 215, 75, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 32px', color: '#32d74b'
        }}>
          <CheckCircle size={40} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, marginBottom: '16px' }}>
          Thanks {formData.authorName}!
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 40px' }}>
          We have received your guest post proposal. Our editorial team will review it and get back to you within 48 hours at <strong style={{ color: '#fff' }}>{formData.authorEmail}</strong>.
        </p>
        <div className="glass-panel" style={{ padding: '24px', maxWidth: '450px', margin: '0 auto', borderLeft: '4px solid var(--accent)' }}>
          <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            In the meantime, explore our <Link href="/free-online-tools-for-creators" style={{ color: 'var(--accent)' }}>free online tools</Link> 
            {' '}or read our latest <Link href="/blog" style={{ color: 'var(--accent)' }}>expert guides</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container animate-fade-in" style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 20px', borderRadius: '100px',
          background: 'rgba(41, 151, 255, 0.08)', border: '1px solid rgba(41, 151, 255, 0.15)',
          color: 'var(--accent)', fontSize: '13px', fontWeight: 600, marginBottom: '24px'
        }}>
          <PenLine size={14} /> Write for ToolSnappy
        </div>
        <h1 className="gradient-text" style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.02em' }}>
          Share Your Expertise with the World
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
          Join 30+ expert contributors. Get published on ToolSnappy and reach thousands of SEO professionals, creators, and digital marketers every month.
        </p>
      </div>

      {/* Benefits Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '60px' }}>
        {[
          { icon: <Globe size={24} />, title: 'Grow Your Audience', desc: 'Your work gets in front of targeted visitors actively searching for expert content in your niche.', color: '#2997ff' },
          { icon: <ArrowUpRight size={24} />, title: 'Dofollow Backlink', desc: 'Earn a high-authority dofollow backlink from a trusted domain to boost your own site&rsquo;s SEO.', color: '#32d74b' },
          { icon: <Shield size={24} />, title: 'Build Authority', desc: 'Establish yourself as a thought leader in SEO, digital marketing, finance, or AI content creation.', color: '#bf5af2' },
          { icon: <Sparkles size={24} />, title: 'Social Media Promotion', desc: 'We promote your article across our Twitter and LinkedIn network for extra visibility.', color: '#ff9f0a' },
        ].map((benefit, i) => (
          <div key={i} className="glass-panel" style={{ padding: '28px', borderTop: `3px solid ${benefit.color}` }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${benefit.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: benefit.color, marginBottom: '16px' }}>
              {benefit.icon}
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{benefit.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{benefit.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        {/* Guidelines */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>Guest Posting Guidelines</h2>

          <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid #32d74b', marginBottom: '20px' }}>
            <h4 style={{ color: '#32d74b', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>What We Accept</h4>
            <ul style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 2, paddingLeft: '20px', margin: 0 }}>
              <li>Original, unpublished content only (no AI-generated)</li>
              <li>Minimum 1,200 words with practical insights</li>
              <li>Relevant topics: SEO, Social Media, Crypto, Finance, AI Tools, Marketing</li>
              <li>Well-structured with headings, bullet points, and examples</li>
              <li>Max 2 dofollow outbound links (including your own site)</li>
              <li>Author bio (max 100 words) with headshot URL</li>
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid #ff453a' }}>
            <h4 style={{ color: '#ff453a', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>What We Do Not Accept</h4>
            <ul style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 2, paddingLeft: '20px', margin: 0 }}>
              <li>AI-generated or spun content</li>
              <li>Promotional or sales-focused articles</li>
              <li>Affiliate links without disclosure</li>
              <li>Topics unrelated to our niche</li>
              <li>Previously published content (no reposts)</li>
              <li>Generic or overly thin content under 1,200 words</li>
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '24px', marginTop: '20px', background: 'rgba(41, 151, 255, 0.03)' }}>
            <h4 style={{ fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Our Process</h4>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Submit your topic idea below. Our editorial team reviews it within 48 hours. If approved, you submit the full draft. We review, give feedback if needed, and publish with full author credit.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(41, 151, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Submit Your Proposal</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>Fill in the details and we will get back to you.</p>
            </div>
          </div>

          {error && (
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255, 69, 58, 0.08)', border: '1px solid rgba(255, 69, 58, 0.15)', color: '#ff453a', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="label-text">Your Name *</label>
                <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} required
                  className="input-field" placeholder="e.g. John Doe" style={{ width: '100%' }} />
              </div>
              <div>
                <label className="label-text">Email Address *</label>
                <input type="email" name="authorEmail" value={formData.authorEmail} onChange={handleChange} required
                  className="input-field" placeholder="john@example.com" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <label className="label-text">Website / Blog URL</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange}
                className="input-field" placeholder="https://yoursite.com (for backlink)" style={{ width: '100%' }} />
            </div>

            <div>
              <label className="label-text">Article Topic / Title Idea *</label>
              <input type="text" name="topic" value={formData.topic} onChange={handleChange} required
                className="input-field" placeholder="e.g. Advanced YouTube SEO Strategies for 2026" style={{ width: '100%' }} />
            </div>

            <div>
              <label className="label-text">Article Outline / Description *</label>
              <textarea name="outline" value={formData.outline} onChange={handleChange} required rows={5}
                className="input-field" placeholder="Describe your article idea, key points, and what makes it unique..." style={{ width: '100%', resize: 'vertical' }} />
            </div>

            <div>
              <label className="label-text">Additional Message <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3}
                className="input-field" placeholder="Anything else you would like us to know?" style={{ width: '100%', resize: 'vertical' }} />
            </div>

            <button type="submit" disabled={loading} className="premium-button" style={{
              width: '100%', padding: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center',
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? (
                <>Submitting...</>
              ) : (
                <><Mail size={18} /> Submit Proposal</>
              )}
            </button>

            <p style={{ color: 'var(--muted)', fontSize: '12px', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
              By submitting, you agree to our <Link href="/terms" style={{ color: 'var(--accent)' }}>Terms</Link> and <Link href="/privacy-policy" style={{ color: 'var(--accent)' }}>Privacy Policy</Link>.
              We respect your time and will respond within 48 hours.
            </p>
          </form>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: '80px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '32px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            { q: 'How long does the review process take?', a: 'We review all proposals within 48 hours. Approved articles are typically published within 5-7 business days after draft submission.' },
            { q: 'Can I include links to my own site?', a: 'Yes. You may include up to 2 dofollow backlinks in your article, including one to your own website or portfolio.' },
            { q: 'Do you accept AI-assisted content?', a: 'No. All submissions must be human-written, original content. AI-generated or spun articles will be rejected immediately.' },
            { q: 'Will I get notified when my article is published?', a: 'Yes. We will email you the published link and promote your article on our social media channels.' },
          ].map((faq, i) => (
            <div key={i} className="glass-panel" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{faq.q}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
