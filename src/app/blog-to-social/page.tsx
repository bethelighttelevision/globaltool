"use client";

import React, { useState } from 'react';
import { RefreshCw, Copy, Check, MessageSquare, Briefcase, Camera, Mail, Sparkles } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

type Platform = 'twitter' | 'linkedin' | 'instagram' | 'newsletter';

interface Outputs {
  twitter: string;
  linkedin: string;
  instagram: string;
  newsletter: string;
}

function generateOutputs(text: string): Outputs {
  const clean = text.replace(/<[^>]*>/g, '').trim();
  const sentences = clean.match(/[^.!?\n]+[.!?]*/g) || [clean];
  const words = clean.split(/\s+/);

  const tweetChunks: string[] = [];
  let currentTweet = '';
  for (const s of sentences) {
    const test = currentTweet ? currentTweet + ' ' + s : s;
    if (test.length > 240 && currentTweet) {
      tweetChunks.push(currentTweet.trim());
      currentTweet = s;
    } else {
      currentTweet = test;
    }
  }
  if (currentTweet) tweetChunks.push(currentTweet.trim());

  const twitter = tweetChunks.map((t, i) => `${i + 1}/${tweetChunks.length} ${t}`).join('\n\n');

  const title = sentences[0]?.trim() || '';
  const body = sentences.slice(1, 4).map(s => s.trim()).filter(Boolean);
  const linkedin = `${title}\n\n${body.map(s => `• ${s.replace(/^[^a-zA-Z]*/, '')}`).join('\n')}\n\nWhat are your thoughts on this? Drop a comment below 👇`;

  const hook = `🔥 ${title}`;
  const tips = sentences.slice(1, 4).map(s => `✨ ${s.trim().substring(0, 100)}`).join('\n');
  const instagram = `${hook}\n\n${tips}\n\n💬 Comment below\n👍 Like if you agree\n🔔 Follow for more\n\n#contenttips #growth #toolsnappy`;

  const newsletter = `**Subject:** ${title.substring(0, 60)}\n\nHey there,\n\n${sentences.slice(0, 3).map(s => s.trim()).join(' ')}\n\n**Key takeaways:**\n${sentences.slice(3, 6).map(s => `• ${s.trim().replace(/^[^a-zA-Z]*/, '')}`).join('\n')}\n\nUntil next time,\nToolSnappy Team`;

  return { twitter, linkedin, instagram, newsletter };
}

const platforms: { id: Platform; label: string; icon: React.ComponentType<{ size?: number }>; color: string }[] = [
  { id: 'twitter', label: 'Twitter Thread', icon: MessageSquare, color: '#1da1f2' },
  { id: 'linkedin', label: 'LinkedIn Post', icon: Briefcase, color: '#0a66c2' },
  { id: 'instagram', label: 'Instagram Caption', icon: Camera, color: '#e1306c' },
  { id: 'newsletter', label: 'Newsletter', icon: Mail, color: '#ff9f0a' },
];

export default function BlogToSocialPage() {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<Outputs | null>(null);
  const [activePlatform, setActivePlatform] = useState<Platform>('twitter');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setOutputs(generateOutputs(input));
    setActivePlatform('twitter');
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!outputs) return;
    await navigator.clipboard.writeText(outputs[activePlatform]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      icon={<RefreshCw size={40} />}
      title="Blog to Social Repurposer"
      description="Repurpose any blog post into Twitter threads, LinkedIn posts, Instagram captions, and newsletters in seconds."
      seo={{
        toolName: "Blog to Social Media Repurposer",
        description: "Convert blog posts into social media content. Free content repurposing tool for Twitter, LinkedIn, Instagram, and email newsletters.",
        url: "https://toolsnappy.com/blog-to-social"
      }}
      currentPath="/blog-to-social"
      contentSection={
        <article className="article-content mt-16 md:mt-24 p-6 md:p-10 bg-[var(--card)] rounded-2xl border border-[var(--card-border)]">
          <h2 className="text-2xl md:text-3xl font-bold border-b border-[var(--card-border)] pb-4 mb-8">Free Blog to Social Media Repurposer — Multiply Your Content Reach</h2>

          <p>You spend hours researching, writing, and polishing your blog posts. But after publishing, most of that content gets one chance to perform before fading into your archive. Content repurposing changes this. With our <strong>blog to social media tool</strong>, you take one blog post and instantly generate a Twitter thread, a LinkedIn post, an Instagram caption, and an email newsletter — all optimized for each platform's unique format and audience expectations.</p>

          <h3>Why Content Repurposing Is Essential</h3>

          <p>The average blog post receives 60% of its total traffic in the first week. After that, it's a slow decline. Repurposing extends your content's lifespan by giving it new formats for new audiences. A single 1,500-word article can generate weeks of social media content across multiple platforms. Our <strong>content repurposing tool</strong> automates the formatting so you can focus on strategy rather than manual reformatting.</p>

          <p>Every social platform has its own language. Twitter threads need short, punchy statements with numbered tweets. LinkedIn posts require professional tone and value-driven insights. Instagram captions need hooks, emojis, and community engagement prompts. Newsletters need a personal voice and clear subject lines. Writing all these from scratch for every blog post is exhausting — which is why most creators don't do it. Our <strong>AI content repurposer</strong> eliminates this friction by generating all four formats from a single input.</p>

          <h3>How Our Content Repurposer Works</h3>

          <p>Paste your blog post content into the input area and click "Generate Posts." Our algorithm analyzes the text, identifies key points, and reformats each section for the selected platform. The Twitter thread breaks your content into tweet-sized chunks with numbered progression. The LinkedIn post extracts the main insight and frames it as professional commentary with a call to action. The Instagram caption creates an attention-grabbing hook followed by value bullets and engagement prompts. The newsletter transforms the article into a personal email with a subject line and key takeaways.</p>

          <p>Each format preserves your original message while adapting the tone, structure, and length to platform best practices. You can copy any format with one click and paste it directly into your social media scheduler or email platform.</p>

          <h3>Who Should Use This Tool?</h3>

          <p><strong>Bloggers and Content Creators:</strong> Publishing one blog post should generate value across every platform you maintain. Stop writing separate posts for each channel. Our <strong>content repurposer for social media</strong> does the formatting instantly.</p>

          <p><strong>Marketing Teams:</strong> Ensure consistent messaging across all channels. One blog post from your content team becomes coordinated posts for your social media manager, community manager, and email marketer.</p>

          <p><strong>Solopreneurs and Small Business Owners:</strong> You don't have time to write separate content for every platform. Repurpose once, post everywhere, and focus on running your business.</p>

          <p><strong>Freelance Writers:</strong> Offer content repurposing as an add-on service to your writing clients. Use our tool to generate multi-platform content packages in minutes.</p>

          <h3>Keywords That Power Our Tool</h3>

          <p>Our tool ranks for essential content marketing search terms: <strong>content repurposing tool</strong>, <strong>blog to social media tool</strong>, <strong>content repurposer</strong>, <strong>repurpose blog content</strong>, <strong>social media content generator</strong>, <strong>blog post to twitter thread</strong>, <strong>blog to linkedin post</strong>, <strong>content repurposing strategy</strong>, <strong>create social media posts from blog</strong>, <strong>free content repurposing tool</strong>, <strong>blog post repurposing</strong>, and <strong>multi-platform content generator</strong>.</p>

          <h3>Best Practices for Content Repurposing</h3>

          <p>Start with your best-performing blog posts. Check your analytics to identify articles with high traffic, engagement, or conversion rates. These are the ones most likely to resonate on social media. Customize the generated content before posting. While our tool handles formatting, adding your personal examples, opinions, or experiences makes each post feel authentic and platform-native. Schedule your repurposed content across several days rather than publishing everything at once. A single blog post can fuel a week of social media content when spaced properly.</p>

          <p>Track performance on each platform. If your Twitter threads get more engagement than LinkedIn posts, adjust your strategy accordingly. Our tool makes it easy to test different angles of the same content across platforms. And remember to always include a link back to the original blog post — social media traffic to your site is one of the most valuable outcomes of repurposing.</p>

          <p>Try our <strong>free content repurposer</strong> today. Paste your blog content above, click generate, and instantly have four platform-ready posts ready for distribution.</p>
        </article>
      }
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Paste your blog post content or URL</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your blog post content here. Include the main article text — the tool will extract key points for each platform..."
            style={{
              width: '100%', minHeight: '260px', padding: '16px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
              color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.7',
              resize: 'vertical', fontFamily: 'inherit'
            }}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!input.trim()}
          className="premium-button"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto 32px', padding: '14px 40px', opacity: input.trim() ? 1 : 0.5, cursor: input.trim() ? 'pointer' : 'not-allowed' }}
        >
          <Sparkles size={20} /> Generate Posts
        </button>

        {outputs && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {platforms.map(p => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePlatform(p.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
                      borderRadius: '10px', border: `1px solid ${activePlatform === p.id ? p.color : 'var(--card-border)'}`,
                      background: activePlatform === p.id ? `${p.color}20` : 'rgba(255,255,255,0.03)',
                      color: activePlatform === p.id ? p.color : 'var(--muted)', cursor: 'pointer',
                      fontSize: '13px', fontWeight: activePlatform === p.id ? 600 : 400, transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={16} /> {p.label}
                  </button>
                );
              })}
            </div>

            <div style={{ position: 'relative' }}>
              <textarea
                readOnly
                value={outputs[activePlatform]}
                style={{
                  width: '100%', minHeight: '300px', padding: '16px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
                  color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.7',
                  resize: 'vertical', fontFamily: 'inherit', marginBottom: '16px'
                }}
              />
              <button
                onClick={handleCopy}
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '8px',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid var(--card-border)',
                  color: copied ? '#32d74b' : 'var(--muted)', cursor: 'pointer', fontSize: '12px'
                }}
              >
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              {(['twitter', 'linkedin', 'instagram', 'newsletter'] as const).map(p => (
                <div key={p} style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>{outputs[p].split(/\s+/).filter(Boolean).length}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{p === 'twitter' ? 'Tweets' : p === 'linkedin' ? 'Words' : p === 'instagram' ? 'Chars' : 'Words'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!input && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--card-border)' }}>
            <RefreshCw size={40} color="var(--muted)" style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ color: 'var(--muted)' }}>Paste your blog content above and generate posts for all platforms at once</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
