"use client";

import React, { useState, useEffect } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Sparkles, TrendingUp, Hash, MessageSquare, Copy, Check, ChevronDown, ChevronUp, Film, Zap, Eye, Loader2, BarChart3 } from 'lucide-react';

interface ShortsIdea {
  title: string; hook: string; script: string; hashtags: string[];
  thumbnailText: string; viralScore: number; format: string;
}

const STORAGE_KEY = 'shorts-ideas-count';
const MAX_FREE = 3;

const formatColorMap: Record<string, string> = {
  Educational: '#0071e3', Storytelling: '#ff9f0a', Comparison: '#32d74b',
  Listicle: '#ff3b30', Challenge: '#ff6b6b', 'Mistake/Fix': '#ffcc00',
  'Behind the Scenes': '#818cf8', React: '#ff69b4', Transformation: '#32d74b', Debunk: '#ff3b30',
};

function ScoreRing({ score }: { score: number }) {
  const color = score >= 8 ? '#32d74b' : score >= 6 ? '#ffcc00' : '#ff3b30';
  const deg = score * 36;
  return (
    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'conic-gradient(' + color + ' ' + deg + 'deg, rgba(255,255,255,0.06) ' + deg + 'deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color }}>
      {score}
    </div>
  );
}

function CopyBtn({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      style={{ background: copied ? 'rgba(50,215,75,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid ' + (copied ? 'rgba(50,215,75,0.3)' : 'rgba(255,255,255,0.1)'), color: copied ? '#32d74b' : 'var(--muted)', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : (label || 'Copy')}
    </button>
  );
}

function IdeaCard({ idea, index }: { idea: ShortsIdea; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const fColor = formatColorMap[idea.format] || '#0071e3';

  return (
    <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(0,113,227,0.1)', color: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>{index + 1}</div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.3 }}>{idea.title}</h3>
            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: fColor + '15', color: fColor, fontWeight: 500, display: 'inline-block', marginTop: '6px' }}>{idea.format}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <TrendingUp size={14} color={idea.viralScore >= 8 ? '#32d74b' : idea.viralScore >= 6 ? '#ffcc00' : '#ff3b30'} />
          <ScoreRing score={idea.viralScore} />
        </div>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Zap size={12} color="#ffcc00" />
          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hook</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <p style={{ color: 'var(--muted-light)', fontSize: '13px', lineHeight: 1.5, margin: 0, flex: 1 }}>"{idea.hook}"</p>
          <CopyBtn text={idea.hook} label="Hook" />
        </div>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={12} color="#0071e3" />
            <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Script</span>
          </div>
          <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', padding: '2px 6px', borderRadius: '4px' }}>
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expanded ? 'Collapse' : 'Read'}
          </button>
        </div>
        {expanded && (
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '12px 14px', marginTop: '4px' }}>
            <p style={{ color: 'var(--muted-light)', fontSize: '13px', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{idea.script}</p>
            <div style={{ marginTop: '8px' }}><CopyBtn text={idea.script} label="Copy Script" /></div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <Hash size={12} color="#32d74b" />
          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hashtags</span>
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
          {idea.hashtags.map((t, i) => (
            <span key={i} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(50,215,75,0.1)', color: '#32d74b' }}>#{t}</span>
          ))}
          <CopyBtn text={idea.hashtags.map(h => '#' + h).join(' ')} label="Copy All" />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Eye size={12} color="#ff9f0a" />
        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Thumbnail:</span>
        <span style={{ fontSize: '12px', color: '#ff9f0a', fontWeight: 600 }}>{idea.thumbnailText}</span>
        <CopyBtn text={idea.thumbnailText} label="Copy" />
      </div>
    </div>
  );
}

export default function ShortsIdeasPage() {
  const [niche, setNiche] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<{ niche: string; ideas: ShortsIdea[] } | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [count, setCount] = useState(0);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    setCount(stored);
    if (stored >= MAX_FREE) setShowEmail(true);
    const saved = localStorage.getItem('shorts-last-ideas');
    if (saved) {
      try { setResults(JSON.parse(saved)); } catch {}
    }
  }, []);

  const increment = () => {
    const next = count + 1;
    setCount(next);
    localStorage.setItem(STORAGE_KEY, String(next));
    if (next >= MAX_FREE) setShowEmail(true);
  };

  const handleGenerate = async () => {
    if (!niche.trim()) { setError('Please enter a niche or topic'); return; }
    if (count >= MAX_FREE) { setShowEmail(true); setError('Free limit reached. Enter your email to continue.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/shorts-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: niche.trim(), channelUrl: channelUrl.trim() || undefined }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate ideas.');
      }
      const data = await res.json();
      setResults(data);
      localStorage.setItem('shorts-last-ideas', JSON.stringify(data));
      increment();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate ideas.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tool: 'shorts-ideas' }) });
    } catch {}
    setEmailSent(true);
    localStorage.setItem(STORAGE_KEY, '0');
    setCount(0);
    setShowEmail(false);
  };

  const remaining = MAX_FREE - count;

  return (
    <ToolLayout
      icon={<Film size={44} />}
      title="Shorts Ideas Generator"
      description="Generate 10 viral YouTube Shorts ideas with ready-to-use hooks, scripts, hashtags, and thumbnail text. Free AI tool for creators."
      seo={{
        toolName: 'YouTube Shorts Ideas Generator',
        description: 'Generate 10 viral YouTube Shorts ideas with hooks, scripts, hashtags, and thumbnail text. Free AI tool for creators who want to grow faster.',
        url: 'https://toolsnappy.com/shorts-ideas',
      }}
      currentPath="/shorts-ideas"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Stop Wasting Time Thinking of Shorts Ideas</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            The hardest part of growing a YouTube channel is consistently coming up with fresh Shorts ideas that actually get views. Our <strong>Shorts Ideas Generator</strong> uses AI to analyze your niche and generate 10 complete, ready-to-film video ideas in seconds. Each idea includes a scroll-stopping hook, a full 60-second script optimized for retention, relevant hashtags, and thumbnail text suggestions. Stop guessing what will work and start posting content that grows your channel.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Shorts Ideas Matter More Than Ever</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            YouTube Shorts now drive over 200 billion daily views. The algorithm rewards creators who post consistently with high-retention content. But coming up with fresh ideas every day is the biggest challenge most creators face. Our tool eliminates the blank page problem by giving you 10 proven Shorts formats tailored to your exact niche. Whether you are in tech, fitness, business, cooking, gaming, or any other niche, you will get ideas that match your content style and audience expectations.
          </p>
          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Science Behind Viral Shorts</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Every idea generated follows proven retention psychology: hooks that create curiosity gaps, scripts that deliver value fast, and formats that encourage replays and shares. The viral score helps you prioritize which ideas to film first. Consistent posting with strong hooks is the single fastest path to YouTube growth in 2026.
          </p>
        </article>
      }
      results={results && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>Your Shorts Ideas</h3>
              <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '4px 0 0 0' }}>Niche: {results.niche}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button className="premium-button" onClick={() => { const allIdeas = results.ideas.map((idea, i) => 'IDEA ' + (i + 1) + ': ' + idea.title + '\nHook: ' + idea.hook + '\n\nScript:\n' + idea.script + '\n\nHashtags: ' + idea.hashtags.map(h => '#' + h).join(' ') + '\nThumbnail: ' + idea.thumbnailText + '\n---').join('\n\n'); navigator.clipboard.writeText(allIdeas); }} style={{ padding: '8px 14px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.06)' }}>
                <Copy size={12} /> Copy All Ideas
              </button>
              <button className="premium-button" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ padding: '8px 14px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> New Ideas
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {results.ideas.map((idea, i) => <IdeaCard key={i} idea={idea} index={i} />)}
          </div>
        </div>
      )}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          {showEmail && !emailSent ? (
            <div style={{ textAlign: 'center' }}>
              <BarChart3 size={32} color="#0071e3" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', color: '#fff', margin: '0 0 8px 0' }}>Want More Ideas?</h3>
              <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '16px' }}>You have used all {MAX_FREE} free generations. Enter your email to get 3 more free ideas and early access to our paid plan.</p>
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
                <input type="email" className="input-field" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1 }} />
                <button type="submit" className="premium-button" style={{ whiteSpace: 'nowrap' }}>Get 3 More</button>
              </form>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '12px', textAlign: 'center' }}>
                {remaining > 0 ? (remaining + ' free generation' + (remaining !== 1 ? 's' : '') + ' remaining') : 'All free generations used'}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input type="text" className="input-field" placeholder="Your niche (e.g., budget cooking, tech reviews, fitness tips)" value={niche}
                  onChange={(e) => setNiche(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  style={{ flex: 1, minWidth: '240px' }} />
                <input type="text" className="input-field" placeholder="YouTube channel URL (optional)" value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  style={{ flex: 1, minWidth: '200px' }} />
                <button className="premium-button" onClick={handleGenerate} disabled={loading || count >= MAX_FREE}
                  style={{ minWidth: '140px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
                  {loading ? 'Generating...' : 'Generate Ideas'}
                </button>
              </div>
              {error && <p style={{ color: '#ff3b30', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
            </>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
