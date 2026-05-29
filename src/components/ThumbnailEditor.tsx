'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  imageUrl: string;
  onClose: () => void;
}

const FONTS = ['Arial', 'Impact', 'Helvetica', 'Georgia', 'Courier New', 'Verdana'];
const COLORS = ['#ffffff', '#ff0000', '#ffeb3b', '#00e676', '#2979ff', '#ff4081', '#000000'];

export default function ThumbnailEditor({ imageUrl, onClose }: Props) {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('rgba(0,0,0,0.5)');
  const [fontSize, setFontSize] = useState(48);
  const [font, setFont] = useState('Impact');
  const [textX, setTextX] = useState(0.5);
  const [textY, setTextY] = useState(0.78);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const dragging = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.src = imageUrl;
    imgRef.current = img;
  }, [imageUrl]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 800, H = 450;
    canvas.width = W;
    canvas.height = H;

    ctx.drawImage(img, 0, 0, W, H);

    const lines = text.split('\n').filter(Boolean);
    if (lines.length === 0) return;

    const maxW = W * 0.85;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lineH = fontSize * 1.2;
    const totalH = lines.length * lineH;
    const startY = H * textY - totalH / 2;

    lines.forEach((line, i) => {
      const y = startY + i * lineH + lineH / 2;
      ctx.save();

      ctx.shadowColor = bgColor;
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.font = `800 ${fontSize}px ${font}`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let drawText = line;
      let fs = fontSize;
      const measure = () => ctx.measureText(drawText).width;
      while (measure() > maxW && fs > 16) {
        fs -= 2;
        ctx.font = `800 ${fs}px ${font}`;
      }

      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.fillStyle = color;
      ctx.fillText(drawText, W * textX, y);

      ctx.restore();
    });
  }, [text, color, fontSize, font, textX, textY, bgColor]);

  useEffect(() => { if (imgLoaded) draw(); }, [draw, imgLoaded]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'thumbnail-1280x720.png';

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 1280;
    finalCanvas.height = 720;
    const ctx = finalCanvas.getContext('2d');
    const img = imgRef.current;
    if (!ctx || !img) return;

    ctx.drawImage(img, 0, 0, 1280, 720);

    const lines = text.split('\n').filter(Boolean);
    if (lines.length > 0) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const lineH = fontSize * 1.2 * (1280 / 800);
      const fs = fontSize * (1280 / 800);
      const totalH = lines.length * lineH;
      const startY = 720 * textY - totalH / 2;

      lines.forEach((line, i) => {
        const y = startY + i * lineH + lineH / 2;
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 16;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.font = `800 ${fs}px ${font}`;
        ctx.fillStyle = color;
        ctx.fillText(line, 1280 * textX, y);
        ctx.restore();
      });
    }

    link.href = finalCanvas.toDataURL('image/png');
    link.click();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).closest('.editor-preview')?.getBoundingClientRect();
    if (!rect) return;
    dragging.current = true;
    offsetRef.current = {
      x: e.clientX - rect.left - textX * rect.width,
      y: e.clientY - rect.top - textY * rect.height,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const rect = (e.target as HTMLElement).closest('.editor-preview')?.getBoundingClientRect();
    if (!rect) return;
    const nx = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left - offsetRef.current.x) / rect.width));
    const ny = Math.max(0.05, Math.min(0.95, (e.clientY - rect.top - offsetRef.current.y) / rect.height));
    setTextX(nx);
    setTextY(ny);
  };

  const handleMouseUp = () => { dragging.current = false; };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
    }} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="glass-panel" style={{
        padding: '24px', borderRadius: '20px', maxWidth: '1040px', width: '95%',
        maxHeight: '95vh', overflow: 'auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: 0 }}>Edit Thumbnail</h3>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', cursor: 'pointer',
            width: '36px', height: '36px', borderRadius: '10px', fontSize: '18px',
          }}>✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>
          {/* Preview */}
          <div
            className="editor-preview"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            style={{
              position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: dragging.current ? 'grabbing' : 'grab',
              aspectRatio: '16/9', background: '#000',
            }}
          >
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            {!imgLoaded && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '14px' }}>
                Loading...
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Text */}
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginBottom: '6px', display: 'block' }}>TEXT</label>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none',
                }}
              />
            </div>

            {/* Font Size */}
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                SIZE: {fontSize}px
              </label>
              <input type="range" min="20" max="96" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ width: '100%' }} />
            </div>

            {/* Font Family */}
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginBottom: '6px', display: 'block' }}>FONT</label>
              <select value={font} onChange={(e) => setFont(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none',
                }}>
                {FONTS.map((f) => <option key={f} value={f} style={{ background: '#1a1a2e' }}>{f}</option>)}
              </select>
            </div>

            {/* Text Color */}
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginBottom: '6px', display: 'block' }}>TEXT COLOR</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {COLORS.map((c) => (
                  <button key={c} onClick={() => setColor(c)}
                    style={{
                      width: '32px', height: '32px', borderRadius: '8px', border: color === c ? '2px solid #fff' : '2px solid transparent',
                      background: c, cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Position hint */}
            <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>
              Drag text on the preview to reposition.
            </p>

            {/* Download */}
            <button onClick={handleDownload} className="premium-button" style={{ padding: '12px', fontSize: '14px', marginTop: 'auto' }}>
              Download PNG ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
