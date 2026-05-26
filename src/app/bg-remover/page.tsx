"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, Download, RefreshCw, Camera } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
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
      const res = await fetch(image);
      const blob = await res.blob();
      const imgly = await import("@imgly/background-removal");
      const removeBg = (imgly.default || imgly.removeBackground) as unknown as (blob: Blob) => Promise<Blob>;
      const imageBlob = await removeBg(blob);
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
    <ToolLayout
      icon={<Camera size={40} />}
      title="Professional AI BG Remover"
      description="Remove image backgrounds instantly with AI. Upload any photo and get a clean transparent PNG in seconds."
      seo={{
        toolName: "Professional AI Background Remover",
        description: "AI-powered background removal directly in your browser. Clean edge detection and HD transparency.",
        url: "https://toolsnappy.com/bg-remover"
      }}
      currentPath="/bg-remover"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Why Background Removal is Essential for E-commerce</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            In the digital marketplace, your product image is your storefront. Statistics show that 75% of online shoppers rely on product photos when deciding on a purchase. Our <strong>AI-Powered Background Remover</strong> allows you to create professional, distraction-free images that meet the strict requirements of platforms like Amazon, eBay, and Shopify. A clean, well-edited product image can be the difference between a sale and a lost customer in today&apos;s visually driven e-commerce environment. When shoppers browse online, they cannot physically touch or inspect items, so they rely entirely on visual information to make purchasing decisions. This is why marketplace giants like Amazon have specific image requirements that demand pure white backgrounds for primary product photos. Sellers who fail to meet these standards often find their listings suppressed or hidden from search results altogether. Beyond meeting marketplace requirements, removing backgrounds from your product photography opens up a world of creative possibilities. You can place your products against any backdrop, create consistent branding across your entire catalog, and produce marketing materials that look cohesive and professional. Our AI-powered tool handles this process automatically, eliminating the need for expensive photography equipment, studio lighting, or hours of manual Photoshop work. The technology runs entirely in your browser using advanced neural networks, which means your images never leave your computer and your privacy is fully protected. Whether you are a small business owner just starting your online store or a large enterprise managing thousands of SKUs, having access to a fast, reliable, and free background removal tool can significantly streamline your workflow and improve the overall quality of your visual content.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Power of a Transparent Background</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Removing busy backgrounds and replacing them with clean white or transparent canvases helps your product stand out. It reduces visual noise and ensures that the customer&rsquo;s focus remains entirely on the item you are selling. This small technical step is proven to increase conversion rates and decrease cart abandonment. When a product is presented against a clean background, it appears more professional, trustworthy, and appealing to potential buyers. Studies in consumer psychology suggest that visual clarity directly correlates with perceived product value, meaning that a well-presented item can command a higher price point than the same item shown in a cluttered or unprofessional setting. Transparent backgrounds offer even greater flexibility because they allow your products to blend seamlessly into any design context. You can place them on colored backgrounds that match your brand identity, layer them onto lifestyle imagery that shows the product in use, or combine multiple products into a single composite image for promotional materials. This versatility is particularly valuable for businesses that sell across multiple channels, each with its own design requirements and aesthetic preferences. From Amazon and eBay to Etsy and your own Shopify store, having transparent PNG versions of your product images ensures that you are always ready to adapt to any platform&apos;s specifications without needing to reshoot or re-edit your photos. Our AI background remover makes this process instantaneous, allowing you to generate high-quality transparent images in seconds rather than spending hours on manual editing.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #32d74b' }}>
            <h4 style={{ marginTop: 0, color: '#32d74b' }}>E-commerce Standards 2026</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              Most major marketplaces now require a pure white background for the primary product listing. Our tool uses advanced neural networks to detect edges perfectly, even for complex items like clothing, jewelry, or products with fine details like hair or fur. In 2026, e-commerce visual standards have become more stringent than ever before, with platforms using automated systems to scan and reject listings that do not meet their technical requirements. Sellers who invest in high-quality, properly formatted product images consistently outperform those who do not, enjoying higher click-through rates, better conversion rates, and fewer returns. By using our free background removal tool, you ensure that your product images always meet the latest marketplace standards without needing to hire a professional photographer or graphic designer.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How Our AI Edge Detection Works</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Unlike traditional manual masking in Photoshop, which can take hours, our browser-native AI analyzes millions of pixels in milliseconds to identify the &quot;subject&quot; versus the &quot;surroundings.&quot; This results in smooth, natural-looking edges without the dreaded &quot;jagged&quot; look common in lower-quality tools. The underlying technology is based on deep learning models that have been trained on millions of diverse images, allowing them to recognize and separate foreground subjects from background elements with remarkable accuracy. These neural networks have been specifically optimized for edge detection, meaning they excel at handling challenging scenarios like curly hair, translucent objects, and intricate patterns that would frustrate traditional chroma key or manual selection methods. The AI works by analyzing each pixel in the context of its surrounding pixels, gradually building up a sophisticated understanding of where the subject ends and the background begins. This process happens in real-time within your browser using WebAssembly and WebGL technologies, ensuring fast performance without requiring a server upload. The result is a clean, professional-looking image with smooth edges and no leftover background artifacts. Our tool also handles semi-transparent areas intelligently, preserving partial transparency in elements like glass, shadows, and smoke effects for the most natural possible result. This level of precision rivals professional editing software while being significantly faster, easier to use, and completely free.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Top Use Cases for Transparent PNGs</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Product Cataloging:</strong> Consistent backgrounds across your entire store improve brand recognition and create a more professional shopping experience for your customers. Shoppers are more likely to trust and purchase from stores that maintain consistent visual standards throughout their catalog.</li>
            <li style={{ marginBottom: '12px' }}><strong>Marketing Collateral:</strong> Easily place your products on custom banners, email newsletters, social media ads, or print materials without needing to re-edit each image. Transparent product images give your marketing team maximum flexibility to create compelling visual content quickly.</li>
            <li style={{ marginBottom: '12px' }}><strong>Social Media:</strong> Create &ldquo;lifestyle&rdquo; shots by overlaying your transparent product on various real-world scenes, seasonal backgrounds, or branded templates. This allows you to maintain an active and visually engaging social media presence without the expense of professional photoshoots.</li>
            <li style={{ marginBottom: '12px' }}><strong>Web Development:</strong> Use transparent product images in web design to create interactive elements like hover effects, comparison sliders, and dynamic product showcases that respond to user interaction.</li>
            <li style={{ marginBottom: '12px' }}><strong>Print Design:</strong> Prepare your product images for catalogs, brochures, business cards, and other print materials with transparent backgrounds that can be placed seamlessly into any layout design.</li>
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
{/* eslint-disable-next-line @next/next/no-img-element */}
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
{/* eslint-disable-next-line @next/next/no-img-element */}
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
    </ToolLayout>
  );
}

