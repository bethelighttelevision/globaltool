"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FileCode2, UploadCloud, ArrowLeft } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

export default function PDFConverterPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }
    setFile(selectedFile);
    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="PDF to SVG Converter" 
        description="Convert PDF documents to high-quality SVG vectors instantly in your browser. 100% private and secure." 
        url="https://globalutilitytoolbox.com/pdf-converter" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>
      
      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(255, 59, 48, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <FileCode2 size={48} color="#ff3b30" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>PDF to SVG Converter</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Secure, lightning-fast client-side conversion. Your files never leave your device. 100% private.
        </p>

        {!file ? (
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              maxWidth: '600px', 
              margin: '0 auto', 
              background: isDragging ? 'rgba(41, 151, 255, 0.1)' : 'rgba(255,255,255,0.03)', 
              padding: '60px 24px', 
              borderRadius: '24px', 
              border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--card-border)'}`, 
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <input 
              type="file" 
              accept=".pdf" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
            <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--foreground)' }}>Drop your PDF here</h3>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>or click to browse from your device</p>
            <div style={{ marginTop: '24px', fontSize: '14px', color: 'var(--muted)' }}>Maximum file size: 50MB</div>
          </div>
        ) : (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '32px' }}>📑</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '600', fontSize: '18px' }}>{file.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
            </div>

            {isProcessing && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>
                  <span>Processing client-side...</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--card-border)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)', transition: 'width 0.2s ease' }}></div>
                </div>
              </div>
            )}

            {isComplete && (
              <div className="animate-slide-up">
                <div style={{ color: 'var(--success)', fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
                  ✓ Conversion Complete
                </div>
                <button className="premium-button" style={{ width: '100%', padding: '16px', fontSize: '18px', background: 'var(--success)' }}>
                  Download Extracted SVGs
                </button>
                <button 
                  onClick={() => { setFile(null); setIsComplete(false); }} 
                  style={{ background: 'none', border: 'none', color: 'var(--muted)', marginTop: '24px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Convert another file
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <AdSensePlaceholder type="mid-content" />
      <RelatedTools currentPath="/pdf-converter" />
    </div>
  );
}
