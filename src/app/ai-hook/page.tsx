"use client";

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import { generateAICentent } from '../actions/ai';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function AIHookPage() {
  usePageMeta("Free AI Viral Hook Generator | ToolSnappy", "Generate viral content hooks for social media using AI. Free hook generator for TikTok, Instagram, YouTube.");
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ psychological: string[]; curiosity: string[]; data: string[] } | null>(null);

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
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to generate hooks.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      icon={<Zap size={48} strokeWidth={1.5} />}
      title="Viral AI Hook Generator"
      description="Input your video topic below to instantly generate psychological, curiosity, and data-driven hooks engineered for maximum retention."
      seo={{
        toolName: "Viral AI Hook Generator",
        description: "Generate highly retaining TikTok and YouTube hooks using advanced psychological and curiosity-driven frameworks.",
        url: "https://globalutilitytoolbox.com/ai-hook"
      }}
      currentPath="/ai-hook"
      results={results && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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
      contentSection={
        <div style={{ maxWidth: '900px', margin: '80px auto 0' }}>
          <article className="prose prose-invert lg:prose-xl">
            <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Science Behind Viral Video Hooks in 2026</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              In the age of short-form content where attention spans are shrinking and competition for views is fiercer than ever, you have exactly 1.7 seconds to stop someone from scrolling past your video. Our <strong>Viral AI Hook Generator</strong> is built on the same proven psychological principles used by the world&rsquo;s top creators to dominate TikTok, Instagram Reels, and YouTube Shorts. By mastering the critical first few seconds of your video content, you can dramatically improve audience retention rates and signal to the algorithm that your content is worth showing to a much wider audience. A compelling hook is no longer optional for creators who want to grow — it is the single most important element of any video strategy.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Three Types of Hooks for Guaranteed Engagement</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Not every video topic requires the same style of opening line. To truly go viral and build a loyal following, you need to match your hook to your audience&rsquo;s intent, emotional state, and expectations. Our AI tool generates three distinct and proven categories of hooks, each designed to trigger a different psychological response in the viewer:
            </p>
            <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '32px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Psychological Hooks:</strong> These leverage powerful emotional triggers such as fear of missing out, negative bias, social proof, or aspirational desire to create an immediate emotional connection that compels the viewer to keep watching for resolution or validation.</li>
              <li style={{ marginBottom: '12px' }}><strong>Curiosity Gaps:</strong> These open with an intriguing problem, a hidden secret, or an unanswered question that can only be resolved by watching the entire video through to the end, leveraging the natural human drive for closure and completion.</li>
              <li style={{ marginBottom: '12px' }}><strong>Data-Driven Hooks:</strong> These use specific statistics, percentages, or numbers combined with social proof elements to establish instant authority, credibility, and trust before the viewer has seen any of the actual content you are delivering.</li>
            </ul>

            <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #34c759' }}>
              <h4 style={{ marginTop: 0, color: '#34c759' }}>The &ldquo;Rule of One&rdquo; for Maximum Impact</h4>
              <p style={{ marginBottom: 0, fontSize: '15px' }}>
                Every hook you write should focus on one single idea, one single problem, or one single benefit for the viewer. Trying to explain too many concepts in the first three seconds is the fastest way to confuse your audience and lose their attention permanently. Keep your hook focused, keep it sharp, and make sure every word serves the singular purpose of making the viewer curious enough to watch the next second of your content. This principle applies whether you are creating a fifteen-second TikTok or a ten-minute YouTube documentary — the opening must be ruthlessly focused.
              </p>
            </div>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Optimizing Hooks for Search and Algorithmic Discovery</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              While hooks are primarily designed to capture the attention of scrolling human users, including your primary keyword naturally within the first spoken sentence also provides significant SEO benefits for content discovery. Platforms like TikTok, YouTube, and Instagram now automatically transcribe your video audio to understand the topical relevance of your content for search and recommendation systems. By using our AI-generated hooks, you are effectively optimizing your video for both human psychology and algorithmic content categorization simultaneously. This dual optimization approach gives your content a significant competitive advantage in both search results and recommendation feeds, increasing the total surface area for discovery.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Hook Formulas That Work Across Every Platform</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              While the three categories above provide the framework, there are specific proven formulas that consistently deliver high retention across different platforms. The Prediction Hook opens with a controversial or unexpected prediction that challenges the viewer&rsquo;s existing beliefs. The Transformation Hook shows a dramatic before-and-after scenario that makes the viewer believe they can achieve the same result. The Myth-Busting Hook starts by challenging a widely held belief or common practice, immediately establishing the creator as an authority who has deeper knowledge than the average source. The Question Hook poses a direct question to the viewer that forces them to mentally engage with the topic before you provide the answer. Each of these formulas can be adapted to virtually any niche or topic with the right phrasing and delivery.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Test and Refine Your Video Hooks</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Creating the perfect hook is an iterative process that benefits from testing and data analysis. The most successful creators generate multiple hook variations for each video and test them against each other using A/B thumbnail and title testing tools available on platforms like YouTube Studio. Pay close attention to your audience retention graphs — the first five seconds of the curve tell you everything you need to know about whether your hook is working. If you see a sharp drop-off in the first few seconds, your hook needs to be more compelling, more specific, or more directly relevant to the promise made in your thumbnail and title. Over time, you will develop an intuition for which types of hooks resonate best with your specific audience, allowing you to consistently open with high-retention content that grows your channel.
            </p>
          </article>
        </div>
      }
    >
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
    </ToolLayout>
  );
}
