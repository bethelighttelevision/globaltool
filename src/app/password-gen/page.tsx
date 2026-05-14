"use client";

import React, { useState, useEffect } from 'react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import Link from 'next/link';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { ShieldCheck, Copy, RefreshCw, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function PasswordGenPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let newPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUppercase, useNumbers, useSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    let score = 0;
    if (length > 12) score += 2;
    if (length > 16) score += 1;
    if (useUppercase) score += 1;
    if (useNumbers) score += 1;
    if (useSymbols) score += 1;

    if (score <= 2) return { label: 'Weak', color: 'var(--error)', width: '33%' };
    if (score <= 4) return { label: 'Good', color: '#ffcc00', width: '66%' };
    return { label: 'Strong', color: 'var(--success)', width: '100%' };
  };

  const strength = calculateStrength();

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Secure Password Generator" 
        description="Generate strong, randomized, and secure passwords instantly to protect your online accounts." 
        url="https://globalutilitytoolbox.com/password-gen" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <ShieldCheck size={48} color="#fff" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Secure Password Generator</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Generate military-grade, cryptographically secure passwords locally in your browser. No data is ever sent to a server.
        </p>

        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '16px', border: '1px solid var(--card-border)', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input 
              type="text" 
              value={password} 
              readOnly 
              style={{ flex: 1, padding: '16px 20px', fontSize: '20px', fontFamily: 'monospace', background: '#000', border: '1px solid var(--card-border)', borderRadius: '12px', color: '#fff', letterSpacing: '0.05em' }} 
            />
            <button onClick={generatePassword} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0 20px', borderRadius: '12px', cursor: 'pointer', color: 'var(--foreground)' }}>
              <RefreshCw size={20} />
            </button>
            <button onClick={handleCopy} style={{ background: 'var(--accent)', border: 'none', padding: '0 24px', borderRadius: '12px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>
              <span>Password Strength: <strong style={{ color: strength.color }}>{strength.label}</strong></span>
            </div>
            <div style={{ height: '6px', background: 'var(--card-border)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s ease' }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--foreground)', marginBottom: '16px' }}>
              <span>Password Length ({length})</span>
              <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} style={{ width: '60%' }} />
            </label>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)', cursor: 'pointer' }}>
                <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                Uppercase (A-Z)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)', cursor: 'pointer' }}>
                <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                Numbers (0-9)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)', cursor: 'pointer' }}>
                <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                Symbols (!@#$)
              </label>
            </div>
          </div>

        </div>
      </div>
      
      <AdSensePlaceholder type="mid-content" />
      <RelatedTools currentPath="/password-gen" />
    </div>
  );
}
