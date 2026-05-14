import React from 'react';

export default function Loading() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '3px', 
      background: 'rgba(255, 255, 255, 0.05)', 
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <div style={{ 
        height: '100%', 
        background: 'var(--accent)', 
        boxShadow: '0 0 10px var(--accent)',
        animation: 'loading-bar 1.5s infinite ease-in-out'
      }}></div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-bar {
          0% { width: 0; left: -100%; }
          50% { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }
      `}} />
    </div>
  );
}
