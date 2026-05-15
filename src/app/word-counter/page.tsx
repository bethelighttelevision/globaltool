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
    const avgWordLength = text.replace(/\s/g, '').length / wordCount;
    if (avgWordLength > 6) return 'Advanced';
    if (avgWordLength > 4.5) return 'Intermediate';
    return 'Basic';
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
          Analyze your content&apos;s readability, word density, and reading time. Essential for bloggers and SEO specialists.
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

      {/* SEO CONTENT SECTION */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Ultimate Guide to Word Counting and Content Readability</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            In the highly competitive world of 2026 digital marketing, content depth is a primary ranking factor. Our <strong>Professional Word Counter</strong> is more than just a character tracker—it is a sophisticated readability analyzer designed for authors, editors, and SEO managers. Understanding the balance between length and clarity is key to winning on the first page of Google.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Word Density Matters for Modern SEO</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            While &quot;thin content&quot; can lead to manual penalties from search engines, excessively long articles without proper structure can increase bounce rates. Our tool provides real-time statistics on word count and character limits, helping you adhere to the specific requirements of platforms like LinkedIn, Amazon, and WordPress.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #0071e3' }}>
            <h4 style={{ marginTop: 0, color: '#0071e3' }}>Recommended Content Lengths for 2026</h4>
            <ul style={{ color: 'var(--muted)', fontSize: '14px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Pillar Blog Posts:</strong> 2,000 - 3,500 words for authority.</li>
              <li style={{ marginBottom: '8px' }}><strong>News & Updates:</strong> 500 - 800 words for quick consumption.</li>
              <li style={{ marginBottom: '8px' }}><strong>Product Descriptions:</strong> 300 - 600 words for conversion optimization.</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Improving Readability and User Engagement</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Our tool analyzes the complexity of your writing. For web content, aiming for a &quot;Basic&quot; to &quot;Intermediate&quot; readability score ensures that your message reaches the widest possible audience. Use our estimated reading time feature to manage user expectations—shorter reading times often lead to higher completion rates for informational guides.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/word-counter" />
    </div>
  );
}
