"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { Image as ImageIcon, Copy, CheckCircle2, ArrowLeft, UploadCloud, Code } from 'lucide-react';

export default function Base64ConverterPage() {
  const [base64, setBase64] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Please upload an image smaller than 5MB.');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (!base64) return;
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Image to Base64 Converter" 
        description="Convert images into Base64 strings instantly. Perfect for embedding images in HTML, CSS, or JSON files." 
        url="https://globalutilitytoolbox.com/base64-converter" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(50, 215, 75, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <ImageIcon size={40} color="#32d74b" strokeWidth={2} />
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>Image to Base64 Converter</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Convert images into Base64 strings instantly. Perfect for embedding images in HTML, CSS, or JSON files.
        </p>

        {!base64 ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              maxWidth: '600px', 
              margin: '0 auto', 
              background: isDragging ? 'rgba(50, 215, 75, 0.1)' : 'rgba(255,255,255,0.03)', 
              padding: '60px 24px', 
              borderRadius: '24px', 
              border: `2px dashed ${isDragging ? '#32d74b' : 'var(--card-border)'}`, 
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
            <UploadCloud size={48} color="var(--muted)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Drop your image here</h3>
            <p style={{ color: 'var(--muted)' }}>Supports PNG, JPG, WEBP, and GIF</p>
          </div>
        ) : (
          <div className="animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={base64} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{fileName}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Successfully encoded to Base64</div>
              </div>
              <button 
                onClick={() => setBase64('')}
                style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '13px' }}
              >
                Clear
              </button>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Code size={20} color="var(--accent)" /> Base64 String
                </h3>
                <button 
                  onClick={handleCopy}
                  className="premium-button" 
                  style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '10px' }}
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  &nbsp; {copied ? 'Copied String' : 'Copy All'}
                </button>
              </div>
              <textarea 
                readOnly 
                value={base64} 
                style={{ width: '100%', height: '200px', background: '#000', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '16px', color: 'var(--muted)', fontSize: '12px', fontFamily: 'monospace', resize: 'none' }} 
              />
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Deep Dive into Base64 Encoding and Data Integrity</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Base64 encoding is an essential technique used by developers to represent binary data in an ASCII string format. Our <strong>Professional Base64 Converter</strong> ensures fast, accurate, and secure encoding without your data ever leaving your browser.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How Base64 Improves Web Performance</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            By converting small icons or background patterns into Base64 strings, you can reduce the number of HTTP requests a browser has to make. This inline approach can slightly improve site speed and Core Web Vitals for mobile users.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #32d74b' }}>
            <h4 style={{ marginTop: 0, color: '#32d74b' }}>Developer Tip: Data URIs</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              A Data URI allows you to embed a Base64 string directly into an image tag. This is a common practice in modern frontend development when building highly portable UI components.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Is Base64 Encoding the Same as Encryption?</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            A common misconception is that Base64 is a form of encryption. It is not. Base64 is purely a representation format and can be decoded by anyone with access to the string.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/base64-converter" />
    </div>
  );
}
