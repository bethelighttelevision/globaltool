'use client';

import React from 'react';
import { Share2 } from 'lucide-react';

export default function ShareButton() {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard! Share it with your friends.");
    }
  };

  return (
    <button 
      className="premium-button" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '12px 24px',
        fontSize: '14px'
      }}
      onClick={handleShare}
    >
      <Share2 size={16} /> Copy Guide Link
    </button>
  );
}
