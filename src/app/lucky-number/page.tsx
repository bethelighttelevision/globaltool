"use client";

import React, { useState } from 'react';
import { Sparkles, Moon, Sun, RefreshCw } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
export default function LuckyNumberPage() {

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ number: number; analysis: string; color: string; day: string; prediction: string } | null>(null);

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

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error('Failed to generate.');
      const { text: response }: { text: string } = await res.json();

      let aiData;
      try {
        let cleanJson = response.trim();
        const firstBrace = cleanJson.indexOf('{');
        const lastBrace = cleanJson.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
        }
        aiData = JSON.parse(cleanJson);
      } catch {
        console.warn("JSON parsing failed, attempting fallback manual parsing:");
        const lines = response.split('\n').map(l => l.trim()).filter(Boolean);
        let analysis = "";
        let color = "Gold";
        let day = "Sunday";
        let prediction = "";

        for (const line of lines) {
          const lower = line.toLowerCase();
          const cleanLine = line.replace(/^[\d\.\-\*\s]+/, '').replace(/^["']|["']$/g, '').trim();
          if (lower.includes('color')) {
            color = cleanLine.replace(/.*color\s*:\s*/i, '').replace(/["',}]/g, '').trim();
          } else if (lower.includes('day')) {
            day = cleanLine.replace(/.*day\s*:\s*/i, '').replace(/["',}]/g, '').trim();
          } else if (lower.includes('prediction') || lower.includes('tiktok')) {
            prediction = cleanLine.replace(/.*prediction\s*:\s*/i, '').replace(/.*predict\s*:\s*/i, '').replace(/["',}]/g, '').trim();
          } else if (cleanLine.length > 20 && !cleanLine.startsWith('{') && !cleanLine.startsWith('}')) {
            analysis += (analysis ? " " : "") + cleanLine;
          }
        }

        aiData = {
          analysis: analysis || `You possess a powerful destiny under number ${destinyNumber}, driving you towards massive success, strong relationships, and self-belief.`,
          color: color || "Gold",
          day: day || "Sunday",
          prediction: prediction || "Your 2026 is scheduled to be a year of breakthroughs, viral potential, and finding your true alignment!"
        };
      }

      setResult({
        number: destinyNumber,
        ...aiData
      });
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "The stars are misaligned. Please check your API key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      icon={<Sparkles size={48} strokeWidth={1.5} />}
      title="AI Lucky Number Finder"
      description="Enter your name and discover your personalized number based on name-to-number mapping. A fun personality insight tool for entertainment purposes."
      seo={{
        toolName: "AI Lucky Number Finder - Numerology Calculator",
        description: "Find your lucky number by name using AI and ancient numerology. Get personality insights, lucky colors, and 2026 predictions instantly.",
        url: "https://toolsnappy.com/lucky-number"
      }}
      currentPath="/lucky-number"
      results={result && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Main Result */}
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', border: '1px solid rgba(168, 199, 250, 0.3)', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}>
              <div style={{ fontSize: '14px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Your Number</div>
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
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>SUGGESTED COLOR</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{result.color}</div>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sun size={24} color="#ffcc00" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>RECOMMENDED DAY</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{result.day}</div>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent)' }}>
                <div style={{ fontSize: '12px', color: 'var(--accent)', marginBottom: '8px', fontWeight: 'bold' }}>AI GENERATED INSIGHT</div>
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
      contentSection={
        <div style={{ maxWidth: '900px', margin: '100px auto 0' }}>
          <article className="prose prose-invert lg:prose-xl" style={{ borderTop: '1px solid var(--card-border)', paddingTop: '60px' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ marginBottom: '32px', textAlign: 'center' }}>How Name-to-Number Mapping Works: A Fun Look at Numerology</h2>

            <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
              Have you ever wondered if your name holds hidden patterns? In numerology, each letter of the alphabet is assigned a number value. This system creates interesting patterns that many people enjoy exploring as a fun personality insight tool. Our AI-powered generator applies these classic letter-to-number mappings to produce your unique number. While numerology has ancient roots dating back to the Greek mathematician Pythagoras, modern versions of this practice are used primarily as a form of entertainment and personal reflection rather than as a predictive science. The appeal lies in the way patterns emerge from mathematical calculations applied to something as personal as your name, creating a unique result that feels tailored specifically to you.
            </p>

            <h3 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>The Pythagorean Letter-Number System</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
              Our tool uses the Pythagorean system, which assigns numerical values from 1 to 9 to each letter of the alphabet. By calculating the sum of these values in your name and reducing them to a single digit (or a Master Number like 11 or 22), we generate a unique number associated with your name. This is a mathematical pattern-mapping exercise, not a fortune or prediction. The Pythagorean system is named after the ancient Greek philosopher who believed that numbers were the ultimate reality and that mathematical relationships governed the universe. While modern science does not support the predictive claims of numerology, the process of calculating your name number can be a fun and thought-provoking exercise that encourages you to think about your personality traits and life patterns from a different perspective.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', margin: '48px 0' }}>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h4 style={{ marginTop: 0, color: 'var(--accent)' }}>Calculation Method</h4>
                <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: 0 }}>
                  We convert each letter of your name using the standard A=1, B=2 mapping, sum the results, and reduce them to find your core number. Each letter corresponds to a specific value between 1 and 9 based on its position in the alphabet.
                </p>
              </div>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h4 style={{ marginTop: 0, color: 'var(--success)' }}>AI-Powered Interpretation</h4>
                <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: 0 }}>
                  While the math is well-established, our AI generates a personalized interpretation based on your name pattern for entertainment purposes. The analysis draws on traditional numerology associations to create meaningful and fun insights.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>Why People Enjoy Number-Based Personality Insights</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
              In an era of digital noise and trending social media content, number-based personality tools have gone viral as a fun way to reflect on personal traits. Knowing your suggested color or recommended day of the week can be a lighthearted starting point for self-reflection. The psychology behind this appeal is rooted in what researchers call the Barnum effect, where people tend to accept vague, general personality descriptions as uniquely applicable to themselves. This is the same phenomenon that makes horoscopes and personality quizzes so engaging and shareable on social media platforms. When you receive a personalized number and analysis, it feels meaningful because it was generated specifically from your name, even though the underlying system applies the same mathematical rules to everyone.
            </p>

            <h3 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>Understanding Master Numbers: 11, 22, and 33</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
              If your name reduces to 11, 22, or 33, you have what numerologists call a Master Number. These numbers are not reduced further and are considered significant in numerology. Many people with these numbers enjoy exploring the unique traits associated with them. In numerology tradition, Master Number 11 is associated with intuition, inspiration, and spiritual insight. Master Number 22 is called the Master Builder, representing the ability to turn dreams into reality through practical action. Master Number 33 is known as the Master Teacher, combining the qualities of both 11 and 22 with an emphasis on compassion and service to others. While these associations are purely symbolic and not scientifically validated, they can provide an entertaining framework for thinking about your personal strengths and growth areas. People who discover they have a Master Number often feel a special connection to the characteristics associated with it.
            </p>

            <h3 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>How Different Cultures Use Number Symbolism</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
              Number symbolism and name analysis are not unique to Western numerology traditions. In Chinese culture, certain numbers are considered auspicious or inauspicious based on their phonetic similarity to words with positive or negative meanings. The number 8 is considered extremely lucky because it sounds like the word for prosperity, while the number 4 is often avoided because it sounds like the word for death. In Japanese culture, the number 7 is considered lucky, and the number 9 is associated with longevity. In Indian Vedic numerology, similar letter-to-number mapping systems exist with different assignments than the Pythagorean system. These cross-cultural traditions highlight how number symbolism is a universal human tendency to find meaning and pattern in numerical relationships, a practice that spans continents and millennia. Our tool focuses on the Western Pythagorean system, but the broader phenomenon of finding personal meaning in numbers is a global one.
            </p>

            <h3 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>Using Number Insights for Personal Reflection</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.9', fontSize: '18px', marginBottom: '32px' }}>
              Even when approached purely as entertainment, number-based personality insights can serve as a useful tool for personal reflection. The analysis generated by our tool might describe leadership qualities, creative tendencies, or analytical strengths that resonate with you. If the description feels accurate, it can reinforce your self-awareness and confidence in those traits. If it does not resonate, it can still be an interesting conversation starter or a fun way to pass the time with friends. Many people enjoy comparing their lucky numbers with family members, coworkers, or social media followers, creating a shared experience around the results. The key is to approach the tool with a sense of curiosity and playfulness rather than expecting it to provide serious guidance or life direction.
            </p>

            <div className="glass-panel" style={{ padding: '40px', margin: '60px 0', textAlign: 'center', borderLeft: '6px solid var(--accent)' }}>
              <h4 style={{ marginTop: 0, fontSize: '24px', color: '#fff' }}>Try It For Fun</h4>
              <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
                Your name is unique. Use our tool to see what number pattern it creates. For entertainment purposes only. Share your results with friends and see how your numbers compare.
              </p>
              <button className="premium-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Try Another Name</button>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', fontStyle: 'italic' }}>
              Disclaimer: This tool is for entertainment and novelty purposes only. The results are based on name-to-number mapping and should not be considered as financial, legal, or life advice. Numerology is not a science and should not be used as a basis for making important life decisions.
            </p>
          </article>
        </div>
      }
    >
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
          {isLoading ? 'Calculating...' : 'Generate My Number'}
        </button>
      </div>
    </ToolLayout>
  );
}

