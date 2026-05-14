import React from 'react';

interface AdProps {
  type: 'header' | 'mid-content' | 'footer' | 'sidebar';
  width?: string;
  height?: string;
}

export default function AdSensePlaceholder({ type, width = '100%', height = '90px' }: AdProps) {
  return (
    <div 
      className="glass-panel" 
      style={{ 
        width, 
        height, 
        margin: '20px auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderStyle: 'dashed',
        color: 'var(--muted)',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}
    >
      AdSense Placeholder [{type}]
    </div>
  );
}
