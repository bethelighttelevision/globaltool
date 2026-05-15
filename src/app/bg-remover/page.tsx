"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, UploadCloud, ArrowLeft, Download, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

export default function BackgroundRemover() {
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

  const removeBackground = async () => {
    if (!image) return;
    setIsProcessing(true);
    
    try {
      // Create a blob from the base64 image
      const res = await fetch(image);
      const blob = await res.blob();
      
      // Use dynamic import to fix Turbopack and SSR WASM issues
      const imgly = await import("@imgly/background-removal");
      // @ts-ignore - Handle variable export names in different environments
      const removeBg = (imgly.default || imgly.removeBackground) as any;
      
      const imageBlob = await removeBg(blob);
      
      // Convert result blob back to URL
      const url = URL.createObjectURL(imageBlob);
      setResultImage(url);
      setIsComplete(true);
    } catch (error) {
      console.error("Error removing background:", error);
      alert("Failed to remove background. Please try a different image.");
    } finally {
      setIsProcessing(false);
    }
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
          High-Speed Neural Engine. Studio-quality background removal perfectly matched to Adobe and remove.bg. 100% privacy and no server lag.
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
              background: isDragging ? 'rgba(41, 151, 255, 0.05)' : 'rgba(255,255,255,0.02)', 
              padding: '80px 40px', 
              borderRadius: '32px', 
              border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--card-border)'}`, 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
            <UploadCloud size={64} color="var(--muted)" style={{ marginBottom: '24px' }} />
            <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Upload image for AI Processing</h3>
            <p style={{ color: 'var(--muted)' }}>Get studio results instantly without any upload waiting time.</p>
            <button className="premium-button" style={{ marginTop: '32px' }}>Select Image</button>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Control Panel */}
            {!isComplete && (
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                <button 
                  className="premium-button" 
                  onClick={removeBackground} 
                  disabled={isProcessing}
                  style={{ minWidth: '220px', padding: '16px 32px', fontSize: '18px' }}
                >
                  {isProcessing ? 'Removing Background...' : 'Remove Background'}
                </button>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: isComplete ? '1fr 1fr' : '1fr', gap: '24px', marginBottom: '40px' }}>
              {/* Original / Processing */}
              <div className="glass-panel" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '980px', fontSize: '12px', zIndex: 10 }}>ORIGINAL</div>
                <img src={image} alt="original" style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
                {isProcessing && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="animate-spin" style={{ width: '48px', height: '48px', border: '4px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', marginBottom: '20px' }}></div>
                    <div style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.05em' }}>AI ANALYZING PIXELS...</div>
                    <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>Downloading AI Models & Processing (takes a few seconds)...</p>
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
                <button className="premium-button" onClick={() => { setImage(null); setResultImage(null); setIsComplete(false); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                  <RefreshCw size={20} /> New Image
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SEO CONTENT SECTION */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Why Background Removal is Essential for E-commerce</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            In the digital marketplace, your product image is your storefront. Statistics show that 75% of online shoppers rely on product photos when deciding on a purchase. Our <strong>AI-Powered Background Remover</strong> allows you to create professional, distraction-free images that meet the strict requirements of platforms like Amazon, eBay, and Shopify.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Power of a Transparent Background</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Removing busy backgrounds and replacing them with clean white or transparent canvases helps your product stand out. It reduces visual noise and ensures that the customer's focus remains entirely on the item you are selling. This small technical step is proven to increase conversion rates and decrease cart abandonment.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #32d74b' }}>
            <h4 style={{ marginTop: 0, color: '#32d74b' }}>E-commerce Standards 2026</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              Most major marketplaces now require a pure white background for the primary product listing. Our tool uses advanced neural networks to detect edges perfectly, even for complex items like clothing or jewelry.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How Our AI Edge Detection Works</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Unlike traditional manual masking in Photoshop, which can take hours, our browser-native AI analyzes millions of pixels in milliseconds to identify the &quot;subject&quot; versus the &quot;surroundings.&quot; This results in smooth, natural-looking edges without the dreaded &quot;jagged&quot; look common in lower-quality tools.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Top Use Cases for Transparent PNGs</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Product Cataloging:</strong> Consistent backgrounds across your entire store.</li>
            <li style={{ marginBottom: '12px' }}><strong>Marketing Collateral:</strong> Easily place your products on custom banners or promotional ads.</li>
            <li style={{ marginBottom: '12px' }}><strong>Social Media:</strong> Create "lifestyle" shots by overlaying your transparent product on various real-world scenes.</li>
          </ul>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      
      <RelatedTools currentPath="/bg-remover" />
    </div>
  );
}
