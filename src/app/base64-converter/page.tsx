"use client";

import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Copy, CheckCircle2, UploadCloud, Code, FileCode } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
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
    <ToolLayout
      icon={<FileCode size={40} />}
      title="Image to Base64 Converter"
      description="Convert images into Base64 strings instantly. Perfect for embedding images in HTML, CSS, or JSON files."
      seo={{
        toolName: "Image to Base64 Converter",
        description: "Convert images into Base64 strings instantly. Perfect for embedding images in HTML, CSS, or JSON files.",
        url: "https://globalutilitytoolbox.com/base64-converter"
      }}
      currentPath="/base64-converter"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Deep Dive into Base64 Encoding and Data Integrity</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Base64 encoding is an essential technique used by developers to represent binary data in an ASCII string format. Our <strong>Professional Base64 Converter</strong> ensures fast, accurate, and secure encoding without your data ever leaving your browser. This encoding scheme is fundamental to modern web development and is used extensively across virtually every web application and API integration. Base64 works by taking binary data, such as an image file, and converting it into a string of plain text characters that can be safely transmitted over protocols that were originally designed to handle only text. This is incredibly useful in contexts where binary data might be corrupted or misinterpreted, such as in JSON payloads, HTML attributes, CSS declarations, or URL parameters. The name Base64 comes from the fact that it uses a set of 64 different characters, consisting of uppercase letters A through Z, lowercase letters a through z, digits 0 through 9, and the plus and forward slash symbols, with the equals sign used for padding. When you convert an image to Base64 using our tool, the resulting string represents the exact same data as the original file, just in a different format. This conversion is completely lossless, meaning that when the Base64 string is decoded back into binary, you get back an identical copy of the original file with no degradation in quality whatsoever. This makes Base64 particularly valuable for developers who need to embed images directly into their code without requiring separate file assets. Understanding how Base64 encoding works and when to use it is an important skill for any web developer, and our free tool makes the conversion process instantaneous and effortless.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How Base64 Improves Web Performance</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            By converting small icons or background patterns into Base64 strings, you can reduce the number of HTTP requests a browser has to make. This inline approach can slightly improve site speed and Core Web Vitals for mobile users. Every time a web page loads, the browser must send separate HTTP requests for each external resource, including images, stylesheets, and scripts. These requests add latency, particularly on mobile networks with higher latency and slower connection speeds. By embedding small images directly in your HTML or CSS as Base64 data URIs, you eliminate these additional requests entirely. The browser can start rendering the page with all visual elements immediately available, leading to faster perceived load times and a smoother user experience. However, it is important to note that Base64 encoding also has trade-offs. The encoded string is approximately 33 percent larger than the original binary file, so embedding large images as Base64 can actually increase the total page size and slow down the initial HTML or CSS download. The general best practice is to use Base64 only for small assets, typically those under 10 kilobytes in size, such as icons, logos, and simple decorative elements. For larger images, traditional file references with proper caching headers remain the better approach. Our tool helps you make these decisions by clearly showing the size of the encoded output so you can evaluate whether Base64 embedding is appropriate for your specific use case. Modern frontend development often involves build tools like webpack and Vite that can automatically inline small assets as Base64, but having a standalone converter is still valuable for quick prototyping, debugging, and one-off conversions. By using our free Base64 converter, you can experiment with different images and understand the performance implications before committing to a particular approach in your production codebase.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #32d74b' }}>
            <h4 style={{ marginTop: 0, color: '#32d74b' }}>Developer Tip: Data URIs</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              A Data URI allows you to embed a Base64 string directly into an image tag. This is a common practice in modern frontend development when building highly portable UI components, single-file HTML prototypes, email templates, or self-contained web applications. Data URIs follow a specific format that includes the MIME type of the embedded data, which tells the browser how to interpret the encoded content. For images, the format looks like this: data:image/png;base64, followed by the encoded string. The browser parses this URI and renders the image just as it would a regular file reference, but without needing to make an additional network request. This technique is particularly useful for creating self-contained demos, documentation examples, or HTML emails that need to display images reliably across different email clients. It is also commonly used in CSS for embedding small background patterns, icons, or gradient images that should load immediately with the stylesheet. One important consideration when working with data URIs is that they increase the size of your HTML or CSS file, which can impact caching efficiency. Unlike external image files that can be cached separately and reused across multiple pages, Base64-embedded images are downloaded every time the containing document is loaded. For this reason, data URIs are best reserved for small, page-specific assets that would not benefit from separate caching.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Is Base64 Encoding the Same as Encryption?</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            A common misconception is that Base64 is a form of encryption. It is not. Base64 is purely a representation format and can be decoded by anyone with access to the string without requiring any key or password. The purpose of Base64 encoding is data integrity during transmission, not data security or confidentiality. Unlike encryption algorithms such as AES or RSA, which transform data using cryptographic keys that make the original content unrecoverable without the correct decryption key, Base64 simply converts binary data into a text format using a publicly known character mapping. Anyone can decode a Base64 string using a standard decoder, and there are countless online tools, including our own, that perform this conversion instantly. This means you should never use Base64 as a security measure to protect sensitive data. If you need to secure image data or any other binary content, you must use proper encryption algorithms in combination with secure key management practices. However, Base64 does play an important supporting role in many security implementations. It is commonly used to encode encrypted data into a text-friendly format for transmission over protocols that require text-only payloads, such as in JSON Web Tokens (JWTs), SSL certificate data, and encrypted email attachments. In these cases, the encryption happens first, and then the resulting binary ciphertext is Base64-encoded for safe text-based transmission. Understanding this distinction is important for developers who are building secure applications, as relying on Base64 alone for data protection would leave sensitive information completely exposed. Our tool performs only encoding and decoding operations locally in your browser, ensuring that your image data never leaves your computer and cannot be intercepted during transmission.
          </p>
        </article>
      }
    >
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
    </ToolLayout>
  );
}

