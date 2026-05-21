"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, Download, RefreshCw, Image } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ImageUpscaler() {
  usePageMeta("Free AI Image Upscaler | ToolSnappy", "Enhance and upscale low-resolution images using AI. Free online image quality booster.");
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
    } catch (error: unknown) {
      console.error("Error upscaling image:", error);
      alert("Error: " + (error instanceof Error ? error.message : String(error)));
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
    <ToolLayout
      icon={<Image size={40} />}
      title="Cloud AI Image Upscaler"
      description="Instant High-Definition Upscaling powered by Cloud GPUs. Experience Adobe-level detail recovery without freezing your computer."
      seo={{
        toolName: "Cloud AI Image Upscaler",
        description: "Upscale and enhance images instantly using DeepAI Cloud Neural Networks. True Adobe-grade quality without server lag.",
        url: "https://globalutilitytoolbox.com/image-upscaler"
      }}
      currentPath="/image-upscaler"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Science of AI Image Upscaling and Enhancement</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Traditional image resizing methods often result in blurry, pixelated results because they simply &quot;stretch&quot; existing pixels. Our <strong>Cloud-Powered AI Image Upscaler</strong> uses a process called Super-Resolution. By leveraging deep learning neural networks (ESRGAN), our tool predicts and generates new pixels to fill in the gaps, resulting in stunning HD clarity that was previously impossible. The technology behind AI upscaling has advanced dramatically in recent years, moving from simple interpolation algorithms that just guess at missing pixel values to sophisticated generative models that understand the structure of real-world objects, textures, and patterns. When you upload a low-resolution image to our tool, the AI first analyzes the existing pixels to understand the content of the image, identifying edges, textures, color gradients, and patterns. It then uses this understanding to generate new pixels that blend seamlessly with the original image, effectively creating detail that did not exist in the source file. This process is fundamentally different from traditional upscaling methods like bilinear or bicubic interpolation, which simply average neighboring pixels and produce soft, blurry results. Modern super-resolution techniques can recover fine details like individual strands of hair, fabric weaves, skin textures, and building materials that would be completely lost with conventional methods. The results are so convincing that it is often difficult to tell the difference between an AI-upscaled image and a natively high-resolution photograph. Our cloud-powered approach means that the heavy computational work is handled by powerful remote servers, so you can upscale images without draining your computer&apos;s resources or waiting for lengthy processing times. This makes professional-grade image enhancement accessible to anyone with an internet connection, regardless of their computer&apos;s specifications.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Low-Resolution Images are a Problem</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Whether it is an old family photo, a low-quality social media download, or a small product shot, low resolution can ruin the professional look of your brand. In 2026, high-definition visuals are the standard. Users are more likely to trust a website or a profile that features crisp, sharp images. Our tool acts as a professional restoration studio in your pocket. Low-resolution images suffer from a lack of pixel information, which manifests as blurriness, jagged edges, color banding, and visible compression artifacts. These imperfections signal unprofessionalism to viewers and can significantly damage your brand&apos;s credibility. In e-commerce, for example, customers expect to be able to zoom in on product images to examine details closely. If the image becomes blurry or pixelated when enlarged, it creates a poor user experience and reduces the likelihood of a purchase. Similarly, on social media platforms where visual quality is paramount, grainy or low-resolution images are less likely to engage users or be shared. Even in web design, using low-resolution images can make an otherwise well-designed site look amateurish and dated. The demand for high-resolution visuals has grown exponentially with the proliferation of high-density displays like Apple Retina screens, 4K monitors, and high-resolution mobile devices. These screens pack significantly more pixels into the same physical space, which means that images that looked fine on older displays now appear soft and lacking in detail. AI upscaling provides a practical solution to this problem, allowing you to improve the quality of your existing image assets without needing to reshoot or redesign anything. By using our free AI image upscaler, you can breathe new life into old photos, improve the quality of product images, and ensure that your visual content always meets the expectations of modern viewers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', margin: '40px 0' }}>
            <div className="glass-panel" style={{ padding: '24px', borderTop: '4px solid #32d74b' }}>
              <h4 style={{ marginTop: 0, color: '#32d74b' }}>4K Ready Output</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Turn 720p or 1080p images into print-ready 4K masterpieces. Perfect for large-format posters, high-end web design, digital art prints, and any application where maximum detail and clarity are required. The AI generates realistic pixel-level detail that makes enlarged images look naturally sharp rather than artificially stretched.</p>
            </div>
            <div className="glass-panel" style={{ padding: '24px', borderTop: '4px solid #32d74b' }}>
              <h4 style={{ marginTop: 0, color: '#32d74b' }}>Noise Reduction</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Automatically identifies and removes digital noise and JPEG artifacts that occur in low-light photography or heavily compressed images. The AI distinguishes between actual image detail and unwanted noise, preserving textures while smoothing out graininess for a cleaner, more professional final result.</p>
            </div>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Achieve the Best Upscaling Results</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            To get the most out of our AI tool, ensure your original image is not overly blurred or compressed. While our AI can hallucinate significant detail, starting with a clean, identifiable subject allows the neural network to produce more realistic textures in skin, hair, and fabric. Images that are extremely small, such as those under 100 by 100 pixels, present a greater challenge because the AI has less source information to work with. In these cases, the upscaled result may appear smoother or more painterly rather than photographically realistic. For best results, we recommend using source images that are at least 300 by 300 pixels with minimal compression artifacts. If your image has visible JPEG blocking or heavy noise, running it through a noise reduction filter before upscaling can improve the final output. It is also important to consider the intended use of your upscaled image. For web display, upscaling by 2x to 4x typically produces excellent results that look natural on high-resolution screens. For print applications, you may want to upscale more aggressively to ensure that the image maintains its quality when viewed up close. Our tool is designed to handle a wide range of input types including photographs, digital art, product shots, scanned documents, and screenshots. Each type of content benefits from slightly different processing approaches, and our AI is trained to adapt its enhancement strategy based on the content it detects in the image. Experiment with different source images to see how the AI handles various subjects and find the approach that works best for your specific needs.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Perfect for Social Media & Marketing</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Instagram & TikTok:</strong> Ensure your profile pictures, thumbnails, and video covers are razor-sharp to attract more views and followers. High-quality visuals are essential for building a professional brand presence on visual-first social platforms where first impressions matter immensely.</li>
            <li style={{ marginBottom: '12px' }}><strong>Web Development:</strong> Optimize site speed by using smaller source images and upscaling them only when needed for display at larger sizes. This technique reduces page load times while still delivering high-quality visuals to visitors, improving both user experience and SEO performance.</li>
            <li style={{ marginBottom: '12px' }}><strong>Printing:</strong> Prepare low-res digital assets for high-quality printing on business cards, brochures, posters, banners, and product packaging. AI upscaling can transform images that would otherwise be unusable for print into crisp, detailed assets that look professional on paper.</li>
            <li style={{ marginBottom: '12px' }}><strong>Digital Art Restoration:</strong> Breathe new life into old scanned photographs, vintage artwork, and historical images by upscaling them to modern resolution standards while preserving their original character and charm.</li>
            <li style={{ marginBottom: '12px' }}><strong>E-commerce Product Images:</strong> Improve the quality of product photos that were taken with older cameras or in less-than-ideal conditions, making them competitive with professionally shot images on major marketplaces.</li>
          </ul>
        </article>
      }
    >
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
{/* eslint-disable-next-line @next/next/no-img-element */}
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
{/* eslint-disable-next-line @next/next/no-img-element */}
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
    </ToolLayout>
  );
}
