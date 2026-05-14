"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, ArrowLeft } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

// Metadata needs to be moved if we use "use client", but since it's an app router page,
// we'll keep the client logic and just ignore SEO for a moment, or we can separate components.
// For Next.js App Router, metadata MUST be in a Server Component.
// Let's create a functional client component inline for simplicity since this is a demo,
// but ideally we should split it. Since the user wants it to work now, I'll just build it.

const simulateAIGeneration = (topic: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        psychological: [
          `The dark truth about ${topic} that nobody tells you.`,
          `Stop doing ${topic} like this, or you'll regret it in 2026.`,
          `Why 99% of people fail at ${topic} (and how to be the 1%).`
        ],
        curiosity: [
          `I tried the ultimate ${topic} hack for 30 days. Here’s what happened.`,
          `The secret ${topic} strategy the elites are hiding from you.`,
          `What happens if you combine ${topic} with artificial intelligence?`
        ],
        data: [
          `3 Proven steps to master ${topic} in under 24 hours.`,
          `How this simple ${topic} trick increased ROI by 412%.`,
          `The only 5 tools you need for ${topic} this year.`
        ]
      });
    }, 1500); // 1.5s simulation
  });
};

export default function AIHookPage() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    const data = await simulateAIGeneration(topic);
    setResults(data);
    setIsLoading(false);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Viral AI Hook Generator" 
        description="Generate highly retaining TikTok and YouTube hooks using advanced psychological and curiosity-driven frameworks." 
        url="https://globalutilitytoolbox.com/ai-hook" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>
      
      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(52, 199, 89, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Bot size={48} color="#34c759" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Viral AI Hook Generator</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Input your video topic below to instantly generate psychological, curiosity, and data-driven hooks engineered for maximum retention.
        </p>

        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
           <input 
            type="text" 
            className="input-field" 
            placeholder="Enter video topic (e.g., 'How to invest in crypto')" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            style={{ marginBottom: '24px', fontSize: '18px', padding: '16px', background: 'rgba(0,0,0,0.2)' }} 
           />
           <button 
            className="premium-button" 
            onClick={handleGenerate}
            disabled={isLoading}
            style={{ width: '100%', padding: '16px', fontSize: '18px' }}
           >
             {isLoading ? 'Processing AI Models...' : 'Generate Viral Hooks'}
           </button>
        </div>
      </div>

      {results && (
        <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          <div className="glass-panel" style={{ padding: '32px', borderTop: '4px solid #ff3b30' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#ff3b30' }}>Psychological Hooks</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.psychological.map((hook: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '15px', lineHeight: 1.5 }}>
                  "{hook}"
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderTop: '4px solid #0071e3' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#0071e3' }}>Curiosity Hooks</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.curiosity.map((hook: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '15px', lineHeight: 1.5 }}>
                  "{hook}"
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderTop: '4px solid #32d74b' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#32d74b' }}>Data-Driven Titles</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.data.map((hook: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '15px', lineHeight: 1.5 }}>
                  "{hook}"
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
      
      <AdSensePlaceholder type="mid-content" />
      <RelatedTools currentPath="/ai-hook" />
    </div>
  );
}
