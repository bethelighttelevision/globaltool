"use client";

import { useEffect, useState, useRef, useCallback } from 'react';

export default function Mascot() {
  const ref = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [shake, setShake] = useState(false);

  // ── Blink every 3s ──
  useEffect(() => {
    const blinkFast = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 120);
    };
    blinkFast();
    const id = setInterval(blinkFast, 3000);
    return () => clearInterval(id);
  }, []);

  // ── Pupils follow cursor (clamped within eye white) ──
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxPupil = 5;
      const px = dist > 1 ? (dx / dist) * maxPupil : dx * maxPupil;
      const py = dist > 1 ? (dy / dist) * maxPupil : dy * maxPupil;
      setPupil({ x: px, y: py });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // ── Click → shake ──
  const handleClick = useCallback(() => {
    if (shake) return;
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }, [shake]);

  return (
    <div ref={ref} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }} onClick={handleClick}>
      {/* Glow */}
      <div style={{
        position: 'absolute', width: '200px', height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(41,151,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="animate-mascot-bob" style={{
        animation: shake ? 'mascotShake 0.4s ease-in-out' : undefined,
      }}>
        <div style={{
          transform: `translate(${pupil.x}px, ${pupil.y}px)`,
          transition: 'transform 0.08s linear',
        }}>
          <svg width="160" height="170" viewBox="0 0 160 170" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Handle */}
            <rect x="52" y="8" width="56" height="20" rx="7" fill="#64748b" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <rect x="48" y="24" width="64" height="6" rx="3" fill="#475569" opacity="0.5" />

            {/* Body */}
            <rect x="14" y="26" width="132" height="122" rx="22" fill="url(#bodyG3)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Inner highlight */}
            <rect x="18" y="30" width="124" height="60" rx="18" fill="url(#hlG3)" opacity="0.25" />

            {/* Left eye white */}
            <ellipse cx="56" cy="78" rx="15" ry={blink ? 1.5 : 15} fill="white" style={{ transition: blink ? 'none' : 'ry 0.1s' }} />
            {/* Left pupil group */}
            <g style={{ transform: `translate(${pupil.x}px, ${pupil.y}px)`, transition: 'transform 0.08s linear' }}>
              <circle cx="56" cy="78" r="6.5" fill="#0f172a" />
              <circle cx="53" cy="75" r="2.5" fill="white" opacity="0.9" />
            </g>

            {/* Right eye white */}
            <ellipse cx="104" cy="78" rx="15" ry={blink ? 1.5 : 15} fill="white" style={{ transition: blink ? 'none' : 'ry 0.1s' }} />
            {/* Right pupil group */}
            <g style={{ transform: `translate(${pupil.x}px, ${pupil.y}px)`, transition: 'transform 0.08s linear' }}>
              <circle cx="104" cy="78" r="6.5" fill="#0f172a" />
              <circle cx="101" cy="75" r="2.5" fill="white" opacity="0.9" />
            </g>

            {/* Smile */}
            <path d="M 58 110 Q 80 128 102 110" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Cheeks */}
            <ellipse cx="38" cy="104" rx="10" ry="5" fill="rgba(255,255,255,0.1)" />
            <ellipse cx="122" cy="104" rx="10" ry="5" fill="rgba(255,255,255,0.1)" />

            {/* Divider */}
            <line x1="40" y1="130" x2="120" y2="130" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Drawer */}
            <rect x="56" y="136" width="48" height="10" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            <circle cx="80" cy="141" r="2" fill="rgba(255,255,255,0.15)" />

            <defs>
              <linearGradient id="bodyG3" x1="0" y1="0" x2="160" y2="170">
                <stop offset="0%" stopColor="#2997ff" />
                <stop offset="100%" stopColor="#1a6bc4" />
              </linearGradient>
              <linearGradient id="hlG3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
