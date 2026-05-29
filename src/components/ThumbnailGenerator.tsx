'use client';

import React, { useState, useEffect } from 'react';
import ThumbnailEditor from './ThumbnailEditor';

const STORAGE_KEY = 'thumb-gen-count-v2';
const LIMIT = 3;

function getUsedCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    return data.date === new Date().toDateString() ? data.count : 0;
  } catch {
    return 0;
  }
}

function incrementCount() {
  const next = getUsedCount() + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: new Date().toDateString(), count: next }));
}

const gradients = [
  ['#ff6b6b', '#ee5a24'],
  ['#0c3483', '#6b8cce'],
  ['#11998e', '#38ef7d'],
  ['#fc5c7d', '#6a82fb'],
  ['#0f0c29', '#302b63'],
];

function generatePlaceholder(): string {
  const g = gradients[Math.floor(Math.random() * gradients.length)];
  const c = document.createElement('canvas');
  c.width = 640;
  c.height = 360;
  const ctx = c.getContext('2d');
  if (!ctx) return '';

  const grd = ctx.createLinearGradient(0, 0, 640, 360);
  grd.addColorStop(0, g[0]);
  grd.addColorStop(1, g[1]);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 640, 360);

  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.beginPath();
  ctx.arc(120, 80, 160, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(520, 280, 200, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.arc(320, 180, 260, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText('TOOLSNAPPY', 320, 160);
  ctx.font = 'bold 20px Arial';
  ctx.fillText('AI THUMBNAIL', 320, 200);

  ctx.shadowColor = 'transparent';
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 310, 640, 50);
  ctx.fillStyle = g[0];
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Variant ' + r, 20, 340);

  return c.toDataURL('image/png');
}

function generatePlaceholders(): string[] {
  return Array.from({ length: 3 }, () => generatePlaceholder());
}

export default function ThumbnailGenerator() {
  const [mode, setMode] = useState<'text' | 'youtube'>('text');
  const [prompt, setPrompt] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [used, setUsed] = useState(0);
  const [showGate, setShowGate] = useState(false);
  const [gateEmail, setGateEmail] = useState('');

  useEffect(() => { setUsed(getUsedCount()); }, []);

  function handleGenerate() {
    const input = mode === 'text' ? prompt : youtubeUrl;
    if (!input.trim()) { return; }

    const currentUsed = getUsedCount();
    if (currentUsed >= LIMIT) { setShowGate(true); return; }

    setLoading(true);
    setTimeout(() => {
      setImages(generatePlaceholders());
      incrementCount();
      setUsed(getUsedCount());
      setLoading(false);
    }, 600);
  }

  async function handleGateSubmit() {
    if (!gateEmail.includes('@')) return;
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: gateEmail, source: 'thumbnail-generator' }),
      });
    } catch { /* ignore */ }
    localStorage.removeItem(STORAGE_KEY);
    setUsed(0);
    setShowGate(false);
    setGateEmail('');
  }

  return (
    <section style={{ padding: '60px 0 80px' }}>
      <div className="content-container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '12px', letterSpacing: '-0.03em' }}>
            Free AI <span className="gradient-text-accent">YouTube Thumbnail</span> Generator
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--muted-light)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
            Generate click-worthy thumbnails in seconds. Add text, adjust colors, and download.
            {used < LIMIT ? (
              <span style={{ color: 'var(--accent)' }}> {LIMIT - used} free generations left today.</span>
            ) : (
              <span style={{ color: 'var(--warning)' }}> Daily limit reached.</span>
            )}
          </p>
        </div>

        <div className="glass-panel" style={{ maxWidth: '720px', margin: '0 auto 40px', padding: '32px' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '4px' }}>
            {(['text', 'youtube'] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 600,
                  background: mode === m ? 'rgba(41,151,255,0.15)' : 'transparent',
                  color: mode === m ? 'var(--accent)' : 'var(--muted)',
                }}>
                {m === 'text' ? 'from Text' : 'from YouTube Link'}
              </button>
            ))}
          </div>

          {mode === 'text' ? (
            <input
              placeholder="Describe your video thumbnail (e.g. tech review, blue bg, shocked face)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          ) : (
            <input
              placeholder="Paste a YouTube video URL..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="premium-button"
            style={{
              marginTop: '20px', width: '100%', padding: '14px', fontSize: '15px',
              opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            {loading ? 'Generating...' : 'Generate Thumbnails'}
          </button>
        </div>

        {images.length > 0 && (
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: '#fff' }}>
              Select a thumbnail to edit
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImg(img)}
                  className="glass-panel"
                  style={{
                    cursor: 'pointer', overflow: 'hidden', borderRadius: '12px',
                    border: selectedImg === img ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'all 0.2s', aspectRatio: '16/9',
                    background: '#0a0a0f',
                  }}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedImg && (
          <ThumbnailEditor imageUrl={selectedImg} onClose={() => setSelectedImg(null)} />
        )}

        {showGate && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          }}>
            <div className="glass-panel" style={{ padding: '40px', maxWidth: '420px', width: '90%', textAlign: 'center', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Free limit reached 🎯</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted-light)', marginBottom: '24px', lineHeight: 1.6 }}>
                Get <strong>{LIMIT} more free generations</strong> by sharing your email.
              </p>
              <input
                placeholder="your@email.com"
                value={gateEmail}
                onChange={(e) => setGateEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGateSubmit()}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none', marginBottom: '16px',
                  boxSizing: 'border-box',
                }}
              />
              <button onClick={handleGateSubmit} className="premium-button" style={{ width: '100%', padding: '14px', fontSize: '15px' }}>
                Get More Free Credits
              </button>
              <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '12px' }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
