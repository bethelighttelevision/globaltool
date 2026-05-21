"use client";

import React, { useState, useRef } from 'react';
import { FileText } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
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
    <ToolLayout
      icon={<FileText size={40} />}
      title="PDF to SVG Converter"
      description="Secure, lightning-fast client-side conversion. Your files never leave your device. 100% private."
      seo={{
        toolName: "PDF to SVG Converter",
        description: "Convert PDF documents to high-quality SVG vectors instantly in your browser. 100% private and secure.",
        url: "https://globalutilitytoolbox.com/pdf-converter"
      }}
      currentPath="/pdf-converter"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Converting PDF to SVG: The Designer&apos;s Essential Guide</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Portable Document Format (PDF) is great for viewing, but Scalable Vector Graphics (SVG) are the gold standard for web design and publishing. Our <strong>Professional PDF to SVG Converter</strong> allows you to extract high-quality vector data from your PDF documents and turn them into lightweight, infinitely scalable web assets. PDF files are widely used for document sharing because they preserve formatting across different devices and operating systems, making them ideal for contracts, reports, brochures, and other fixed-layout documents. However, when you need to use individual graphical elements from a PDF in a website, mobile app, or design project, the PDF format becomes cumbersome to work with. You would typically need to open the file in Adobe Acrobat or Illustrator, manually select the elements you need, and export them one by one. This process is slow, requires expensive software, and often results in quality loss if you are exporting to raster formats like PNG or JPEG. SVG, on the other hand, is designed specifically for web and interface use. It is an XML-based vector image format that describes shapes, paths, and colors using plain text instructions that browsers can render natively. Because SVG files contain mathematical descriptions of graphics rather than fixed pixel grids, they can be scaled to any size without losing clarity or sharpness. This makes them ideal for responsive web design, where the same graphic needs to look perfect on devices ranging from smartwatches to large desktop monitors. SVG files are also significantly smaller than equivalent raster images in most cases, which helps improve page load times and reduce bandwidth usage. Our converter automates the extraction process, identifying vector elements within your PDF and converting them into clean, standards-compliant SVG code that you can use immediately in your projects. The entire process happens locally in your browser using JavaScript, which means your documents never leave your computer and your privacy is fully protected.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Use SVG Instead of Raster Formats?</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Unlike JPEG or PNG, SVG files are made of mathematical paths, not pixels. This means you can zoom in indefinitely without any loss of quality. For logos, icons, and diagrams, SVG ensures that your visuals look razor-sharp on everything from mobile phones to massive 4K monitors. Our tool preserves these paths perfectly during conversion. Raster images store information as a fixed grid of pixels, which means they have a native resolution and become blurry or pixelated when you scale them beyond their original dimensions. This fundamental limitation creates problems in modern web design, where content must adapt to screens of varying sizes and resolutions. An SVG logo that looks crisp on a standard laptop screen will look equally sharp on a Retina display, a 4K television, or a smartphone, because the browser simply redraws the vector paths at the appropriate resolution. This eliminates the need to create and serve multiple versions of the same image at different resolutions, simplifying your workflow and reducing the number of assets you need to manage. SVGs also offer superior compression for vector-based graphics. A complex logo that might be 100 kilobytes as a PNG could be only 5 kilobytes as an SVG, representing a 95 percent reduction in file size. This directly translates to faster page loads, lower bandwidth costs, and improved user experience, particularly on mobile networks. Additionally, because SVG is a text-based format, it can be indexed by search engines, styled with CSS, manipulated with JavaScript, and animated with SMIL or CSS animations. This opens up creative possibilities that are simply not possible with raster formats. For example, you can change the color of an SVG icon on hover using CSS, create interactive infographics that respond to user input, or animate complex illustrations for engaging storytelling. Our PDF to SVG converter makes all of these capabilities accessible by extracting vector content from your PDF documents and delivering clean, standards-compliant SVG files.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #ff3b30' }}>
            <h4 style={{ marginTop: 0, color: '#ff3b30' }}>Privacy First: Client-Side Conversion</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              Most online converters upload your sensitive PDFs to a remote server for processing, which creates a significant privacy and security risk, especially when dealing with confidential business documents, legal contracts, financial records, or personal information. Our tool performs the entire conversion locally within your browser using JavaScript. Your files never leave your computer, ensuring 100 percent privacy and security for your documents. This client-side architecture means there are no file size limits imposed by server storage constraints, no upload waiting times, and no risk of your data being intercepted during transmission or stored on third-party servers. The conversion happens instantly and privately, giving you complete control over your sensitive files at all times. For businesses that handle confidential information, this approach eliminates the need for legal review of third-party data processing agreements and ensures compliance with data protection regulations like GDPR and CCPA. You can convert sensitive PDFs with complete peace of mind, knowing that your proprietary information never leaves your local machine.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Best Practices for SVG Web Integration</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Code Optimization:</strong> After conversion, use an SVG optimizer to remove unnecessary metadata, redundant paths, and invisible elements that can bloat file size. Clean SVG code loads faster and is easier to work with in development. Popular optimization tools can reduce SVG file sizes by 50 percent or more without any visible quality loss.</li>
            <li style={{ marginBottom: '12px' }}><strong>Accessibility:</strong> Always add a `title` and `desc` tag inside your SVG code to help screen readers understand the graphic. This is essential for web accessibility compliance and ensures that visually impaired users can understand the content and purpose of your vector graphics. Search engines also use these tags to better index your visual content.</li>
            <li style={{ marginBottom: '12px' }}><strong>CSS Styling:</strong> Since SVGs are code-based, you can use CSS to change colors, adjust stroke widths, or animate paths on hover and focus events. This eliminates the need to create multiple versions of the same icon in different colors and enables interactive visual experiences that engage users and enhance usability.</li>
            <li style={{ marginBottom: '12px' }}><strong>Responsive Implementation:</strong> Set SVG dimensions using relative units like percentages or viewBox attributes instead of fixed pixel values to ensure your graphics scale properly across different screen sizes and devices. This guarantees that your vector content always fits perfectly within its container regardless of the viewing context.</li>
            <li style={{ marginBottom: '12px' }}><strong>Inline Embedding:</strong> For icons and small graphics that appear frequently across your site, consider inlining SVG code directly in your HTML rather than using external file references. This eliminates additional HTTP requests and allows you to style and animate the SVGs using your site&apos;s existing CSS framework.</li>
          </ul>
        </article>
      }
    >
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>ðŸ“</div>
          <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--foreground)' }}>Drop your PDF here</h3>
          <p style={{ color: 'var(--muted)', fontSize: '16px' }}>or click to browse from your device</p>
          <div style={{ marginTop: '24px', fontSize: '14px', color: 'var(--muted)' }}>Maximum file size: 50MB</div>
        </div>
      ) : (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '32px' }}>ðŸ“‘</div>
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
                âœ“ Conversion Complete
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
    </ToolLayout>
  );
}

