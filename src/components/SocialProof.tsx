'use client';

import React, { useEffect, useState } from 'react';

interface PHData {
  upvotes: number;
  reviewsCount: number;
  reviewsRating: number;
}

const GOOGLE_REVIEW_URL = 'https://g.page/r/CT8buu40JhIcEBM/review';
const PH_URL = 'https://www.producthunt.com/p/toolsnappy';
const TP_REVIEW_URL = 'https://www.trustpilot.com/review/toolsnappy.com';

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function TpStarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#00E676">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function SocialProof() {
  const [ph, setPh] = useState<PHData | null>(null);
  const [phError, setPhError] = useState(false);

  useEffect(() => {
    fetch('/api/producthunt')
      .then(r => r.json())
      .then(d => { if (d.upvotes !== undefined) setPh(d); else setPhError(true); })
      .catch(() => setPhError(true));
  }, []);

  return (
    <div className="content-container" style={{ padding: '40px 24px 0' }}>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap',
      }}>
        <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 24px', borderRadius: '14px',
            transition: 'all 0.2s', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', gap: '2px', color: '#fbbc04', fontSize: '13px', lineHeight: 1 }}>
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500 }}>
                Rate us on Google
              </span>
            </div>
          </div>
        </a>

        <a href={PH_URL} target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 24px', borderRadius: '14px',
            transition: 'all 0.2s', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#da552f', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 16.5h-3.5l-1.5-4.5-1.5 4.5H7l3.5-10h3l3.5 10z" transform="rotate(180 12 12)" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                {ph && !phError ? (
                  <span>▲ {ph.upvotes} points</span>
                ) : (
                  <span style={{ color: '#fff' }}>Product Hunt</span>
                )}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>
                {ph && !phError ? `${ph.reviewsCount} reviews` : 'Follow us'}
              </span>
            </div>
          </div>
        </a>

        <a href={TP_REVIEW_URL} target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 24px', borderRadius: '14px',
            transition: 'all 0.2s', cursor: 'pointer',
            border: '1px solid rgba(0, 230, 118, 0.2)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0, 230, 118, 0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 230, 118, 0.2)'; }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#00e676', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '0 0 12px rgba(0, 230, 118, 0.3)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0f">
                <path d="M12 0c-1.2 0-2.2.9-2.4 2.1L8.9 7.6H3.2c-1.2 0-2.2.9-2.4 2.1-.2 1.2.4 2.5 1.5 3.1l4.6 3.1-1.8 5.5c-.4 1.2.1 2.5 1.2 3.1s2.4.3 3.3-.4L12 18.3l4.4 3.2c.9.7 2.2.8 3.3.4s1.6-1.9 1.2-3.1l-1.8-5.5 4.6-3.1c1.1-.6 1.7-1.9 1.5-3.1-.2-1.2-1.2-2.1-2.4-2.1h-5.7l-.7-5.5C14.2.9 13.2 0 12 0z" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', gap: '2px', fontSize: '13px', lineHeight: 1, marginBottom: '2px' }}>
                {[1,2,3,4,5].map(i => <TpStarIcon key={i} />)}
              </div>
              <span style={{ fontSize: '12px', color: '#00E676', fontWeight: 700 }}>
                Trustpilot
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
