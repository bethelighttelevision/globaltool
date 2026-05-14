"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { Camera, Copy, CheckCircle2, ArrowLeft, Sparkles, Smile } from 'lucide-react';

export default function InstagramCaptionPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isLoading, setIsLoading] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generateCaptions = () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    
    setTimeout(() => {
      const results = [
        `✨ Level up your ${topic} game in 2026! Success isn't just about hard work, it's about strategy. #Success #Motivation #${topic.replace(/\s+/g, '')}`,
        `They told me I couldn't, so I did twice. Mastering ${topic} one day at a time. 🚀 #${topic.replace(/\s+/g, '')} #Mindset`,
        `The secret to ${topic}? Consistency. Don't stop when you're tired, stop when you're done. 💎 #Consistency #Results #${topic.replace(/\s+/g, '')}`,
        `${topic} vibez only. 🌈 Living life on my own terms. #${topic.replace(/\s+/g, '')} #Lifestyle #Growth`
      ];
      setCaptions(results);
      setIsLoading(false);
    }, 1200);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Instagram Caption Generator" 
        description="Generate viral, high-engagement captions for your Reels and Posts in seconds using AI." 
        url="https://globalutilitytoolbox.com/instagram-caption" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '20px', marginBottom: '24px' }}>
          <Camera size={48} color="#fff" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Instagram Caption Generator</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Stop staring at a blank screen. Generate viral, high-engagement captions for your Reels and Posts in seconds.
        </p>

        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
           <input 
            type="text" 
            className="input-field" 
            placeholder="What is your post about? (e.g., 'Morning Coffee', 'New Product')" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ marginBottom: '16px', fontSize: '17px' }} 
           />
           
           <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
             {['Professional', 'Funny', 'Minimalist', 'Inspirational'].map((t) => (
               <button 
                key={t}
                onClick={() => setTone(t)}
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  fontSize: '13px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--card-border)',
                  background: tone === t ? 'var(--foreground)' : 'rgba(255,255,255,0.05)',
                  color: tone === t ? 'var(--background)' : 'var(--foreground)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
               >
                 {t}
               </button>
             ))}
           </div>

           <button 
            className="premium-button" 
            onClick={generateCaptions}
            disabled={isLoading}
            style={{ width: '100%', padding: '16px', fontSize: '17px' }}
           >
             {isLoading ? 'AI Writing Captions...' : 'Generate Viral Captions'}
           </button>
        </div>
      </div>

      {captions.length > 0 && (
        <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {captions.map((cap, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--foreground)', marginBottom: '40px' }}>{cap}</p>
              <button 
                onClick={() => handleCopy(cap, idx)}
                style={{ 
                  position: 'absolute', 
                  bottom: '20px', 
                  right: '20px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: 'none', 
                  color: 'var(--muted)', 
                  padding: '8px', 
                  borderRadius: '10px', 
                  cursor: 'pointer' 
                }}
              >
                {copiedIdx === idx ? <CheckCircle2 size={18} color="var(--success)" /> : <Copy size={18} />}
              </button>
            </div>
          ))}
        </div>
      )}
      
      <AdSensePlaceholder type="mid-content" />
      <RelatedTools currentPath="/instagram-caption" />
    </div>
  );
}
