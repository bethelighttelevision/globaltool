import React from 'react';
import { blogPosts } from '../../../data/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ChevronLeft, Share2, Clock, CalendarDays } from 'lucide-react';
import AdSensePlaceholder from '../../../components/AdSensePlaceholder';
import { supabase } from '../../../lib/supabase';
import { marked } from 'marked';
import ShareButton from '../../../components/ShareButton';

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  let slugs = blogPosts.map((post) => ({
    slug: post.slug,
  }));

  try {
    const { data } = await supabase
      .from('blogs')
      .select('slug');
    if (data && data.length > 0) {
      slugs = data.map((d: any) => ({
        slug: d.slug,
      }));
    }
  } catch (e) {
    console.error("Static params generation fallback:", e);
  }

  return slugs;
}

export async function generateMetadata(props: BlogPostProps) {
  const params = await props.params;
  let post: any = blogPosts.find((p) => p.slug === params.slug);

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', params.slug)
      .single();
    if (data && !error) {
      post = data;
    }
  } catch (e) {}

  if (!post) return { title: 'Post Not Found | ToolSnappy' };
  
  return {
    title: `${post.title} | ToolSnappy Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: BlogPostProps) {
  const params = await props.params;
  let post: any = null;
  let isFromDb = false;

  // 1. Try fetching from Supabase
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', params.slug)
      .single();
    
    if (data && !error) {
      post = data;
      isFromDb = true;
    }
  } catch (err) {
    console.error("Supabase fetch failed for slug:", params.slug, err);
  }

  // 2. Fall back to static post data
  if (!post) {
    post = blogPosts.find((p) => p.slug === params.slug);
  }

  if (!post) {
    notFound();
  }

  // Map category via static lookup since it might not be in DB columns
  const slugToCategory = new Map(blogPosts.map(p => [p.slug, p.category]));
  const postCategory = post.category || slugToCategory.get(post.slug) || 'SEO';

  // Parse markdown into HTML if needed
  let htmlContent = '';
  if (isFromDb) {
    // DB content was already compiled into HTML during migration
    htmlContent = post.content;
  } else {
    // Static markdown content must be parsed on the fly
    htmlContent = await marked.parse(post.content);
  }

  // Calculate reading time based on content length
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Get related articles
  let relatedArticles = [...blogPosts];
  try {
    const { data } = await supabase
      .from('blogs')
      .select('title, slug, excerpt, image, date, content')
      .neq('slug', params.slug)
      .limit(3);
    
    if (data && data.length > 0) {
      relatedArticles = data.map((d: any) => ({
        id: d.slug,
        title: d.title || '',
        slug: d.slug || '',
        excerpt: d.excerpt || '',
        content: d.content || '',
        image: d.image || '/blog-banner.png',
        date: d.date || '',
        category: slugToCategory.get(d.slug) || 'SEO'
      }));
    }
  } catch (e) {}

  // Safe fallback if related articles is empty
  if (relatedArticles.length === 0 || relatedArticles[0].slug === params.slug) {
    relatedArticles = blogPosts
      .filter(p => p.slug !== params.slug)
      .slice(0, 3);
  }

  return (
    <div className="content-container animate-fade-in" style={{ padding: '40px 24px', maxWidth: '900px' }}>
      {/* Back button link */}
      <Link href="/blog" style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '8px', 
        color: 'var(--accent)', 
        textDecoration: 'none', 
        marginBottom: '32px', 
        fontSize: '14px', 
        fontWeight: '600',
        transition: 'transform 0.2s' 
      }} className="hover:translate-x-[-4px]">
        <ChevronLeft size={16} /> Back to Blog Hub
      </Link>

      {/* Article Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '20px', fontSize: '14px', color: 'var(--muted)' }}>
          <span style={{ 
            background: 'rgba(41, 151, 255, 0.1)', 
            color: 'var(--accent)', 
            border: '1px solid rgba(41, 151, 255, 0.15)',
            padding: '6px 14px', 
            borderRadius: '100px', 
            fontSize: '12px', 
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {postCategory}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CalendarDays size={16} color="var(--accent)" /> {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} color="var(--accent)" /> {readingTime}
          </span>
        </div>
        
        <h1 className="gradient-text font-bold" style={{ 
          fontSize: 'clamp(28px, 5vw, 44px)', 
          lineHeight: 1.2, 
          marginBottom: '28px', 
          letterSpacing: '-0.02em',
          color: '#fff'
        }}>
          {post.title}
        </h1>

        {/* Author information card */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '14px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--card-border)',
          padding: '12px 20px',
          borderRadius: '16px',
          width: 'fit-content'
        }}>
          <div style={{ 
            height: '40px', 
            width: '40px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--accent) 0%, #1a5ab5 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(41, 151, 255, 0.3)'
          }}>
            TS
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--foreground)' }}>ToolSnappy Editorial Team</p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>Verified Expert Account</p>
          </div>
        </div>
      </div>

      {/* Featured Banner Image */}
      <div style={{ 
        width: '100%', 
        aspectRatio: '16/9', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        marginBottom: '48px', 
        position: 'relative',
        border: '1px solid var(--card-border)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
      }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Main Body Layout */}
      <div style={{ display: 'flex', gap: '40px' }}>
        <article style={{ flex: 1 }}>
          <AdSensePlaceholder type="mid-content" />
          
          {/* Dynamic dynamic HTML renderer */}
          <div 
            className="blog-content" 
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />

          {/* Social Feedback Box */}
          <div style={{ 
            marginTop: '60px', 
            padding: '36px', 
            background: 'rgba(28, 28, 30, 0.4)', 
            borderRadius: '24px', 
            border: '1px solid var(--card-border)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>Was this guide helpful?</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.5 }}>
              Share this expert guide with your fellow digital creators to help them optimize their platforms and grow their channels.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <ShareButton />
            </div>
          </div>
        </article>

        {/* Sidebar (Optional - hidden via Next/CSS responsive styling on mobile) */}
        <aside style={{ width: '300px', display: 'none' /* Hidden by default, can configure later */ }}>
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

      {/* Related Articles Section */}
      <div style={{ marginTop: '80px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '48px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '32px', color: '#fff', fontWeight: '700', letterSpacing: '-0.01em' }}>
          Related Expert Articles
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {relatedArticles.slice(0, 3).map((related: any) => (
            <Link key={related.slug} href={`/blog/${related.slug}`} style={{ textDecoration: 'none', display: 'flex' }}>
              <div className="glass-panel" style={{ 
                padding: '0', 
                overflow: 'hidden', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                border: '1px solid var(--card-border)',
                background: 'rgba(28, 28, 30, 0.3)'
              }}>
                <div style={{ height: '160px', width: '100%', overflow: 'hidden' }}>
                  <img src={related.image} alt={related.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="hover:scale-105" />
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ 
                    color: 'var(--accent)', 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    {slugToCategory.get(related.slug) || 'SEO'}
                  </span>
                  <h4 style={{ 
                    fontSize: '16px', 
                    color: '#fff', 
                    marginBottom: '8px', 
                    lineHeight: 1.4,
                    fontWeight: '600',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }} className="hover:text-[var(--accent)] transition-colors">
                    {related.title}
                  </h4>
                  <p style={{ 
                    color: 'var(--muted)', 
                    fontSize: '13px', 
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginTop: 'auto'
                  }}>
                    {related.excerpt}
                  </p>
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
