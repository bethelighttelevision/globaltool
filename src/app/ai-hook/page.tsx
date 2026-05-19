"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, ArrowLeft } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { generateAICentent } from '../actions/ai';

export default function AIHookPage() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    
    try {
      const prompt = `Generate 9 viral hooks for a video about "${topic}". 
      Divide them into 3 categories:
      1. Psychological Hooks (Emotional/FOMO)
      2. Curiosity Hooks (Mystery/Secret)
      3. Data-Driven Hooks (Numbers/Proof)
      
      Format the output as a JSON object with keys "psychological", "curiosity", and "data", each being an array of 3 strings. 
      Only return the JSON.`;
      
      const response = await generateAICentent(prompt);
      
      let data;
      try {
        let cleanJson = response.trim();
        const firstBrace = cleanJson.indexOf('{');
        const lastBrace = cleanJson.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
        }
        data = JSON.parse(cleanJson);
        // Ensure structure exists
        if (!data.psychological || !Array.isArray(data.psychological)) data.psychological = [];
        if (!data.curiosity || !Array.isArray(data.curiosity)) data.curiosity = [];
        if (!data.data || !Array.isArray(data.data)) data.data = [];
      } catch (e) {
        console.warn("JSON parsing failed, attempting fallback manual parsing:", e);
        const lines = response.split('\n').map(l => l.trim()).filter(Boolean);
        const psychological: string[] = [];
        const curiosity: string[] = [];
        const dataDriven: string[] = [];
        
        let currentCategory: 'psychological' | 'curiosity' | 'data' = 'psychological';
        for (const line of lines) {
          const lower = line.toLowerCase();
          if (lower.includes('psychological')) {
            currentCategory = 'psychological';
            continue;
          } else if (lower.includes('curiosity')) {
            currentCategory = 'curiosity';
            continue;
          } else if (lower.includes('data-driven') || lower.includes('data driven') || (lower.includes('data') && !lower.includes('json'))) {
            currentCategory = 'data';
            continue;
          }
          
          const cleanLine = line.replace(/^[\d\.\-\*\s]+/, '').replace(/^["']|["']$/g, '').trim();
          if (cleanLine.length > 8 && !cleanLine.startsWith('{') && !cleanLine.startsWith('}')) {
            if (currentCategory === 'psychological') psychological.push(cleanLine);
            else if (currentCategory === 'curiosity') curiosity.push(cleanLine);
            else dataDriven.push(cleanLine);
          }
        }
        
        data = {
          psychological: psychological.length >= 3 ? psychological.slice(0, 3) : [...psychological, "Create a sense of urgency around " + topic, "Reveal a hidden truth about " + topic, "Provide a stat about " + topic].slice(0, 3),
          curiosity: curiosity.length >= 3 ? curiosity.slice(0, 3) : [...curiosity, "What they won't tell you about " + topic, "The secret to mastering " + topic, "Stop doing this if you want " + topic].slice(0, 3),
          data: dataDriven.length >= 3 ? dataDriven.slice(0, 3) : [...dataDriven, "Why 99% of people fail at " + topic, "The 3-step formula for " + topic, "Proof that " + topic + " actually works"].slice(0, 3)
        };
      }
      
      setResults(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to generate hooks.");
    } finally {
      setIsLoading(false);
    }
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
      
      <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(52, 199, 89, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Bot size={48} color="#34c759" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>Viral AI Hook Generator</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
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
        <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          <div className="glass-panel" style={{ padding: '32px', borderTop: '4px solid #ff3b30' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#ff3b30' }}>Psychological Hooks</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.psychological.map((hook: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '15px', lineHeight: 1.5 }}>
                  &quot;{hook}&quot;
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderTop: '4px solid #0071e3' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#0071e3' }}>Curiosity Hooks</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.curiosity.map((hook: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '15px', lineHeight: 1.5 }}>
                  &quot;{hook}&quot;
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderTop: '4px solid #32d74b' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#32d74b' }}>Data-Driven Titles</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.data.map((hook: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '15px', lineHeight: 1.5 }}>
                  &quot;{hook}&quot;
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
      
      {/* SEO CONTENT SECTION */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Science Behind Viral Video Hooks in 2026</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            In the age of short-form content, you have exactly 1.7 seconds to stop someone from scrolling. Our <strong>Viral AI Hook Generator</strong> is built on the same psychological principles used by the world&apos;s top creators to dominate TikTok, Reels, and YouTube Shorts. By mastering the first few seconds of your video, you can drastically improve your retention rates and force the algorithm to show your content to a wider audience.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Three Types of Hooks for Guaranteed Engagement</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Not every video requires the same opening. To truly go viral, you need to match your hook to your audience&apos;s intent. Our tool generates three distinct categories:
          </p>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '32px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Psychological Hooks:</strong> These leverage fear of missing out (FOMO) or negative bias to trigger an emotional response.</li>
            <li style={{ marginBottom: '12px' }}><strong>Curiosity Gaps:</strong> These present a problem or a secret that can only be resolved by watching the entire video.</li>
            <li style={{ marginBottom: '12px' }}><strong>Data-Driven Hooks:</strong> These use specific numbers and social proof to establish instant authority and trust.</li>
          </ul>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #34c759' }}>
            <h4 style={{ marginTop: 0, color: '#34c759' }}>The "Rule of One"</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              Your hook should focus on one single idea, one single problem, or one single benefit. Trying to explain too much in the first 3 seconds is the fastest way to lose a viewer. Keep it focused, keep it sharp.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Optimizing Hooks for Search and Discovery</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            While hooks are vital for scrolling users, including your primary keyword in the first sentence also helps with SEO. Platforms like TikTok and YouTube now transcribe your audio to understand what the video is about. By using our AI-generated hooks, you are effectively optimizing your video for both the human eye and the AI algorithm.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/ai-hook" />
    </div>
  );
}
