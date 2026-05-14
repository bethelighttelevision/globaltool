"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { UploadCloud, ArrowLeft, Download, RefreshCw, ZoomIn } from 'lucide-react';
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
  const [workerReady, setWorkerReady] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize the Web Worker
    workerRef.current = new Worker(new URL('./worker.ts', import.meta.url));
    
    workerRef.current.onmessage = (e) => {
      const { type, result, message, percent } = e.data;
      
      if (type === 'init-success') {
        setWorkerReady(true);
      } else if (type === 'progress') {
        setProgress(Math.round(percent * 100));
      } else if (type === 'success') {
        const { data, shape } = e.data;
        
        // Build image from raw tensor data
        const [height, width] = shape;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          const imgData = ctx.createImageData(width, height);
          for (let i = 0; i < width * height; i++) {
            imgData.data[i * 4] = data[i * 3];       // R
            imgData.data[i * 4 + 1] = data[i * 3 + 1]; // G
            imgData.data[i * 4 + 2] = data[i * 3 + 2]; // B
            imgData.data[i * 4 + 3] = 255;           // Alpha
          }
          ctx.putImageData(imgData, 0, 0);
          setResultImage(canvas.toDataURL('image/png'));
        }

        setIsComplete(true);
        setIsProcessing(false);
        setProgress(null);
      } else if (type === 'error') {
        console.error("Worker error:", message);
        alert("Failed to upscale image: " + message);
        setIsProcessing(false);
        setProgress(null);
      }
    };

    // Ask worker to initialize the AI model
    workerRef.current.postMessage({ type: 'init' });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResultImage(null);
      setIsComplete(false);
      setProgress(null);
    };
    reader.readAsDataURL(file);
  };

  const processUpscale = async () => {
    if (!image || !workerRef.current) return;
    setIsProcessing(true);
    setProgress(0);
    
    // Resize image safely before sending to worker
    const img = new Image();
    img.src = image;
    await new Promise((resolve) => { img.onload = resolve; });

    const MAX_DIMENSION = 600;
    let width = img.width;
    let height = img.height;
    
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
      width = width * ratio;
      height = height * ratio;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.drawImage(img, 0, 0, width, height);

    const safeImageBase64 = canvas.toDataURL('image/png');

    // Send the image to the Web Worker for background processing
    workerRef.current.postMessage({ 
      type: 'upscale', 
      image: safeImageBase64,
      patchSize: 64,
      padding: 2
    });
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.download = 'ai-hd-upscaled.png';
    link.href = resultImage;
    link.click();
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="AI Image Upscaler & Enhancer" 
        description="Upscale and enhance images in your browser using ESRGAN Neural Networks. Adobe-grade quality without servers." 
        url="https://globalutilitytoolbox.com/image-upscaler" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div className="glass-panel animate-slide-up" style={{ padding: '60px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(50, 215, 75, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <ZoomIn size={40} color="#32d74b" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>AI Image Upscaler</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Real Neural Network running flawlessly in the background. Upscale your images to HD without freezing your computer.
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
            <p style={{ color: 'var(--muted)' }}>Powered by Web Workers for 100% crash-free AI processing.</p>
            <button className="premium-button" style={{ marginTop: '32px' }}>Select Image</button>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {!isComplete && (
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                <button 
                  className="premium-button" 
                  onClick={processUpscale} 
                  disabled={isProcessing || !workerReady}
                  style={{ minWidth: '220px', padding: '16px 32px', fontSize: '18px' }}
                >
                  {isProcessing ? `AI Processing... ${progress !== null ? progress + '%' : ''}` : (!workerReady ? 'Loading Neural Engine...' : 'Upscale Image (2x)')}
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
                    {progress !== null && (
                      <div style={{ width: '60%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '980px', marginTop: '16px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${progress}%`, background: '#32d74b', transition: 'width 0.2s ease' }}></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {isComplete && resultImage && (
                <div className="glass-panel animate-slide-up" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#32d74b', color: '#000', padding: '4px 12px', borderRadius: '980px', fontSize: '12px', fontWeight: 'bold', zIndex: 10 }}>AI HD ENHANCED (2x)</div>
                  <img src={resultImage} alt="result" style={{ width: '100%', borderRadius: '12px', display: 'block', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
                </div>
              )}
            </div>

            {isComplete && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button className="premium-button" onClick={downloadImage} style={{ background: '#32d74b', color: '#000', padding: '16px 40px' }}>
                  <Download size={20} /> Download HD Image
                </button>
                <button className="premium-button" onClick={() => { setImage(null); setResultImage(null); setIsComplete(false); setProgress(null); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
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
