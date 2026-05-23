"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Image, Sparkles, Loader2, BarChart3, TrendingUp, Lightbulb, CheckCircle2 } from 'lucide-react';
import { analyzeThumbnail } from '../actions/youtube';
interface ScoreDetail {
  score: number;
}

interface FaceDetection extends ScoreDetail {
  hasFace: boolean;
}

interface ThumbnailAnalysis {
  overallScore: number;
  composition: ScoreDetail;
  colors: ScoreDetail;
  textReadability: ScoreDetail;
  emotionalAppeal: ScoreDetail;
  faceDetection: FaceDetection;
  ctrEstimate: string;
  improvements: string[];
  bestPractices: string[];
}

interface ThumbnailAnalysisResult {
  thumbnailUrl: string;
  videoId: string;
  analysis: ThumbnailAnalysis;
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 8 ? '#32d74b' : score >= 6 ? '#ffcc00' : '#ff3b30';
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '2px' }}>
        <span style={{ color: 'var(--muted)' }}>{label}</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>{score}/10</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${score * 10}%`, background: color, borderRadius: '3px' }} />
      </div>
    </div>
  );
}

export default function YoutubeThumbnailAnalyzerPage() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ThumbnailAnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url.trim()) { setError("Please enter a YouTube video URL"); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await analyzeThumbnail(url.trim());
      setResult(data as ThumbnailAnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze thumbnail.");
    } finally {
      setLoading(false);
    }
  };

  const ctrColor = result?.analysis?.ctrEstimate === 'High' ? '#32d74b' : result?.analysis?.ctrEstimate === 'Medium' ? '#ffcc00' : '#ff3b30';

  return (
    <ToolLayout
      icon={<Image size={44} />}
      title="YouTube Thumbnail Analyzer"
      description="AI-powered analysis of thumbnail composition, colors, text, and CTR potential."
      seo={{
        toolName: "YouTube Thumbnail Analyzer",
        description: "Free AI-powered YouTube thumbnail analyzer. Get scores for composition, colors, text, and estimated CTR.",
        url: "https://toolsnappy.com/youtube-thumbnail-analyzer"
      }}
      currentPath="/youtube-thumbnail-analyzer"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Science of High-Performing YouTube Thumbnails</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Your video thumbnail is the single most important factor determining whether a potential viewer clicks or scrolls past your content. Our free <strong>YouTube Thumbnail Analyzer</strong> uses AI-powered computer vision techniques to evaluate composition, color contrast, text readability, emotional appeal, and facial expression quality, giving you a data-driven score for each critical element. In the competitive YouTube landscape of 2026, where the average user scrolls through hundreds of thumbnails daily, even a five percent improvement in click-through rate can translate into thousands of additional views over your video&rsquo;s lifetime. Understanding the visual psychology behind high-CTR thumbnails is essential knowledge for any serious content creator.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>What Makes a Thumbnail Clickable</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Research consistently shows that thumbnails featuring human faces with strong emotional expressions outperform text-only or object-only designs by a significant margin. Our analyzer specifically evaluates face detection and expression quality, rewarding thumbnails that show clear, high-contrast faces with recognizable emotions like surprise, curiosity, or excitement. Color contrast between the thumbnail subject and background is another critical factor, as high-contrast designs stand out in YouTube&rsquo;s predominantly dark interface. Text readability scoring ensures that any overlay text is large enough, positioned correctly, and contrasted sufficiently against the background to be readable at thumbnail size on both desktop and mobile screens.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Understanding Your Thumbnail Score Components</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Our analysis breaks down thumbnail quality into five distinct dimensions, each scored from one to ten. Composition scoring evaluates the rule of thirds, subject positioning, and visual balance. Color scoring measures contrast ratios, color harmony, and saturation levels that attract visual attention. Text readability checks font size, placement, and background contrast for any overlay text in your thumbnail. Emotional appeal assesses the strength and clarity of the feeling your thumbnail conveys. Face detection confirms the presence and quality of human faces. Together, these dimensions provide a complete picture of your thumbnail&rsquo;s potential performance and specific areas for improvement.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Proven Thumbnail Optimization Strategies</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Use high-resolution source images and avoid upscaling low-quality photos, which introduces visible artifacts. Position your subject slightly off-center following the rule of thirds for more dynamic compositions. Limit text to three to five words maximum and use bold, high-contrast fonts that remain readable at small sizes. Choose background colors that contrast strongly with your subject while complementing your brand palette. Test different thumbnail variations using YouTube&rsquo;s built-in A/B testing feature, and use our analyzer to predict which design will perform better before publishing. Apply these strategies systematically and track your channel&rsquo;s CTR trends to continuously refine your visual approach.
          </p>
        </article>
      }
      results={result && (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
            <img src={result.thumbnailUrl} alt="Thumbnail analysis preview" style={{ width: '100%', maxWidth: '480px', borderRadius: '12px' }}
              onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${result.videoId}/hqdefault.jpg`; }} />
          </div>

          <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <BarChart3 size={22} color="#0071e3" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Analysis</h3>
              <span style={{ marginLeft: 'auto', background: 'rgba(0,113,227,0.15)', color: '#0071e3', padding: '4px 14px', borderRadius: '20px', fontSize: '20px', fontWeight: 700 }}>
                {result.analysis.overallScore}/10
              </span>
            </div>
            <ScoreBar label="Composition" score={result.analysis.composition.score} />
            <ScoreBar label="Colors & Contrast" score={result.analysis.colors.score} />
            <ScoreBar label="Text Readability" score={result.analysis.textReadability.score} />
            <ScoreBar label="Emotional Appeal" score={result.analysis.emotionalAppeal.score} />
            {result.analysis.faceDetection.hasFace && <ScoreBar label="Face & Expression" score={result.analysis.faceDetection.score} />}
            <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color={ctrColor} />
              <span style={{ color: 'var(--muted)', fontSize: '14px' }}>CTR Potential:</span>
              <span style={{ color: ctrColor, fontWeight: 700 }}>{result.analysis.ctrEstimate}</span>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Lightbulb size={20} color="#ffcc00" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Improvements</h3>
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 20px', color: 'var(--muted)', fontSize: '14px', lineHeight: 2 }}>
              {result.analysis.improvements.map((tip, i) => (<li key={i}>{tip}</li>))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <CheckCircle2 size={20} color="#32d74b" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Best Practices</h3>
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 20px', color: 'var(--muted)', fontSize: '14px', lineHeight: 2 }}>
              {result.analysis.bestPractices.map((tip, i) => (<li key={i}>{tip}</li>))}
            </ul>
          </div>
        </div>
      )}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input type="text" className="input-field" placeholder="Paste YouTube video URL..." value={url}
              onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              style={{ flex: 1, minWidth: '200px' }} />
            <button className="premium-button" onClick={handleAnalyze} disabled={loading}
              style={{ minWidth: '140px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          {error && <p style={{ color: '#ff3b30', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        </div>
      </div>
    </ToolLayout>
  );
}

