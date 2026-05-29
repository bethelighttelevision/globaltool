"use client";

import React, { useState } from 'react';
import { RefreshCw, Copy, Check, MessageSquare, Briefcase, Camera, Mail, Sparkles, Loader2 } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

type Platform = 'twitter' | 'linkedin' | 'instagram' | 'newsletter';

interface RepurposerOutput {
  twitter: string;
  linkedin: string;
  instagram: string;
  newsletter: string;
}

const tones = [
  { id: 'professional', label: 'Professional' },
  { id: 'casual', label: 'Casual' },
  { id: 'storytelling', label: 'Storytelling' },
  { id: 'persuasive', label: 'Persuasive' },
];

const platforms: { id: Platform; label: string; icon: React.ComponentType<{ size?: number }>; color: string }[] = [
  { id: 'twitter', label: 'Twitter Thread', icon: MessageSquare, color: '#1da1f2' },
  { id: 'linkedin', label: 'LinkedIn Post', icon: Briefcase, color: '#0a66c2' },
  { id: 'instagram', label: 'Instagram Caption', icon: Camera, color: '#e1306c' },
  { id: 'newsletter', label: 'Newsletter', icon: Mail, color: '#ff9f0a' },
];

export default function BlogToSocialPage() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('professional');
  const [outputs, setOutputs] = useState<RepurposerOutput | null>(null);
  const [activePlatform, setActivePlatform] = useState<Platform>('twitter');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.trim(), tone }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate content.');
      }
      const data = await res.json();
      setOutputs(data as RepurposerOutput);
      setActivePlatform('twitter');
      setCopied(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!outputs) return;
    await navigator.clipboard.writeText(outputs[activePlatform]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      icon={<RefreshCw size={40} />}
      title="Blog to Social Repurposer"
      description="Convert any blog post into Twitter threads, LinkedIn posts, Instagram captions, and newsletters — optimized by AI with your chosen tone."
      seo={{
        toolName: "Blog to Social Media Repurposer",
        description: "Convert blog posts into social media content using AI. Free content repurposing tool for Twitter, LinkedIn, Instagram, and email newsletters.",
        url: "https://toolsnappy.com/blog-to-social"
      }}
      currentPath="/blog-to-social"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Free Blog to Social Media Repurposer — Multiply Your Content Reach</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            You spend hours researching, writing, and polishing your blog posts. But after publishing, most of that content gets one chance to perform before fading into your archive. Content repurposing changes this. With our <strong>blog to social media tool</strong>, you take one blog post and instantly generate a Twitter thread, a LinkedIn post, an Instagram caption, and an email newsletter — all optimized for each platform unique format and audience expectations.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Content Repurposing Is Essential</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Repurposing extends your content lifespan by giving it new formats for new audiences. A single article can generate weeks of social media content across multiple platforms. Our <strong>content repurposing tool</strong> automates the formatting so you can focus on strategy rather than manual reformatting.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How the AI Repurposer Works</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Paste your blog post, select a tone (Professional, Casual, Storytelling, or Persuasive), and click Generate. The AI analyzes the text, identifies key points, and reformats each section for the selected platform. The Twitter thread breaks content into tweet-sized chunks. The LinkedIn post frames the main insight as professional commentary. The Instagram caption creates a hook with value bullets. The newsletter transforms the article into a personal email.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Who Benefits from This Tool</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            <strong>Bloggers and Content Creators:</strong> Stop writing separate posts for each channel.<br />
            <strong>Marketing Teams:</strong> Ensure consistent messaging across all channels.<br />
            <strong>Solopreneurs:</strong> Repurpose once, post everywhere, and focus on your business.<br />
            <strong>Freelance Writers:</strong> Offer content repurposing as an add-on service to clients.
          </p>
        </article>
      }
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Paste your blog post content</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your blog post content here. Include the main article text..."
            style={{
              width: '100%', minHeight: '220px', padding: '16px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
              color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.7',
              resize: 'vertical', fontFamily: 'inherit'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Content Tone</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tones.map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                style={{
                  padding: '8px 18px', borderRadius: '8px', border: `1px solid ${tone === t.id ? 'var(--accent)' : 'var(--card-border)'}`,
                  background: tone === t.id ? 'rgba(41,151,255,0.1)' : 'rgba(255,255,255,0.03)',
                  color: tone === t.id ? 'var(--accent)' : 'var(--muted)',
                  cursor: 'pointer', fontSize: '13px', fontWeight: tone === t.id ? 600 : 400,
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={!input.trim() || loading}
          className="premium-button"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto 32px', padding: '14px 40px', opacity: (!input.trim() || loading) ? 0.5 : 1, cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer' }}
        >
          {loading ? <Loader2 size={20} className="spin" /> : <Sparkles size={20} />}
          {loading ? 'Generating...' : 'Generate Posts'}
        </button>
        {error && <p style={{ color: '#ff3b30', fontSize: '13px', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}
        {outputs && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {platforms.map(p => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePlatform(p.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
                      borderRadius: '10px', border: `1px solid ${activePlatform === p.id ? p.color : 'var(--card-border)'}`,
                      background: activePlatform === p.id ? `${p.color}20` : 'rgba(255,255,255,0.03)',
                      color: activePlatform === p.id ? p.color : 'var(--muted)', cursor: 'pointer',
                      fontSize: '13px', fontWeight: activePlatform === p.id ? 600 : 400, transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={16} /> {p.label}
                  </button>
                );
              })}
            </div>
            <div style={{ position: 'relative' }}>
              <textarea
                readOnly
                value={outputs[activePlatform]}
                style={{
                  width: '100%', minHeight: '300px', padding: '16px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
                  color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.7',
                  resize: 'vertical', fontFamily: 'inherit', marginBottom: '16px'
                }}
              />
              <button
                onClick={handleCopy}
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '8px',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid var(--card-border)',
                  color: copied ? '#32d74b' : 'var(--muted)', cursor: 'pointer', fontSize: '12px'
                }}
              >
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              {(['twitter', 'linkedin', 'instagram', 'newsletter'] as const).map(p => (
                <div key={p} style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>{outputs[p].split(/\s+/).filter(Boolean).length}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{p === 'twitter' ? 'Tweets' : p === 'instagram' ? 'Chars' : 'Words'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!input && !outputs && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--card-border)' }}>
            <RefreshCw size={40} color="var(--muted)" style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ color: 'var(--muted)' }}>Paste your blog content above, select a tone, and generate posts for all platforms at once</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
