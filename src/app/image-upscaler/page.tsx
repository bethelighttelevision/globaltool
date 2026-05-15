"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { UploadCloud, ArrowLeft, Download, RefreshCw, ZoomIn, Zap } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

export default function ImageUpscaler() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResultImage(null);
      setIsComplete(false);
    };
    reader.readAsDataURL(file);
  };

  const processUpscale = async () => {
    if (!image) return;
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/upscale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upscale image');
      }

      setResultImage(data.output_url);
      setIsComplete(true);
    } catch (error: any) {
      console.error("Error upscaling image:", error);
      alert("Error: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'ai-hd-upscaled.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Cloud AI Image Upscaler" 
        description="Upscale and enhance images instantly using DeepAI Cloud Neural Networks. True Adobe-grade quality without server lag." 
        url="https://globalutilitytoolbox.com/image-upscaler" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div className="glass-panel animate-slide-up" style={{ padding: '60px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(50, 215, 75, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Zap size={40} color="#32d74b" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Cloud AI Image Upscaler</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Instant High-Definition Upscaling powered by Cloud GPUs. Experience Adobe-level detail recovery without freezing your computer.
        </p>

        {!image ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              maxWidth: '700px', 
              margin: '0 auto', 
              background: isDragging ? 'rgba(50, 215, 75, 0.05)' : 'rgba(255,255,255,0.02)', 
              padding: '80px 40px', 
              borderRadius: '32px', 
              border: `2px dashed ${isDragging ? '#32d74b' : 'var(--card-border)'}`, 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
            <UploadCloud size={64} color="var(--muted)" style={{ marginBottom: '24px' }} />
            <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Upload Low-Res Image</h3>
            <p style={{ color: 'var(--muted)' }}>Powered by lightning-fast Cloud AI.</p>
            <button className="premium-button" style={{ marginTop: '32px', background: '#32d74b', color: '#000' }}>Select Image</button>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {!isComplete && (
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                <button 
                  className="premium-button" 
                  onClick={processUpscale} 
                  disabled={isProcessing}
                  style={{ minWidth: '220px', padding: '16px 32px', fontSize: '18px', background: '#32d74b', color: '#000' }}
                >
                  {isProcessing ? 'Cloud GPUs Analyzing...' : 'Upscale Image (2x HD)'}
                </button>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: isComplete ? '1fr 1fr' : '1fr', gap: '24px', marginBottom: '40px' }}>
              <div className="glass-panel" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '980px', fontSize: '12px', zIndex: 10 }}>ORIGINAL LOW-RES</div>
                <img src={image} alt="original" style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
                
                {isProcessing && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="animate-spin" style={{ width: '48px', height: '48px', border: '4px solid #32d74b', borderTopColor: 'transparent', borderRadius: '50%', marginBottom: '20px' }}></div>
                    <div style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.05em' }}>AI GENERATING PIXELS...</div>
                    <div style={{ color: 'var(--muted)', marginTop: '8px' }}>Pinging DeepAI Cloud Servers...</div>
                  </div>
                )}
              </div>

              {isComplete && resultImage && (
                <div className="glass-panel animate-slide-up" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#32d74b', color: '#000', padding: '4px 12px', borderRadius: '980px', fontSize: '12px', fontWeight: 'bold', zIndex: 10 }}>STUDIO HD ENHANCED</div>
                  <img src={resultImage} alt="result" style={{ width: '100%', borderRadius: '12px', display: 'block', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
                </div>
              )}
            </div>

            {isComplete && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button className="premium-button" onClick={downloadImage} style={{ background: '#32d74b', color: '#000', padding: '16px 40px' }}>
                  <Download size={20} /> Download HD Image
                </button>
                <button className="premium-button" onClick={() => { setImage(null); setResultImage(null); setIsComplete(false); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                  <RefreshCw size={20} /> Upscale Another
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      
      <RelatedTools currentPath="/image-upscaler" />
    </div>
  );
}
