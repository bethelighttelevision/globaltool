"use client";

import React, { useState, useRef, useCallback } from 'react';
import { FileText, Download, Trash2, Check, Loader2 } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
let pdfjsLib: any = null;

async function getPdfJs() {
  if (!pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist');
    const version = (await import('pdfjs-dist/package.json')).version;
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;
  }
  return pdfjsLib;
}

interface PageImage {
  id: number;
  dataUrl: string;
  width: number;
  height: number;
}

export default function PDFConverterPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState<PageImage[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderPageToCanvas = async (pdf: any, pageNum: number) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;
    await page.render({ canvasContext: ctx, viewport }).promise;
    const dataUrl = canvas.toDataURL('image/png');
    return { id: pageNum, dataUrl, width: viewport.width, height: viewport.height };
  };

  const processFile = useCallback(async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }
    setError('');
    setFile(selectedFile);
    setIsProcessing(true);
    setProgress(0);
    setPages([]);
    setSelectedPages(new Set());

    try {
      const pdf = await (await getPdfJs()).getDocument({ data: await selectedFile.arrayBuffer() }).promise;
      const total = pdf.numPages;
      setTotalPages(total);

      const renderedPages: PageImage[] = [];
      for (let i = 1; i <= total; i++) {
        const img = await renderPageToCanvas(pdf, i);
        renderedPages.push(img);
        setProgress(Math.round((i / total) * 100));
      }

      setPages(renderedPages);
      setSelectedPages(new Set(renderedPages.map(p => p.id)));
      setIsProcessing(false);
    } catch (err) {
      setError('Failed to process PDF. The file may be corrupted or password-protected.');
      setIsProcessing(false);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) processFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) processFile(e.target.files[0]);
  };

  const togglePage = (id: number) => {
    setSelectedPages(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canvasToSvgBlob = (img: PageImage): Blob => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}">
  <image width="${img.width}" height="${img.height}" xlink:href="${img.dataUrl}"/>
</svg>`;
    return new Blob([svgContent], { type: 'image/svg+xml' });
  };

  const downloadSvg = (img: PageImage) => {
    const blob = canvasToSvgBlob(img);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace('.pdf', '') || 'export'}-page-${img.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllSelected = () => {
    const toDownload = pages.filter(p => selectedPages.has(p.id));
    toDownload.forEach((img, index) => {
      setTimeout(() => downloadSvg(img), index * 300);
    });
  };

  const reset = () => {
    setFile(null);
    setPages([]);
    setSelectedPages(new Set());
    setProgress(0);
    setError('');
  };

  return (
    <ToolLayout
      icon={<FileText size={40} />}
      title="PDF to SVG Converter"
      description="Free, client-side PDF to SVG conversion. Your files never leave your device. 100% private."
      seo={{
        toolName: "PDF to SVG Converter",
        description: "Convert PDF documents to SVG vectors instantly in your browser using PDF.js. 100% private and secure.",
        url: "https://toolsnappy.com/pdf-converter"
      }}
      currentPath="/pdf-converter"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Converting PDF to SVG: The Designer&apos;s Essential Guide</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Portable Document Format (PDF) is great for viewing, but Scalable Vector Graphics (SVG) are the gold standard for web design and publishing. Our <strong>Professional PDF to SVG Converter</strong> allows you to extract high-quality vector data from your PDF documents and turn them into lightweight, scalable web assets. PDF files are widely used for document sharing because they preserve formatting across devices, making them ideal for contracts, reports, brochures, and other fixed-layout documents. However, when you need to use individual graphical elements from a PDF in a website, mobile app, or design project, the PDF format becomes cumbersome. You would typically need Adobe Acrobat or Illustrator to extract elements — expensive software that most people don't have. SVG, on the other hand, is designed specifically for web and interface use. It is an XML-based vector image format that describes shapes, paths, and colors using plain text instructions that browsers render natively. Because SVG files contain mathematical descriptions of graphics rather than fixed pixel grids, they scale to any size without losing clarity — making them perfect for responsive web design.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Use SVG Instead of Raster Formats?</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Unlike JPEG or PNG, SVG files are made of mathematical paths, not pixels. This means you can zoom infinitely without quality loss. For logos, icons, and diagrams, SVG ensures your visuals look razor-sharp on everything from mobile phones to 4K monitors. Raster images store data as a fixed pixel grid, which means they become blurry when scaled beyond their native resolution. An SVG logo that looks crisp on a laptop will look equally sharp on a Retina display or smartphone because the browser redraws the vector paths at the appropriate resolution. SVGs also offer superior compression — a complex logo that might be 100KB as PNG could be only 5KB as SVG, reducing bandwidth and improving page load times.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #ff3b30' }}>
            <h4 style={{ marginTop: 0, color: '#ff3b30' }}>Privacy First: Client-Side Conversion</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              Most online converters upload your PDFs to a remote server — a security risk for confidential documents. Our tool uses PDF.js to perform the entire conversion locally in your browser. Your files never leave your computer, ensuring 100% privacy. No file size limits, no upload waiting, and no risk of data interception.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Use Cases for PDF to SVG Conversion</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Web developers frequently need to extract vector graphics from PDF design mockups, wireframes, and brand guidelines prepared by design teams who work primarily in tools like Figma or Adobe Illustrator but deliver assets in PDF format. Marketing teams use our converter to pull infographics, charts, and data visualizations from PDF reports and turn them into web-ready SVG components that maintain crisp resolution across all screen sizes. Print designers converting multi-page PDF catalogues into individual SVG files can integrate each graphic directly into website product pages without losing the precise layout and typography specifications created during the print production process. For e-commerce businesses, converting PDF-based product technical drawings into SVG format enables interactive zoom features that let customers inspect details at any magnification level.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Understanding SVG Optimization for Web Performance</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            SVGs generated from PDF files sometimes contain redundant metadata, invisible layers, and unnecessary grouping structures that inflate file size. Running your converted SVGs through an optimization process can reduce file size by fifty to eighty percent without any visible quality loss. Tools like SVGO analyze and remove unnecessary code while preserving the visual integrity of your graphics. Optimized SVGs load faster, use less bandwidth, and improve your Core Web Vitals scores, which directly impacts SEO rankings. When embedding converted SVGs in web pages, always verify that the viewBox attribute matches your intended display dimensions and consider setting width and height attributes to prevent layout shifts during page rendering.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Best Practices for PDF to SVG Workflow</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Optimize:</strong> After conversion, use an SVG optimizer to remove metadata and redundant paths.</li>
            <li style={{ marginBottom: '12px' }}><strong>Accessibility:</strong> Add `title` and `desc` tags inside SVG for screen readers.</li>
            <li style={{ marginBottom: '12px' }}><strong>CSS Styling:</strong> SVGs can be styled with CSS — change colors, adjust strokes, animate on hover.</li>
            <li style={{ marginBottom: '12px' }}><strong>Responsive:</strong> Use viewBox attributes instead of fixed pixel values for proper scaling.</li>
            <li style={{ marginBottom: '12px' }}><strong>Inline:</strong> Embed small SVGs directly in HTML to eliminate HTTP requests.</li>
          </ul>
        </article>
      }
    >
      {error && (
        <div style={{ maxWidth: '600px', margin: '0 auto 20px', padding: '16px', background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.3)', borderRadius: '12px', color: '#ff4444', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            maxWidth: '600px', margin: '0 auto',
            background: isDragging ? 'rgba(41, 151, 255, 0.1)' : 'rgba(255,255,255,0.03)',
            padding: '60px 24px', borderRadius: '24px',
            border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--card-border)'}`,
            cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center'
          }}
        >
          <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>PDF</div>
          <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--foreground)' }}>Drop your PDF here</h3>
          <p style={{ color: 'var(--muted)', fontSize: '16px' }}>or click to browse</p>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '16px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={24} color="var(--accent)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>{file.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{(file.size / 1024 / 1024).toFixed(2)} MB • {totalPages || '?'} pages</div>
              </div>
            </div>
            <button onClick={reset} style={{ background: 'rgba(255,68,68,0.1)', border: 'none', color: '#ff4444', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <Trash2 size={16} /> Remove
            </button>
          </div>

          {isProcessing && (
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Loader2 size={20} className="animate-spin" color="var(--accent)" />
                <span style={{ color: 'var(--muted)', fontSize: '15px' }}>Rendering pages with PDF.js...</span>
                <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--accent)' }}>{progress}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--card-border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          )}

          {!isProcessing && pages.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                  {pages.length} pages — <strong>{selectedPages.size}</strong> selected
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setSelectedPages(new Set(pages.map(p => p.id)))} style={{ background: 'none', border: '1px solid var(--card-border)', color: 'var(--muted)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Select All</button>
                  <button onClick={() => setSelectedPages(new Set())} style={{ background: 'none', border: '1px solid var(--card-border)', color: 'var(--muted)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Deselect All</button>
                </div>
              </div>

              {selectedPages.size > 0 && (
                <button onClick={downloadAllSelected} className="premium-button" style={{ width: '100%', padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Download size={20} /> Download {selectedPages.size} Page{selectedPages.size > 1 ? 's' : ''} as SVG
                </button>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                {pages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => togglePage(img.id)}
                    style={{
                      padding: '10px', borderRadius: '14px', background: selectedPages.has(img.id) ? 'rgba(41, 151, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                      border: `2px solid ${selectedPages.has(img.id) ? 'var(--accent)' : 'var(--card-border)'}`,
                      cursor: 'pointer', transition: 'all 0.2s', position: 'relative'
                    }}
                  >
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.dataUrl} alt={`Page ${img.id}`} style={{ width: '100%', borderRadius: '8px' }} />
                      {selectedPages.has(img.id) && (
                        <div style={{ position: 'absolute', top: '6px', right: '6px', width: '22px', height: '22px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={14} color="#fff" />
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Page {img.id}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); downloadSvg(img); }}
                        style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '4px' }}
                        title="Download this page"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
