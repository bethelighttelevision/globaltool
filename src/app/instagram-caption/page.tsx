"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { Camera, Copy, CheckCircle2, ArrowLeft } from 'lucide-react';
import { generateAICentent } from '../actions/ai';

export default function InstagramCaptionPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isLoading, setIsLoading] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generateCaptions = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    
    try {
      const prompt = `Generate 4 viral Instagram captions for the topic: "${topic}". 
      The tone should be ${tone}. 
      Include relevant emojis and hashtags. 
      Format each caption clearly, separated by a unique delimiter like "---". 
      Don't include any extra text, just the 4 captions.`;
      
      const response = await generateAICentent(prompt);
      
      let results: string[] = [];
      if (response.includes('---')) {
        results = response.split('---').map(c => c.trim()).filter(Boolean);
      } else {
        // Fallback: Split by double newlines or paragraph blocks
        const blocks = response.split(/\n\s*\n/).map(c => c.trim()).filter(Boolean);
        results = blocks.map(block => block.replace(/^[\d\.\-\*\s]+/, '').trim());
      }
      
      // If still not properly split, try matching standard numbered items (e.g., "1. ...")
      if (results.length < 2) {
        const matches = response.match(/(?:^|\n)\d+[\.\)]\s*([\s\S]*?)(?=\n\d+[\.\)]|$)/g);
        if (matches) {
          results = matches.map(m => m.replace(/^\s*\d+[\.\)]\s*/, '').trim());
        }
      }
      
      // Filter out meta-text and keep only valid captions
      results = results.filter(c => c.length > 10 && !c.toLowerCase().includes('here are') && !c.toLowerCase().includes('instagram caption'));
      
      // If parsing fails entirely, fallback to splitting by lines or the entire response
      if (results.length === 0) {
        results = response.split('\n').map(c => c.trim()).filter(c => c.length > 15);
      }
      
      if (results.length === 0) {
        results = [response];
      }
      
      setCaptions(results.slice(0, 4));
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to generate captions.");
    } finally {
      setIsLoading(false);
    }
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
      
      <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '20px', marginBottom: '24px' }}>
          <Camera size={48} color="#fff" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>Instagram Caption Generator</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
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
           
           <div className="responsive-tone-grid" style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
             {['Professional', 'Funny', 'Minimalist', 'Inspirational'].map((t) => (
               <button 
                key={t}
                onClick={() => setTone(t)}
                style={{ 
                  padding: '12px 10px', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  borderRadius: '12px', 
                  border: '1px solid var(--card-border)',
                  background: tone === t ? 'var(--foreground)' : 'rgba(255,255,255,0.05)',
                  color: tone === t ? 'var(--background)' : 'var(--foreground)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%'
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
        <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
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
      
      {/* SEO CONTENT SECTION */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article>
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Complete Guide to Writing Viral Instagram Captions in 2026</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            A stunning photo or video will stop the scroll, but a great caption is what drives engagement, builds community, and converts followers into customers. Our <strong>AI Instagram Caption Generator</strong> uses proven copywriting frameworks to produce captions that resonate with your specific audience, whether you are a lifestyle blogger, e-commerce brand, or corporate account.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Your Caption Strategy Directly Impacts Reach</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            The Instagram algorithm rewards posts that generate immediate engagement — saves, shares, and comments in the first 30 minutes of posting. A well-crafted caption with a clear Call-to-Action (CTA) like &quot;Save this post for later&quot; or &quot;Tag a friend who needs this&quot; can dramatically boost your initial engagement rate and signal to the algorithm that your content deserves a wider distribution.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #cc2366' }}>
            <h4 style={{ marginTop: 0, color: '#cc2366' }}>The 3-Part Caption Formula</h4>
            <p style={{ marginBottom: 0, fontSize: '15px', color: 'var(--muted)' }}>
              <strong>Hook (Line 1):</strong> Stop the scroll with a bold statement or question. <br />
              <strong>Body:</strong> Deliver value, tell a story, or explain the context of your post. <br />
              <strong>CTA:</strong> Direct your audience to comment, save, or click the link in bio.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Optimizing Caption Length and Hashtag Usage</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            For feed posts, aim for 150-300 words in your caption. For Reels, shorter captions (under 100 characters) that quickly convey the video&apos;s value tend to perform better. Regarding hashtags, using a mix of niche-specific (e.g., #CryptoInvestor) and broad tags (e.g., #Finance) provides both discoverability and community access. Our generator automatically adds relevant hashtags to each caption.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Tone Matters: Matching Your Voice to Your Audience</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Our tool provides four tone options: Professional, Funny, Minimalist, and Inspirational. Each caters to a different audience segment. A B2B SaaS company should use a professional and informative tone, while a personal fitness creator thrives with an inspirational and motivational voice. Choosing the right tone dramatically increases your audience connection rate.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/instagram-caption" />
    </div>
  );
}
