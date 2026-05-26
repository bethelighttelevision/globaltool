import React from 'react';

interface AdProps {
  type: 'header' | 'mid-content' | 'footer' | 'sidebar';
  width?: string;
  height?: string;
}

export default function AdSensePlaceholder({ type, width = '100%', height = '90px' }: AdProps) {
  return <div style={{ width, height, margin: '20px auto' }} />;
}
