"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Image as ImageIcon, Eraser, UploadCloud, ArrowLeft, Download, RefreshCw, CheckCircle2, Wand2, Sparkles } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

declare global {
  interface Window {
    bodyPix: any;
    tf: any;
  }
}

export default function BackgroundRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const netRef = useRef<any>(null);

  const [sensitivity, setSensitivity] = useState(0.7);

  // Load the AI model on component mount
  const onScriptsLoad = async () => {
    if (window.bodyPix) {
      const net = await window.bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 1.0, // High accuracy version of MobileNet
        quantBytes: 2
      });
      netRef.current = net;
      setIsModelLoading(false);
    }
  };

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

  const removeBackground = async () => {
    if (!netRef.current || !image) return;
    setIsProcessing(true);
    
    const imgElement = new Image();
    imgElement.src = image;
    
    imgElement.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      
      // 1. Get AI Segmentation
      const segmentation = await netRef.current.segmentPerson(imgElement, {
        internalResolution: 'high',
        segmentationThreshold: sensitivity,
        maxDetections: 1,
        scoreThreshold: 0.3,
        nmsRadius: 20,
      });

      // 2. Create Mask Canvas (GPU Accelerated Smoothing)
      const maskCanvas = document.createElement('canvas');
      const maskCtx = maskCanvas.getContext('2d');
      if (!maskCtx) return;

      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;

      // Fill mask with segmentation data
      const maskImageData = maskCtx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < segmentation.data.length; i++) {
        const val = segmentation.data[i] === 1 ? 255 : 0;
        maskImageData.data[i * 4] = val;
        maskImageData.data[i * 4 + 1] = val;
        maskImageData.data[i * 4 + 2] = val;
        maskImageData.data[i * 4 + 3] = val;
      }
      maskCtx.putImageData(maskImageData, 0, 0);

      // 3. Composite Final Image
      // We draw the original image, then use the mask to clip it
      ctx.drawImage(imgElement, 0, 0);
      ctx.globalCompositeOperation = 'destination-in';
      
      // Apply professional blur to mask for soft edges (GPU accelerated)
      ctx.filter = 'blur(1px)'; 
      ctx.drawImage(maskCanvas, 0, 0);
      
      setResultImage(canvas.toDataURL('image/png'));
      setIsProcessing(false);
      setIsComplete(true);
    };
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.download = 'ai-hd-removed-bg.png';
    link.href = resultImage;
    link.click();
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <Script 
        src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/@tensorflow-models/body-pix@2.2.0/dist/body-pix.min.js" 
        strategy="lazyOnload"
        onLoad={onScriptsLoad}
      />

      <SEO 
        toolName="Professional AI Background Remover" 
        description="Adobe-grade AI background removal directly in your browser. Powered by neural networks for perfect edge detection and HD transparency." 
        url="https://globalutilitytoolbox.com/bg-remover" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div className="glass-panel animate-slide-up" style={{ padding: '60px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(41, 151, 255, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Sparkles size={40} color="var(--accent)" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Professional AI BG Remover</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          High-Speed Neural Engine. Studio-quality background removal with 100% privacy and no server lag.
        </p>

        {isModelLoading && (
          <div className="glass-panel" style={{ padding: '24px', maxWidth: '400px', margin: '0 auto 40px', background: 'rgba(255,255,255,0.03)' }}>
            <div className="animate-spin" style={{ width: '24px', height: '24px', border: '3px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px' }}></div>
            <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Optimizing Neural Engine...</p>
          </div>
        )}

        {!image ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
            onClick={() => !isModelLoading && fileInputRef.current?.click()}
            style={{ 
              maxWidth: '700px', 
              margin: '0 auto', 
              background: isDragging ? 'rgba(41, 151, 255, 0.05)' : 'rgba(255,255,255,0.02)', 
              padding: '80px 40px', 
              borderRadius: '32px', 
              border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--card-border)'}`, 
              cursor: isModelLoading ? 'not-allowed' : 'pointer',
              opacity: isModelLoading ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
            <UploadCloud size={64} color="var(--muted)" style={{ marginBottom: '24px' }} />
            <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Upload image for AI Processing</h3>
            <p style={{ color: 'var(--muted)' }}>Get studio results instantly without any upload waiting time.</p>
            <button className="premium-button" disabled={isModelLoading} style={{ marginTop: '32px' }}>Select Image</button>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Control Panel */}
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', textAlign: 'left' }}>
              <div style={{ flex: 1, maxWidth: '400px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label className="label-text" style={{ margin: 0 }}>AI Precision Threshold</label>
                  <span style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 'bold' }}>{Math.round(sensitivity * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.2" 
                  max="0.95" 
                  step="0.05"
                  value={sensitivity} 
                  onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                />
              </div>
              <button 
                className="premium-button" 
                onClick={removeBackground} 
                disabled={isProcessing}
                style={{ minWidth: '220px' }}
              >
                {isProcessing ? 'Optimizing...' : 'Process Image'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isComplete ? '1fr 1fr' : '1fr', gap: '24px', marginBottom: '40px' }}>
              {/* Original / Processing */}
              <div className="glass-panel" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '980px', fontSize: '12px', zIndex: 10 }}>ORIGINAL</div>
                <img src={image} alt="original" style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
                {isProcessing && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="animate-spin" style={{ width: '48px', height: '48px', border: '4px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', marginBottom: '20px' }}></div>
                    <div style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.05em' }}>AI ANALYZING PIXELS...</div>
                    <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>Using GPU acceleration for smooth edges</p>
                  </div>
                )}
              </div>

              {/* Result */}
              {isComplete && resultImage && (
                <div className="glass-panel animate-slide-up" style={{ padding: '16px', position: 'relative', overflow: 'hidden', backgroundImage: 'conic-gradient(#333 90deg, #444 90deg 180deg, #333 180deg 270deg, #444 270deg)', backgroundSize: '20px 20px' }}>
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--success)', color: '#000', padding: '4px 12px', borderRadius: '980px', fontSize: '12px', fontWeight: 'bold', zIndex: 10 }}>AI HD RESULT</div>
                  <img src={resultImage} alt="result" style={{ width: '100%', borderRadius: '12px', display: 'block', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
                </div>
              )}
            </div>

            {isComplete && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button className="premium-button" onClick={downloadImage} style={{ background: 'var(--success)', color: '#000', padding: '16px 40px' }}>
                  <Download size={20} /> Download AI HD Image
                </button>
                <button className="premium-button" onClick={() => { setImage(null); setResultImage(null); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                  <RefreshCw size={20} /> New Image
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      
      <RelatedTools currentPath="/bg-remover" />
    </div>
  );
}
