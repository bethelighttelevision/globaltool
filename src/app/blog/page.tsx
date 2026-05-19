import React from 'react';
// Final build trigger
import Link from 'next/link';
import { blogPosts } from '../../data/posts';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Blog | ToolSnappy - Free SEO & Marketing Insights',
  description: 'Read the latest guides on SEO, AI Content, Crypto, and Marketing to grow your digital presence for free.',
};

export default function BlogPage() {
  return (
    <div className="content-container animate-fade-in" style={{ padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '100px', marginBottom: '24px', border: '1px solid var(--card-border)' }}>
          <BookOpen size={16} color="var(--accent)" />
          <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--muted)' }}>Expert Insights & Guides</span>
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px' }}>The ToolSnappy Blog</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
          Master the tools of the trade with our deep-dive guides on SEO, AI, and digital growth.
        </p>
      </div>

      <AdSensePlaceholder type="header" />

      {/* Featured Post */}
      <div style={{ marginTop: '40px', marginBottom: '60px' }}>
        <Link href={`/blog/${blogPosts[0].slug}`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0', padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '350px' }}>
              <img src={blogPosts[0].image} alt={blogPosts[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '12px', display: 'block' }}>Featured Article</span>
              <h2 style={{ fontSize: '32px', color: 'var(--foreground)', marginBottom: '16px', lineHeight: 1.2 }}>{blogPosts[0].title}</h2>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>{blogPosts[0].excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: '600' }}>
                Read Featured Article <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}>
              <div style={{ height: '200px', width: '100%', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '12px', color: 'var(--muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} /> ToolSnappy Team
                  </span>
                </div>
                <h2 style={{ fontSize: '20px', color: 'var(--foreground)', marginBottom: '12px', lineHeight: 1.4 }}>{post.title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{post.excerpt}</p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: '600', fontSize: '14px' }}>
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '80px' }}>
        <AdSensePlaceholder type="footer" />
      </div>
    </div>
  );
}
