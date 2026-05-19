"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Star, Moon, Sun, Copy, CheckCircle2, RefreshCw } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { generateAICentent } from '../actions/ai';

export default function LuckyNumberPage() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const calculateLuckyNumber = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    
    // Numerology Logic (Pythagorean)
    const letterValues: { [key: string]: number } = {
      a: 1, j: 1, s: 1,
      b: 2, k: 2, t: 2,
      c: 3, l: 3, u: 3,
      d: 4, m: 4, v: 4,
      e: 5, n: 5, w: 5,
      f: 6, o: 6, x: 6,
      g: 7, p: 7, y: 7,
      h: 8, q: 8, z: 8,
      i: 9, r: 9
    };

    let sum = 0;
    const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
    for (const char of cleanName) {
      sum += letterValues[char] || 0;
    }

    // Reduce to single digit or master numbers (11, 22, 33)
    const reduce = (n: number): number => {
      if (n <= 9 || n === 11 || n === 22 || n === 33) return n;
      return reduce(String(n).split('').reduce((a, b) => a + parseInt(b), 0));
    };

    const destinyNumber = reduce(sum);

    try {
      const prompt = `Analyze the numerology destiny number ${destinyNumber} for a person named "${name}".
      Provide:
      1. A short viral "destiny" personality analysis (2-3 sentences).
      2. Lucky Color.
      3. Lucky Day of the week.
      4. A "TikTok style" prediction for their 2026.
      
      Format the output as a JSON object with keys "analysis", "color", "day", and "prediction".
      Only return the JSON.`;

      const response = await generateAICentent(prompt);
      const cleanJson = response.replace(/```json|```/g, '').trim();
      const aiData = JSON.parse(cleanJson);
      
      setResult({
        number: destinyNumber,
        ...aiData
      });
    } catch (error) {
      console.error(error);
      alert("The stars are misaligned. Please check your API key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="AI Lucky Number Finder - Numerology Calculator" 
        description="Find your lucky number by name using AI and ancient numerology. Get personality insights, lucky colors, and 2026 predictions instantly." 
        url="https://globalutilitytoolbox.com/lucky-number" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px', background: 'radial-gradient(circle at top right, rgba(168, 199, 250, 0.05), transparent), radial-gradient(circle at bottom left, rgba(210, 168, 250, 0.05), transparent)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(168, 199, 250, 0.1)', borderRadius: '50%', marginBottom: '24px', boxShadow: '0 0 30px rgba(168, 199, 250, 0.2)' }}>
          <Star size={40} color="#a8c7fa" strokeWidth={1.5} className="animate-pulse" />
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.03em' }}>AI Lucky Number Finder</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Discover the hidden power of your name. Our AI uses ancient Pythagorean numerology to reveal your destiny.
        </p>

        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '32px', border: '1px solid var(--card-border)', backdropFilter: 'blur(20px)' }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', textAlign: 'left', fontSize: '14px', color: 'var(--muted)', marginBottom: '8px', marginLeft: '12px' }}>ENTER YOUR FULL NAME</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Victor Anthony" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontSize: '18px', padding: '16px 24px', textAlign: 'center' }}
            />
          </div>
          <button 
            className="premium-button" 
            onClick={calculateLuckyNumber}
            disabled={isLoading || !name}
            style={{ width: '100%', padding: '18px', fontSize: '18px', borderRadius: '16px' }}
          >
            {isLoading ? 'Consulting the Universe...' : 'Reveal My Destiny'}
          </button>
        </div>
      </div>

      {result && (
        <div className="animate-slide-up" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Main Result */}
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', border: '1px solid rgba(168, 199, 250, 0.3)', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}>
              <div style={{ fontSize: '14px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Your Lucky Destiny Number</div>
              <div style={{ fontSize: '120px', fontWeight: '900', color: '#fff', lineHeight: 1, textShadow: '0 0 50px rgba(168, 199, 250, 0.5)' }}>{result.number}</div>
              <p style={{ marginTop: '24px', fontSize: '18px', color: 'var(--foreground)', lineHeight: 1.6, fontStyle: 'italic' }}>
                &quot;{result.analysis}&quot;
              </p>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Moon size={24} color="#a8c7fa" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>LUCKY COLOR</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{result.color}</div>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sun size={24} color="#ffcc00" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>LUCKY DAY</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{result.day}</div>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent)' }}>
                <div style={{ fontSize: '12px', color: 'var(--accent)', marginBottom: '8px', fontWeight: 'bold' }}>2026 VIRAL PREDICTION</div>
                <div style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--foreground)' }}>{result.prediction}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button className="premium-button" onClick={() => setResult(null)} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--card-border)' }}>
              <RefreshCw size={18} /> Test Another Name
            </button>
          </div>
        </div>
      )}

      {/* SEO ARTICLE SECTION */}
      <div style={{ marginTop: '100px', maxWidth: '900px', margin: '100px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl" style={{ borderTop: '1px solid var(--card-border)', paddingTop: '60px' }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ marginBottom: '32px', textAlign: 'center' }}>How Your Name Influences Your Destiny: The Science of Numerology</h2>
          
          <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
            Have you ever wondered why certain people seem naturally lucky, or why your name feels like it carries a specific weight? In the world of <strong>ancient numerology</strong>, every letter in your name corresponds to a vibration and a number. These numbers are not just mathematical symbols; they are energetic signatures that define your personality traits, strengths, and even your potential for success in 2026.
          </p>

          <h3 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>The Pythagorean System: A Mathematical Blueprint</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
            Our AI Lucky Number Finder utilizes the <strong>Pythagorean Numerology System</strong>, one of the most trusted and widely used methods in the world. Developed by the ancient Greek mathematician Pythagoras, this system assigns a numerical value from 1 to 9 to each letter of the alphabet. By calculating the sum of these values in your full birth name and reducing them to a single digit (or a "Master Number" like 11 or 22), we can extract your "Destiny Number."
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', margin: '48px 0' }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h4 style={{ marginTop: 0, color: 'var(--accent)' }}>Calculation Methodology</h4>
              <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: 0 }}>
                We convert each letter of your name using the standard A=1, B=2 logic, sum the results, and reduce them through a recursive process to find your core vibrational frequency.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h4 style={{ marginTop: 0, color: 'var(--success)' }}>AI-Enhanced Accuracy</h4>
              <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: 0 }}>
                While the math is ancient, our interpretation is modern. We use <strong>Google Gemini AI</strong> to analyze your number against current 2026 energy cycles for the most accurate predictions.
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>Why You Should Know Your Lucky Number in 2026</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
            In an era of digital noise and social media trends (like the viral TikTok lucky number videos), understanding your personal numerology gives you a grounding edge. Knowing your lucky day of the week or your power color can help you time important decisions, such as starting a new business, launching a social media channel, or making a significant purchase.
          </p>

          <h3 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>Interpreting Master Numbers: 11, 22, and 33</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
            If your name reduces to 11, 22, or 33, you possess what numerologists call a "Master Number." These numbers are not reduced further because they hold a higher spiritual vibration. They often indicate individuals with a significant mission in life, possessing heightened intuition, leadership qualities, and the ability to manifest their desires more rapidly than others.
          </p>

          <div className="glass-panel" style={{ padding: '40px', margin: '60px 0', textAlign: 'center', borderLeft: '6px solid var(--accent)' }}>
            <h4 style={{ marginTop: 0, fontSize: '24px', color: '#fff' }}>Start Your Journey Today</h4>
            <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
              Your name is the first gift you received. Use our AI-powered tool to decode it and step into your power for 2026.
            </p>
            <button className="premium-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Calculate Another Name</button>
          </div>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/lucky-number" />
    </div>
  );
}
