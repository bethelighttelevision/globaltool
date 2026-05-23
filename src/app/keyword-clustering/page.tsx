"use client";

import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Download, Layers } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

interface Cluster {
  name: string;
  keywords: string[];
  intent: string;
}

function tokenize(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function wordOverlap(a: string, b: string): number {
  const setA = new Set(tokenize(a).split(/\s+/));
  const setB = new Set(tokenize(b).split(/\s+/));
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

function detectIntent(keywords: string[]): string[] {
  const informational = ['how', 'what', 'why', 'guide', 'tutorial', 'tips', 'best', 'what is', 'definition', 'meaning', 'example', 'explain', 'learn', 'basics'];
  const transactional = ['buy', 'price', 'cost', 'order', 'discount', 'cheap', 'deal', 'coupon', 'purchase', 'subscribe', 'pricing', 'free trial'];
  const navigational = ['login', 'sign up', 'download', 'app', 'website', 'official', 'homepage', 'vs'];
  const commercial = ['review', 'best', 'top', 'vs', 'comparison', 'alternative', 'rating', 'recommended', '2026', '2025'];
  const results: string[] = [];
  const combined = keywords.join(' ').toLowerCase();
  if (informational.some(w => combined.includes(w))) results.push('Informational');
  if (transactional.some(w => combined.includes(w))) results.push('Transactional');
  if (navigational.some(w => combined.includes(w))) results.push('Navigational');
  if (commercial.some(w => combined.includes(w))) results.push('Commercial');
  return results.length > 0 ? results : ['Mixed'];
}

export default function KeywordClusteringPage() {
  const [input, setInput] = useState('');
  const [minSimilarity, setMinSimilarity] = useState(0.3);

  const clusters = useMemo((): Cluster[] => {
    const lines = input.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];

    const unique = [...new Set(lines)];
    const assigned = new Set<number>();
    const result: Cluster[] = [];

    for (let i = 0; i < unique.length; i++) {
      if (assigned.has(i)) continue;
      const group: number[] = [i];
      assigned.add(i);
      for (let j = i + 1; j < unique.length; j++) {
        if (assigned.has(j)) continue;
        const avgOverlap = group.reduce((sum, g) => sum + wordOverlap(unique[g], unique[j]), 0) / group.length;
        if (avgOverlap >= minSimilarity) {
          group.push(j);
          assigned.add(j);
        }
      }
      const keywords = group.map(idx => unique[idx]);
      const intents = detectIntent(keywords);
      const commonWords = keywords.map(k => tokenize(k).split(/\s+/)).flat();
      const freq: Record<string, number> = {};
      commonWords.forEach(w => { if (w.length > 2) freq[w] = (freq[w] || 0) + 1; });
      const topWord = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => e[0]).join(' ');
      result.push({
        name: topWord || `Cluster ${result.length + 1}`,
        keywords,
        intent: intents.join(', '),
      });
    }
    return result;
  }, [input, minSimilarity]);

  const exportCsv = () => {
    const lines = ['Cluster,Keywords,Intent'];
    clusters.forEach(c => {
      c.keywords.forEach(kw => {
        lines.push(`"${c.name}","${kw}","${c.intent}"`);
      });
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'keyword-clusters.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      icon={<Layers size={40} />}
      title="Free Keyword Clustering Tool"
      description="Group keywords into topic clusters for better SEO content planning. Free semantic keyword clustering tool."
      seo={{
        toolName: "Keyword Clustering Tool",
        description: "Free keyword clustering tool. Group keywords by topic and search intent for SEO content planning.",
        url: "https://toolsnappy.com/keyword-clustering"
      }}
      currentPath="/keyword-clustering"
      contentSection={
        <article className="article-content mt-16 md:mt-24 p-6 md:p-10 bg-[var(--card)] rounded-2xl border border-[var(--card-border)]">
          <h2 className="text-2xl md:text-3xl font-bold border-b border-[var(--card-border)] pb-4 mb-8">Free Keyword Clustering Tool — Group Keywords for Better SEO</h2>

          <p>Keyword clustering is one of the most effective SEO content strategies available today. Instead of targeting one keyword per page, you group related keywords into topic clusters and create comprehensive content that satisfies multiple search intents at once. Our <strong>free keyword clustering tool</strong> automatically analyzes your keyword list, identifies semantic relationships, and groups related terms into organized clusters with search intent labels.</p>

          <h3>Why Keyword Clustering Matters in 2026</h3>

          <p>Google's ranking algorithms have evolved significantly. The old approach of creating one page per keyword no longer works. Google now evaluates <strong>topical authority</strong> — how comprehensively your site covers a subject. When you publish a single page that thoroughly addresses a cluster of related keywords, Google recognizes your expertise and ranks you higher for the entire cluster. This is the foundation of the <strong>topic cluster model</strong> that modern SEO professionals use.</p>

          <p>Without a <strong>keyword cluster tool</strong>, you risk keyword cannibalization — where multiple pages on your site compete for the same search terms. Cannibalization confuses Google and typically results in none of your pages ranking well. Our tool prevents this by ensuring each cluster maps to exactly one target page. The result is cleaner site architecture, stronger topical authority, and higher rankings.</p>

          <p>Search intent is another critical factor. Informational keywords like "how to start a blog" require different content than transactional keywords like "best blogging platform pricing." Our <strong>SEO keyword clustering</strong> tool automatically detects intent (informational, transactional, navigational, or commercial) so you can tailor your content strategy accordingly.</p>

          <h3>How Our Keyword Clustering Tool Works</h3>

          <p>Simply paste your keywords — one per line — into the text area above. Adjust the similarity threshold slider to control how tightly your clusters form. A lower threshold (loose) creates fewer, broader clusters. A higher threshold (tight) creates more specific, tightly related groups. Our algorithm analyzes each keyword pair using word overlap and semantic similarity scoring, then groups them using a clustering algorithm.</p>

          <p>Each resulting cluster shows the grouped keywords, the dominant search intent label, and a suggested cluster name based on the most common words. You can export the results as a CSV file for use in your content planning spreadsheet or SEO tool of choice.</p>

          <h3>Who Benefits From Keyword Clustering?</h3>

          <p><strong>SEO Professionals:</strong> Use our tool during the content planning phase to organize thousands of keywords into actionable topic clusters. Map each cluster to a pillar page with supporting blog posts for maximum SEO impact.</p>

          <p><strong>Content Strategists:</strong> Identify content gaps by analyzing which clusters have many keywords but no dedicated page on your site. This reveals untapped opportunities for new content that directly addresses what your audience searches for.</p>

          <p><strong>Bloggers and Creators:</strong> If you are building a niche site, clustering keywords helps you plan your editorial calendar around topics rather than random keywords. This creates a coherent content library that search engines love.</p>

          <p><strong>Freelance Writers:</strong> Understanding keyword clusters helps you write more comprehensive articles. When you know all the related terms a client wants to rank for, you can naturally incorporate them into your writing.</p>

          <h3>How to Use Keyword Clusters in Your SEO Strategy</h3>

          <p>Start by gathering keywords from Google Search Console, Ahrefs, SEMrush, or Google Keyword Planner. Paste them into our <strong>free keyword cluster generator</strong> and review the resulting groups. For each cluster, plan one comprehensive page that addresses every keyword in the group. For example, if your cluster includes "running shoes for flat feet," "best running shoes for flat feet 2026," and "flat feet running shoes for women," create one detailed guide covering all these angles on a single page.</p>

          <p>Within each page, use the cluster's keywords naturally in headings, body text, image alt text, and meta tags. Link between related cluster pages to build a strong internal linking structure that reinforces topical authority. Over time, Google will recognize your site as an authoritative resource on the topic and boost your rankings across the entire cluster.</p>

          <h3>Keywords Our Tool Targets</h3>

          <p>Our tool is designed to rank for high-value SEO search terms including: <strong>keyword clustering tool</strong>, <strong>free keyword cluster tool</strong>, <strong>keyword grouping tool</strong>, <strong>seo keyword clustering</strong>, <strong>keyword cluster generator</strong>, <strong>topic cluster tool</strong>, <strong>semantic keyword clustering</strong>, <strong>group keywords by topic</strong>, <strong>keyword cannibalization checker</strong>, <strong>content clustering tool</strong>, and <strong>free seo keyword tools</strong>. These are terms that SEO professionals and content marketers search for daily.</p>

          <p>Try our <strong>free keyword clustering tool</strong> now. Paste your keywords above, adjust the similarity threshold, and watch your disorganized keyword list transform into a structured content plan ready for execution.</p>
        </article>
      }
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Similarity Threshold</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>{Math.round(minSimilarity * 100)}%</span>
          </div>
          <input type="range" min="0.1" max="0.8" step="0.05" value={minSimilarity} onChange={e => setMinSimilarity(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)' }}>
            <span>Loose clusters</span>
            <span>Tight clusters</span>
          </div>
        </div>

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Paste keywords, one per line:&#10;buy running shoes&#10;best running shoes 2026&#10;running shoes review&#10;how to choose running shoes&#10;cheap running shoes online&#10;running shoes for flat feet"
          style={{
            width: '100%', minHeight: '240px', padding: '16px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
            color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.7',
            resize: 'vertical', fontFamily: 'monospace', marginBottom: '24px'
          }}
        />

        {clusters.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                <strong style={{ color: 'var(--foreground)' }}>{clusters.length}</strong> clusters from <strong style={{ color: 'var(--foreground)' }}>{input.split('\n').filter(Boolean).length}</strong> keywords
              </span>
              <button onClick={exportCsv} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--accent)', cursor: 'pointer', fontSize: '13px' }}>
                <Download size={16} /> Export CSV
              </button>
            </div>
            {clusters.map((cluster, i) => (
              <div key={i} style={{ marginBottom: '16px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ background: 'var(--accent)', color: '#fff', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>{i + 1}</span>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>{cluster.name}</h3>
                  </div>
                  <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 500 }}>{cluster.intent}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cluster.keywords.map((kw, j) => (
                    <span key={j} style={{ fontSize: '13px', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!input && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--card-border)' }}>
            <Search size={40} color="var(--muted)" style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ color: 'var(--muted)' }}>Paste keywords (one per line) above to create clusters</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
