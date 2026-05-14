"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { Type, ArrowLeft, BarChart3, Clock, AlignLeft } from 'lucide-react';

export default function WordCounterPage() {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const readingTime = Math.ceil(wordCount / 200); // 200 wpm
  
  const calculateGrade = () => {
    if (wordCount < 10) return 'N/A';
    // Simplified logic for demo
    if (text.length / wordCount > 5) return 'Advanced';
    return 'Intermediate';
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Professional Word Counter" 
        description="Analyze your content's readability, word density, and reading time. Essential for bloggers and SEO specialists." 
        url="https://globalutilitytoolbox.com/word-counter" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(0, 113, 227, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Type size={40} color="#0071e3" strokeWidth={2} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Professional Word Counter</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Analyze your content's readability, word density, and reading time. Essential for bloggers and SEO specialists.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Words', value: wordCount, icon: <AlignLeft size={16} /> },
            { label: 'Characters', value: charCount, icon: <Type size={16} /> },
            { label: 'Reading Time', value: `${readingTime} min`, icon: <Clock size={16} /> },
            { label: 'Readability', value: calculateGrade(), icon: <BarChart3 size={16} /> },
          ].map((stat, i) => (
            <div key={i} className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                {stat.icon} {stat.label}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <textarea 
          className="input-field" 
          placeholder="Paste your text here for real-time analysis..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', height: '350px', fontSize: '16px', padding: '24px', background: 'rgba(0,0,0,0.2)', resize: 'vertical' }} 
        />
      </div>
      
      <AdSensePlaceholder type="mid-content" />
      <RelatedTools currentPath="/word-counter" />
    </div>
  );
}

