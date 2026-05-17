import React from 'react';
import { blogPosts } from '../../../data/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ChevronLeft, Share2, Clock } from 'lucide-react';
import AdSensePlaceholder from '../../../components/AdSensePlaceholder';

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: BlogPostProps) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | ToolSnappy Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: BlogPostProps) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="content-container animate-fade-in" style={{ padding: '40px 24px', maxWidth: '900px' }}>
      <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px', fontWeight: '500' }}>
        <ChevronLeft size={16} /> Back to Blog
      </Link>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '14px', color: 'var(--muted)' }}>
          <span style={{ background: 'var(--accent-dim)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: '600' }}>
            {post.category}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={16} /> {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={16} /> 5 min read
          </span>
        </div>
        <h1 className="gradient-text" style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.2, marginBottom: '24px', fontWeight: '700', letterSpacing: '-0.02em' }}>{post.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ height: '40px', width: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>T</div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--foreground)' }}>ToolSnappy Editorial Team</p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>Verified Expert Account</p>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '24px', overflow: 'hidden', marginBottom: '48px', position: 'relative' }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <article className="blog-content" style={{ flex: 1, fontSize: '18px', lineHeight: 1.8, color: 'var(--foreground)' }}>
          <AdSensePlaceholder type="mid-content" />
          
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} style={{ fontSize: 'clamp(22px, 4vw, 28px)', marginTop: '40px', marginBottom: '20px', color: 'var(--foreground)', fontWeight: '600' }}>{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} style={{ fontSize: 'clamp(18px, 3vw, 22px)', marginTop: '32px', marginBottom: '16px', color: 'var(--foreground)', fontWeight: '600' }}>{line.replace('### ', '')}</h3>;
            }
            if (line.trim().startsWith('* ')) {
              return <li key={i} style={{ marginLeft: '20px', marginBottom: '8px' }}>{line.replace('* ', '')}</li>;
            }
            if (line.trim().startsWith('1. ')) {
              return <li key={i} style={{ marginLeft: '20px', marginBottom: '8px' }}>{line.replace('1. ', '')}</li>;
            }
            if (line.trim() === '') return null;
            
            // Handle images
            if (line.trim().startsWith('![')) {
              const match = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
              if (match) {
                return (
                  <div key={i} style={{ margin: '32px 0', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <img src={match[2]} alt={match[1]} style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
                    <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--muted)', marginTop: '12px', paddingBottom: '12px', paddingLeft: '12px', paddingRight: '12px' }}>{match[1]}</p>
                  </div>
                );
              }
            }

            // Handle bold text and links
            const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
            return (
              <p key={i} style={{ marginBottom: '16px', lineHeight: 1.7 }}>
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j} style={{ color: 'var(--accent)' }}>{part.slice(2, -2)}</strong>;
                  }
                  if (part.startsWith('[') && part.endsWith(')')) {
                    const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
                    if (match) {
                      return <a key={j} href={match[2]} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{match[1]}</a>;
                    }
                  }
                  return part;
                })}
              </p>
            );
          })}

          <div style={{ marginTop: '60px', padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Was this helpful?</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px' }}>Share this guide with your fellow creators to help them grow.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Share2 size={18} /> Share Guide
              </button>
            </div>
          </div>
        </article>

        <aside style={{ width: '300px', display: 'none' /* Hidden on small screens via CSS later */ }}>
          <div className="glass-panel" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Popular Tools</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/seo-analyzer" className="sidebar-link">SEO Analyzer</Link>
              <Link href="/bg-remover" className="sidebar-link">BG Remover</Link>
              <Link href="/crypto" className="sidebar-link">Crypto Calc</Link>
            </div>
            <div style={{ marginTop: '32px' }}>
              <AdSensePlaceholder type="sidebar" />
            </div>
          </div>
        </aside>
      </div>

      <div style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '32px' }}>Related Articles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {blogPosts
            .filter(p => p.slug !== params.slug)
            .slice(0, 3)
            .map(related => (
              <Link key={related.id} href={`/blog/${related.slug}`} style={{ textDecoration: 'none' }}>
                <div className="glass-panel h-full" style={{ padding: '0', overflow: 'hidden', height: '100%' }}>
                  <img src={related.image} alt={related.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '8px', lineHeight: 1.4 }}>{related.title}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>{related.excerpt.slice(0, 80)}...</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div style={{ marginTop: '80px' }}>
        <AdSensePlaceholder type="footer" />
      </div>
    </div>
  );
}
