import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import AdSensePlaceholder from '../components/AdSensePlaceholder';
import Mascot from '../components/Mascot';
import {
  Search, Globe, Bot, FileCode2, Tags, ShieldCheck, Braces, Play, Camera,
  Type, Image as ImageIcon, TrendingUp, Star, Hash, Download, Eye, List,
  DollarSign, FileText, Music, Sparkles, RefreshCw, Layers, Calculator, Zap,
  ArrowRight, CheckCircle2, Quote, Code, Film, ShoppingBag, Package,
} from 'lucide-react';
import OrgSection from '../components/OrgSection';

export const metadata = {
  title: 'ToolSnappy | Free SEO & Social Media Toolkit 2026',
  description: 'Access 34+ professional tools: SEO Analyzer, AI Humanizer, Crypto Calculator, Tax Calculator, YouTube tools, and more. 100% Free. No sign-up required.',
  keywords: 'ToolSnappy, Free SEO Tools, AI Hook Generator, Crypto Calculator, YouTube SEO, TikTok Tools, US Tax Calculator, Salary Calculator',
  alternates: { canonical: 'https://toolsnappy.com' },
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '28px', paddingBottom: '16px',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  display: 'flex', alignItems: 'center', gap: '12px',
};

function SectionHeader({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div style={sectionStyle}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '10px',
        background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color, fontSize: '18px',
      }}>
        {icon}
      </div>
      <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0, color: '#fff', letterSpacing: '-0.01em' }}>{label}</h2>
    </div>
  );
}

function ToolCard({
  href, icon, label, desc, color, borderColor, badge,
}: {
  href: string; icon: React.ReactNode; label: string; desc: string;
  color: string; borderColor?: string; badge?: { text: string; color: string };
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="glass-panel" style={{
        padding: '24px', cursor: 'pointer', height: '100%',
        position: 'relative', overflow: 'hidden',
        borderTop: borderColor ? `3px solid ${borderColor}` : undefined,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: color, flexShrink: 0, transition: 'all 0.3s', fontSize: '22px',
          }}>
            {icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#fff' }}>{label}</h3>
              {badge && (
                <span style={{
                  fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.05em', padding: '2px 8px', borderRadius: '100px',
                  color: badge.color, background: `${badge.color}15`,
                  border: `1px solid ${badge.color}25`,
                }}>{badge.text}</span>
              )}
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{desc}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ========= MAIN ========= */
export default function Home() {
  return (
    <>
      {/* JSON-LD Schema */}
      <Script id="website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@graph": [
          { "@type": "WebSite", "name": "ToolSnappy", "url": "https://toolsnappy.com", "description": "Free SEO, social media, and developer tools suite." },
          { "@type": "Organization", "name": "ToolSnappy", "url": "https://toolsnappy.com", "logo": "https://toolsnappy.com/logo.png" },
        ],
      }) }} />

      {/* ==================== HERO ==================== */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 0 100px',
      }}>
        {/* Animated Background Orbs */}
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', width: '500px', height: '500px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(41,151,255,0.08) 0%, transparent 70%)',
          animation: 'driftSlow 20s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: '-30%', right: '-5%', width: '400px', height: '400px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)',
          animation: 'drift 18s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '25%', width: '250px', height: '250px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 70%)',
          animation: 'floatSlow 10s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
        }} />

        <div className="content-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Badge */}
          <div className="animate-fade-in" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(41,151,255,0.08)', border: '1px solid rgba(41,151,255,0.15)',
            padding: '6px 16px 6px 8px', borderRadius: '100px', marginBottom: '28px',
          }}>
            <div style={{
              width: '22px', height: '22px', borderRadius: '6px',
              background: 'rgba(41,151,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={13} color="var(--accent)" />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent)' }}>
               34+ Free Tools — No Sign-up Required
            </span>
          </div>

          {/* Heading */}
          <h1 className="animate-slide-up" style={{
            fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700,
            lineHeight: 1.05, marginBottom: '20px', letterSpacing: '-0.03em',
          }}>
            Your Complete Digital<br />
            <span className="gradient-text-accent">Toolbox</span>
          </h1>

          <p className="animate-slide-up" style={{
            fontSize: '18px', color: 'var(--muted-light)', maxWidth: '600px',
            margin: '0 auto 40px', lineHeight: 1.65,
          }}>
            Free online tools for SEO, social media, finance, and content creation.
            Built for speed, privacy, and professional results.
          </p>

          {/* Mascot */}
          <div style={{ marginBottom: '40px' }}>
            <Mascot />
          </div>

          {/* CTA Buttons */}
          <div className="animate-slide-up" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '16px', flexWrap: 'wrap',
          }}>
            <Link href="/site-audit" style={{ textDecoration: 'none' }}>
              <span className="premium-button" style={{ fontSize: '15px', padding: '16px 32px' }}>
                Explore Tools <ArrowRight size={18} />
              </span>
            </Link>
            <Link href="/free-online-tools-for-creators" style={{ textDecoration: 'none' }}>
              <span className="secondary-button" style={{ fontSize: '15px', padding: '16px 32px' }}>
                View All 34+ Tools
              </span>
            </Link>
          </div>

          {/* Trust Stats */}
          <div className="animate-fade-in" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px',
            marginTop: '64px', flexWrap: 'wrap',
          }}>
            {[
                { value: '34+', label: 'Free Tools' },
              { value: '100%', label: 'Free to Use' },
              { value: '0', label: 'Sign-ups Required' },
              { value: '2026', label: 'Latest Updates' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '28px', fontWeight: 700, lineHeight: 1,
                  background: 'linear-gradient(135deg, #fff 60%, rgba(255,255,255,0.5))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', marginBottom: '4px',
                }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ORG SECTION ==================== */}
      <OrgSection />

      {/* ==================== TOOLS GRID ==================== */}
      <div className="content-container" style={{ paddingBottom: '80px' }}>

        <AdSensePlaceholder type="header" />

        {/* ---- SEO & Marketing ---- */}
        <div style={{ marginTop: '60px' }}>
          <SectionHeader icon={<Search />} label="SEO & Marketing" color="#2997ff" />
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px',
          }}>
            <ToolCard href="/site-audit" icon={<Globe />} label="Page SEO Analyzer" desc="Full website audit for titles, tags, and H1-H3 structure." color="#2997ff" borderColor="#2997ff" badge={{ text: 'Popular', color: '#2997ff' }} />
            <ToolCard href="/youtube-seo" icon={<Play />} label="YouTube SEO Optimizer" desc="Viral titles and real-time searchability scoring." color="#ff0000" borderColor="#ff0000" />
            <ToolCard href="/meta-tags" icon={<Tags />} label="Meta Tags Builder" desc="OG & SEO meta tag generation suite." color="#a8c7fa" borderColor="#a8c7fa" />
            <ToolCard href="/keyword-clustering" icon={<Layers />} label="Keyword Clustering" desc="Group keywords by topic and intent." color="#34c759" borderColor="#34c759" badge={{ text: 'New', color: '#34c759' }} />
          </div>
        </div>

        {/* ---- AI & Content ---- */}
        <div style={{ marginTop: '48px' }}>
          <SectionHeader icon={<Bot />} label="AI & Content Creation" color="#818cf8" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            <ToolCard href="/ai-hook" icon={<Bot />} label="AI Hook Generator" desc="Psychological frameworks for viral content retention." color="#818cf8" borderColor="#818cf8" badge={{ text: 'Hot', color: '#818cf8' }} />
            <ToolCard href="/ai-humanizer" icon={<Sparkles />} label="AI Content Humanizer" desc="Refine AI-generated text to sound more natural and engaging." color="#818cf8" borderColor="#818cf8" />
            <ToolCard href="/blog-to-social" icon={<RefreshCw />} label="Blog to Social Repurposer" desc="Convert blog posts into social media content." color="#1da1f2" borderColor="#1da1f2" />
            <ToolCard href="/instagram-caption" icon={<Camera />} label="Instagram Caption Generator" desc="AI-driven captions for reels and posts." color="#cc2366" borderColor="#cc2366" />
            <ToolCard href="/tiktok-hashtags" icon={<Hash />} label="TikTok Hashtag Generator" desc="High-velocity trending tag generation." color="#00f2ea" borderColor="#00f2ea" />
          </div>
        </div>

        {/* ---- YouTube Creator Tools ---- */}
        <div style={{ marginTop: '48px' }}>
          <SectionHeader icon={<Play />} label="YouTube Creator Tools" color="#ff0000" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            <ToolCard href="/youtube-thumbnail-analyzer" icon={<Eye />} label="Thumbnail Analyzer" desc="AI-powered composition, color, and CTR analysis." color="#32d74b" borderColor="#32d74b" badge={{ text: 'AI', color: '#32d74b' }} />
            <ToolCard href="/youtube-thumbnail-tester" icon={<Eye />} label="Thumbnail Tester" desc="Preview in search, suggested, and home page mockups." color="#ffcc00" borderColor="#ffcc00" />
            <ToolCard href="/youtube-thumbnail-downloader" icon={<Download />} label="Thumbnail Downloader" desc="Download in HD to default quality." color="#ff3b30" borderColor="#ff3b30" />
            <ToolCard href="/youtube-tag-extractor" icon={<List />} label="Tag Extractor" desc="Extract tags, hashtags, and keywords from any video." color="#0071e3" borderColor="#0071e3" />
            <ToolCard href="/shorts-ideas" icon={<Film />} label="Shorts Ideas Generator" desc="10 viral Shorts ideas with hooks, scripts & hashtags." color="#818cf8" borderColor="#818cf8" badge={{ text: 'New', color: '#818cf8' }} />
          </div>
        </div>

        {/* ---- Finance & Calculators (HIGH CPC) ---- */}
        <div style={{ marginTop: '48px' }}>
          <SectionHeader icon={<Calculator />} label="Finance & Calculators" color="#32d74b" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            <ToolCard href="/crypto-profit" icon={<TrendingUp />} label="Crypto Profit Calculator" desc="Advanced ROI tracker with US tax deduction logic." color="#0071e3" borderColor="#0071e3" badge={{ text: 'High CPC', color: '#ff9f0a' }} />
            <ToolCard href="/tax-calculator" icon={<Calculator />} label="US Tax Calculator 2026" desc="Estimate federal income tax with current brackets." color="#ff9f0a" borderColor="#ff9f0a" badge={{ text: 'New', color: '#ff9f0a' }} />
            <ToolCard href="/salary-calculator" icon={<DollarSign />} label="Salary Calculator" desc="Take-home pay after federal, state, and FICA taxes." color="#32d74b" borderColor="#32d74b" badge={{ text: 'New', color: '#32d74b' }} />
            <ToolCard href="/retirement-calculator" icon={<TrendingUp />} label="Retirement Calculator" desc="Project savings growth and monthly income." color="#0071e3" borderColor="#0071e3" badge={{ text: 'New', color: '#0071e3' }} />
            <ToolCard href="/mortgage-calculator" icon={<Calculator />} label="Mortgage Calculator" desc="Home loan planner with amortization schedule." color="#0071e3" borderColor="#0071e3" />
            <ToolCard href="/car-loan-calculator" icon={<TrendingUp />} label="Car Loan Calculator" desc="Monthly EMI and total interest estimator." color="#32d74b" borderColor="#32d74b" />
          </div>
        </div>

        <AdSensePlaceholder type="mid-content" />

        {/* ---- Images & Media ---- */}
        <div style={{ marginTop: '48px' }}>
          <SectionHeader icon={<ImageIcon />} label="Images & Media Tools" color="#ff9f0a" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            <ToolCard href="/bg-remover" icon={<ImageIcon />} label="AI Background Remover" desc="Remove backgrounds instantly with AI-powered precision." color="#ff9f0a" borderColor="#ff9f0a" badge={{ text: 'AI', color: '#ff9f0a' }} />
            <ToolCard href="/image-upscaler" icon={<ImageIcon />} label="Image Upscaler" desc="Increase resolution of low-quality images using AI." color="#32d74b" borderColor="#32d74b" badge={{ text: 'New', color: '#32d74b' }} />
            <ToolCard href="/pdf-converter" icon={<FileText />} label="PDF to SVG Converter" desc="Private, client-side vector conversion with page previews." color="#ff3b30" borderColor="#ff3b30" />
            <ToolCard href="/base64-converter" icon={<FileCode2 />} label="Image to Base64" desc="Instant image encoding for developers." color="#32d74b" borderColor="#32d74b" />
          </div>
        </div>

        {/* ---- E-commerce (Amazon Seller Tools) ---- */}
        <div style={{ marginTop: '48px' }}>
          <SectionHeader icon={<ShoppingBag />} label="E-commerce Tools" color="#ff9500" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            <ToolCard href="/amazon-listing-optimizer" icon={<Package />} label="Amazon Listing Optimizer" desc="Generate AI-powered titles, bullets, and descriptions." color="#ff9500" borderColor="#ff9500" badge={{ text: 'New', color: '#ff9500' }} />
            <ToolCard href="/amazon-keyword-tool" icon={<Tags />} label="Amazon Keyword Researcher" desc="Organized keyword ideas for product research." color="#ff9500" borderColor="#ff9500" badge={{ text: 'New', color: '#ff9500' }} />
          </div>
        </div>

        {/* ---- Developer Tools ---- */}
        <div style={{ marginTop: '48px' }}>
          <SectionHeader icon={<Code />} label="Developer Tools" color="#a8c7fa" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            <ToolCard href="/json-formatter" icon={<Braces />} label="JSON Formatter" desc="Validate and beautify JSON strings instantly." color="#a8c7fa" borderColor="#a8c7fa" />
            <ToolCard href="/password-gen" icon={<ShieldCheck />} label="Password Generator" desc="Generate secure, random passwords locally in your browser." color="#ffcc00" borderColor="#ffcc00" />
            <ToolCard href="/word-counter" icon={<Type />} label="Word Counter" desc="Readability analysis and density statistics." color="#0071e3" borderColor="#0071e3" />
            <ToolCard href="/cv-maker" icon={<FileText />} label="CV / Resume Maker" desc="Professional resume builder with ATS scoring." color="#818cf8" borderColor="#818cf8" badge={{ text: 'Pro', color: '#818cf8' }} />
            <ToolCard href="/lucky-number" icon={<Star />} label="AI Lucky Number Finder" desc="Find your destiny number and 2026 predictions." color="#a8c7fa" borderColor="#a8c7fa" badge={{ text: 'Fun', color: '#a8c7fa' }} />
          </div>
        </div>

        {/* ==================== CTA BANNER ==================== */}
        <div style={{
          marginTop: '80px', padding: '48px 40px',
          background: 'linear-gradient(135deg, rgba(41,151,255,0.06) 0%, rgba(129,140,248,0.04) 50%, rgba(236,72,153,0.02) 100%)',
          border: '1px solid rgba(41,151,255,0.1)',
          borderRadius: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(41,151,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, marginBottom: '12px',
            color: '#fff', position: 'relative',
          }}>
            Ready to Supercharge Your Workflow?
          </h2>
          <p style={{
            color: 'var(--muted-light)', fontSize: '16px', maxWidth: '500px',
            margin: '0 auto 32px', lineHeight: 1.6, position: 'relative',
          }}>
            All tools are 100% free, no sign-up required, and engineered for speed.
            Start using them right now — no strings attached.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', position: 'relative' }}>
            <Link href="/free-online-tools-for-creators" style={{ textDecoration: 'none' }}>
              <span className="premium-button" style={{ fontSize: '15px' }}>
                Browse All 34+ Tools <ArrowRight size={18} />
              </span>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <span className="secondary-button" style={{ fontSize: '15px' }}>
                Have a Suggestion?
              </span>
            </Link>
          </div>
        </div>

        {/* ==================== FEATURES STRIP ==================== */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px', marginTop: '60px',
        }}>
          {[
            { icon: <Zap />, title: 'Lightning Fast', desc: 'All tools run client-side or on edge. No waiting.' },
            { icon: <ShieldCheck />, title: '100% Private', desc: 'Zero data storage. Your files stay on your device.' },
            { icon: <CheckCircle2 />, title: 'Always Free', desc: 'No paywalls, no trials, no credit cards needed.' },
            { icon: <Quote />, title: 'No Sign-up', desc: 'Start using any tool instantly. Zero friction.' },
          ].map((feat) => (
            <div key={feat.title} className="glass-panel" style={{
              padding: '24px', textAlign: 'center',
              borderTop: `2px solid rgba(41,151,255,0.15)`,
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(41,151,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', margin: '0 auto 16px', fontSize: '20px',
              }}>
                {feat.icon}
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#fff' }}>{feat.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* ==================== FEATURED IN / TRUST BAR ==================== */}
        <div style={{
          marginTop: '60px', padding: '32px', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px',
          background: 'rgba(255,255,255,0.02)',
        }}>
          <p style={{
            fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase',
            letterSpacing: '0.12em', fontWeight: 600, marginBottom: '20px',
          }}>Built for creators, marketers, and professionals</p>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '32px', flexWrap: 'wrap',
            fontSize: '13px', color: 'var(--muted-light)',
          }}>
            {['SEO Experts', 'Content Creators', 'Developers', 'Marketers', 'Freelancers', 'Small Business'].map((item) => (
              <span key={item} style={{
                fontWeight: 500, letterSpacing: '0.02em',
                padding: '6px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}>{item}</span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
