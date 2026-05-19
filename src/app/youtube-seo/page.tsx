"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { Play, Copy, CheckCircle2, ArrowLeft, Search, Sparkles } from 'lucide-react';
import { generateAICentent } from '../actions/ai';

export default function YoutubeSEOPage() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const calculateSEOScore = (data: any) => {
    let score = 0;
    if (data.titles[0].length > 40) score += 25;
    if (data.description.length > 200) score += 25;
    if (data.tags.length > 5) score += 25;
    if (topic.split(' ').length >= 3) score += 25;
    return score;
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    
    try {
      const prompt = `Generate YouTube SEO optimization data for a video about "${topic}". 
      I need:
      1. 4 viral title options.
      2. A high-retention video description.
      3. 8-12 high-density keywords/tags.
      
      Format the output as a JSON object with keys "titles" (array), "description" (string), and "tags" (array).
      Only return the JSON.`;
      
      const response = await generateAICentent(prompt);
      const cleanJson = response.replace(/```json|```/g, '').trim();
      const data = JSON.parse(cleanJson);
      
      setResults({
        ...data,
        score: calculateSEOScore(data)
      });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to generate SEO data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="YouTube SEO Optimizer" 
        description="Generate viral titles, descriptions, and high-density tags. Beat the algorithm with our 2026 SEO Searchability Score." 
        url="https://globalutilitytoolbox.com/youtube-seo" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(255, 0, 0, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Play size={48} color="#ff0000" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>YouTube SEO Optimizer</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Generate viral titles, descriptions, and high-density tags. Beat the algorithm with our 2026 SEO Searchability Score.
        </p>

        <div style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} size={20} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter your video topic or main keyword..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              style={{ paddingLeft: '48px', fontSize: '17px' }}
            />
          </div>
          <button 
            className="premium-button" 
            onClick={handleGenerate}
            disabled={isLoading}
            style={{ width: '100%', padding: '16px', fontSize: '17px', background: 'var(--foreground)', color: 'var(--background)' }}
          >
            {isLoading ? 'Analyzing Algorithm...' : 'Optimize Video SEO'}
          </button>
        </div>
      </div>

      {results && (
        <div className="animate-slide-up">
          {/* SEO Score Section */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={20} color="#ffcc00" />
                <span style={{ fontSize: '18px', fontWeight: '600' }}>Overall Searchability Score</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                Your SEO score is based on title strength, description depth, and tag density for high-search volume 2026 keywords.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: results.score > 70 ? 'var(--success)' : '#ffcc00', lineHeight: 1 }}>{results.score}/100</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>Rank Potential</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Titles Panel */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Play size={20} color="#ff0000" /> Viral Title Options
              </h3>
              {results.titles.map((t: string, i: number) => (
                <div key={i} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: '500', flex: 1, paddingRight: '12px' }}>{t}</span>
                  <button onClick={() => handleCopy(t, `title-${i}`)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                    {copiedType === `title-${i}` ? <CheckCircle2 size={18} color="var(--success)" /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>

            {/* Tags & Description Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Optimized Video Tags</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                  {results.tags.map((tag: string, i: number) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', border: '1px solid var(--card-border)' }}>
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => handleCopy(results.tags.join(', '), 'tags')}
                  className="premium-button" 
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}
                >
                  {copiedType === 'tags' ? <CheckCircle2 size={18} color="var(--success)" /> : <Copy size={18} />}
                  &nbsp; {copiedType === 'tags' ? 'Tags Copied' : 'Copy All Tags'}
                </button>
              </div>

              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>AI Generated Description</h3>
                <textarea 
                  readOnly 
                  value={results.description} 
                  style={{ width: '100%', height: '150px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '16px', color: 'var(--muted)', fontSize: '14px', marginBottom: '16px', resize: 'none' }} 
                />
                <button 
                  onClick={() => handleCopy(results.description, 'description')}
                  className="premium-button" 
                  style={{ width: '100%', padding: '12px' }}
                >
                  {copiedType === 'description' ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  &nbsp; {copiedType === 'description' ? 'Description Copied' : 'Copy Description'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* SEO CONTENT SECTION */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Mastering YouTube SEO in 2026</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            YouTube is the second largest search engine in the world. To get your videos noticed among millions of uploads, you need more than just great content—you need a data-driven SEO strategy. Our <strong>YouTube SEO Optimizer</strong> helps you craft viral-ready titles, high-retention descriptions, and strategic tags that align with the latest algorithm updates.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Core Pillars of Video Ranking</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            The YouTube algorithm prioritizes two main factors: Click-Through Rate (CTR) and Watch Time. By using keywords that people are actually searching for, you increase your chances of appearing in the &quot;Suggested&quot; and &quot;Search&quot; results. Our tool analyzes your main topic to provide keywords that balance search volume with competition levels.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #32d74b' }}>
            <h4 style={{ marginTop: 0, color: '#32d74b' }}>Pro Tip: The First 24 Hours</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              The first 24 hours of your video release are critical. Proper SEO setup ensures that the algorithm can instantly categorize your video and show it to the right audience, giving you that initial boost needed to go viral.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Optimizing Titles and Descriptions</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Your title should be a mix of &quot;Click Magnet&quot; phrases and searchable keywords. For descriptions, ensure the first 2-3 lines contain your primary keyword, as this is what shows up in Google search results. Our optimizer generates these elements in a way that feels natural to humans but is highly readable for AI bots.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/youtube-seo" />
    </div>
  );
}
