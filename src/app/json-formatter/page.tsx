"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Braces, Copy, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    if (!inputJson.trim()) {
      setOutputJson('');
      setError(null);
      return;
    }
    
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format');
      setOutputJson('');
    }
  };

  const handleCopy = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setError(null);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="JSON Formatter & Validator" 
        description="Format, beautify, and validate your raw JSON strings instantly in the browser. 100% Free and Private." 
        url="https://globalutilitytoolbox.com/json-formatter" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>
      
      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Braces size={48} color="#fff" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>JSON Formatter & Validator</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Format, beautify, and validate your raw JSON strings instantly in the browser. 
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', textAlign: 'left' }}>
          
          {/* Input Panel */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--foreground)' }}>Raw JSON</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={clearAll} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '13px' }}>Clear</button>
                <button onClick={formatJson} className="premium-button" style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '8px' }}>Format</button>
              </div>
            </div>
            
            <textarea 
              className="input-field" 
              value={inputJson} 
              onChange={(e) => setInputJson(e.target.value)} 
              placeholder='{"paste": "your JSON here"}' 
              style={{ flex: 1, minHeight: '400px', resize: 'vertical', fontFamily: 'monospace', fontSize: '14px', background: '#000' }} 
            />
          </div>

          {/* Output Panel */}
          <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--foreground)' }}>Formatted JSON</h3>
              <button 
                onClick={handleCopy}
                disabled={!outputJson}
                style={{ background: outputJson ? 'var(--card)' : 'transparent', border: outputJson ? '1px solid var(--card-border)' : 'none', color: outputJson ? 'var(--foreground)' : 'var(--muted)', padding: '8px 12px', borderRadius: '8px', cursor: outputJson ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', transition: 'all 0.2s ease' }}
              >
                {copied ? <CheckCircle2 size={16} color="var(--success)" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            
            {error ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--error)', background: 'rgba(255, 59, 48, 0.05)', borderRadius: '12px', border: '1px dashed rgba(255, 59, 48, 0.3)' }}>
                <AlertTriangle size={32} style={{ marginBottom: '16px' }} />
                <div style={{ fontWeight: '500' }}>Invalid JSON</div>
                <div style={{ fontSize: '13px', marginTop: '8px', opacity: 0.8 }}>{error}</div>
              </div>
            ) : (
              <textarea 
                readOnly
                value={outputJson} 
                placeholder='Formatted output will appear here...' 
                style={{ flex: 1, minHeight: '400px', resize: 'vertical', fontFamily: 'monospace', fontSize: '14px', background: 'transparent', border: 'none', color: '#a8c7fa', outline: 'none' }} 
              />
            )}
          </div>

        </div>
      </div>
      
      <AdSensePlaceholder type="mid-content" />
      <RelatedTools currentPath="/json-formatter" />
    </div>
  );
}
