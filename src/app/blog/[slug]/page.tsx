import React from 'react';
import { blogPosts } from '../../../data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { CalendarDays, ChevronLeft, Clock } from 'lucide-react';
import AdSensePlaceholder from '../../../components/AdSensePlaceholder';
import { getSupabase } from '../../../lib/supabase';
import { marked } from 'marked';
import ShareButton from '../../../components/ShareButton';

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

interface PostData {
  id?: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category?: string;
  author_name?: string;
  author_bio?: string;
  authorName?: string;
  authorBio?: string;
}

function getAuthorName(post: PostData): string {
  return post.authorName || post.author_name || 'ToolSnappy Editorial Team';
}

function getAuthorBio(post: PostData): string {
  return post.authorBio || post.author_bio || 'Providing practical tools and resources for creators, marketers, and professionals.';
}

export async function generateStaticParams() {
  let slugs = blogPosts.map((post) => ({
    slug: post.slug,
  }));

  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('blogs')
      .select('slug');
    if (data && data.length > 0) {
      const dbSlugs = new Set(data.map((d: { slug: string }) => d.slug));
      const combinedSlugs = [...new Set([...blogPosts.map(p => p.slug), ...dbSlugs])];
      slugs = combinedSlugs.map(slug => ({ slug }));
    }
  } catch {
    // static params fallback
  }

  return slugs;
}

export async function generateMetadata(props: BlogPostProps) {
  const params = await props.params;
  let post: PostData | null = blogPosts.find((p) => p.slug === params.slug) || null;

  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', params.slug)
      .single();
    if (data) {
      post = data as PostData;
    }
  } catch {
    // metadata fallback
  }

  if (!post) return { title: 'Post Not Found | ToolSnappy' };
  
  return {
    title: `${post.title} | ToolSnappy Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ToolSnappy Blog`,
      description: post.excerpt,
      type: 'article',
      url: `https://toolsnappy.com/blog/${post.slug}`,
      siteName: 'ToolSnappy',
      images: [{ url: post.image || 'https://toolsnappy.com/logo.png', width: 1200, height: 675 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ToolSnappy Blog`,
      description: post.excerpt,
      images: [post.image || 'https://toolsnappy.com/logo.png'],
    },
  };
}

export default async function BlogPostPage(props: BlogPostProps) {
  const params = await props.params;
  let post: PostData | null = null;
  let isFromDb = false;

  // 1. Try fetching from Supabase
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', params.slug)
      .single();
    
    if (data && !error) {
      post = data as PostData;
      isFromDb = true;
    }
  } catch {
    console.error("Supabase fetch failed for slug:", params.slug);
  }

  // 2. Fall back to static post data
  if (!post) {
    post = blogPosts.find((p) => p.slug === params.slug) || null;
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
    const supabase = getSupabase();
    const { data } = await supabase
      .from('blogs')
      .select('title, slug, excerpt, image, date, content')
      .neq('slug', params.slug)
      .limit(3);
    
    if (data && data.length > 0) {
      type RelatedRow = { slug: string; title: string; excerpt: string; image: string; date: string; content: string };
      relatedArticles = data.map((d: RelatedRow) => ({
        id: d.slug,
        title: d.title || '',
        slug: d.slug || '',
        excerpt: d.excerpt || '',
        content: d.content || '',
        image: d.image || '/blog-banner.png',
        date: d.date || '',
        category: slugToCategory.get(d.slug) || 'SEO',
        authorName: '',
        authorBio: ''
      }));
    }
  } catch {}

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
          alignItems: 'flex-start', 
          gap: '14px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--card-border)',
          padding: '16px 20px',
          borderRadius: '16px',
          maxWidth: '100%'
        }}>
          <div style={{ 
            height: '44px', 
            width: '44px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--accent) 0%, #1a5ab5 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            fontWeight: 'bold', 
            fontSize: '16px',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(41, 151, 255, 0.3)'
          }}>
            {getAuthorName(post).charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--foreground)' }}>{getAuthorName(post)}</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px', lineHeight: '1.5', color: 'var(--muted)' }}>{getAuthorBio(post)}</p>
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
        <Image src={post.image} alt={post.title} width={1200} height={675} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* JSON-LD Article + BreadcrumbList Schema */}
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "headline": post.title,
                "description": post.excerpt,
                "image": post.image,
                "datePublished": post.date,
                "author": {
                  "@type": "Person",
                  "name": getAuthorName(post)
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "ToolSnappy",
                  "logo": { "@type": "ImageObject", "url": "https://toolsnappy.com/logo.png" }
                }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolsnappy.com" },
                  { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolsnappy.com/blog" },
                  { "@type": "ListItem", "position": 3, "name": post.title, "item": "https://toolsnappy.com/blog/" + post.slug }
                ]
              }
            ]
          })
        }}
      />

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

          {/* Author Bio Card */}
          <div className="glass-panel" style={{ 
            marginTop: '40px', 
            padding: '32px', 
            display: 'flex', 
            gap: '24px', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            border: '1px solid var(--card-border)',
            borderRadius: '24px'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--accent) 0%, #1a5ab5 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#fff', 
              fontWeight: 'bold',
              fontSize: '28px',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(41, 151, 255, 0.3)'
            }}>
              {post.author_name ? post.author_name.charAt(0).toUpperCase() : 'TS'}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '4px', color: '#fff', fontWeight: '700' }}>{post.author_name || 'ToolSnappy Editorial Team'}</h4>
              <p style={{ fontSize: '13px', color: 'var(--accent)', marginBottom: '12px', fontWeight: '500' }}>{post.author_name ? 'Guest Contributor' : 'SEO & Content Strategy'}</p>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                {post.author_bio || (post.author_name ? `${post.author_name} is a guest contributor at ToolSnappy.` : 'Our team has 8+ years of experience in SEO, content marketing, and digital growth strategies. We help creators and businesses rank higher and grow faster.')}
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/blog" style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>View All Articles &rarr;</Link>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="glass-panel" style={{ 
            marginTop: '40px', 
            padding: '40px', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(41,151,255,0.05), rgba(191,90,242,0.05))',
            border: '1px solid rgba(41,151,255,0.15)',
            borderRadius: '24px'
          }}>
            <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#fff', fontWeight: '700' }}>Get More Expert Guides</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 24px' }}>
              Join our newsletter for weekly SEO tips, content strategies, and exclusive tools updates.
            </p>
            <form style={{ display: 'flex', gap: '12px', maxWidth: '450px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="input-field" 
                style={{ flex: 1, minWidth: '200px', padding: '14px 20px' }}
              />
              <button type="submit" className="premium-button" style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}>
                Subscribe Free
              </button>
            </form>
            <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '12px' }}>No spam. Unsubscribe anytime.</p>
          </div>
        </article>

        {/* Sidebar - Desktop Only */}
        <aside className="blog-sidebar-desktop" style={{ 
          width: '300px', 
          flexShrink: 0,
          display: 'none', 
        }}>
          <div className="glass-panel" style={{ padding: '24px', position: 'sticky', top: '100px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '16px', color: '#fff' }}>Popular Free Tools</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/site-audit" className="sidebar-link" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                borderRadius: '12px', background: 'rgba(255,255,255,0.03)', fontSize: '14px',
                color: 'var(--foreground)', textDecoration: 'none', transition: 'all 0.2s'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></span>
                SEO Analyzer
              </Link>
              <Link href="/bg-remover" className="sidebar-link" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                borderRadius: '12px', background: 'rgba(255,255,255,0.03)', fontSize: '14px',
                color: 'var(--foreground)', textDecoration: 'none', transition: 'all 0.2s'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#bf5af2' }}></span>
                BG Remover
              </Link>
              <Link href="/crypto-profit" className="sidebar-link" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                borderRadius: '12px', background: 'rgba(255,255,255,0.03)', fontSize: '14px',
                color: 'var(--foreground)', textDecoration: 'none', transition: 'all 0.2s'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30d158' }}></span>
                Crypto Calc
              </Link>
              <Link href="/ai-hook" className="sidebar-link" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                borderRadius: '12px', background: 'rgba(255,255,255,0.03)', fontSize: '14px',
                color: 'var(--foreground)', textDecoration: 'none', transition: 'all 0.2s'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff9f0a' }}></span>
                AI Hook Gen
              </Link>
              <Link href="/youtube-seo" className="sidebar-link" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                borderRadius: '12px', background: 'rgba(255,255,255,0.03)', fontSize: '14px',
                color: 'var(--foreground)', textDecoration: 'none', transition: 'all 0.2s'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff453a' }}></span>
                YouTube SEO
              </Link>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(41,151,255,0.1)' }}>
            <h4 style={{ fontSize: '15px', marginBottom: '8px', color: '#fff' }}>All Tools Free</h4>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
              No sign-up required. No credit card. Just professional tools.
            </p>
            <Link href="/" style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', marginTop: '12px' }}>
              Browse All &rarr;
            </Link>
          </div>
        </aside>
      </div>

      {/* Related Articles Section */}
      <div style={{ marginTop: '80px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '48px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '32px', color: '#fff', fontWeight: '700', letterSpacing: '-0.01em' }}>
          Related Expert Articles
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {relatedArticles.slice(0, 3).map((related: PostData) => (
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
                  <Image src={related.image} alt={related.title} width={260} height={160} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="hover:scale-105" />
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

      {/* Responsive CSS for sidebar */}
      <style>{`
        .blog-sidebar-desktop {
          display: none !important;
        }
        @media (min-width: 1200px) {
          .blog-sidebar-desktop {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
