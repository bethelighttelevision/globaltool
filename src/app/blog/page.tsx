import React from 'react';
import { supabase } from '../../lib/supabase';
import { blogPosts } from '../../data/posts';
import BlogListClient from '../../components/BlogListClient';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import { BookOpen } from 'lucide-react';

export const revalidate = 60; // Revalidate the page every 60 seconds (ISR)

export const metadata = {
  title: 'Blog | ToolSnappy - Free SEO & Marketing Insights',
  description: 'Read the latest guides on SEO, AI Content, Crypto, and Marketing to grow your digital presence for free.',
};

export default async function BlogPage() {
  let posts = [...blogPosts];

  // Map slugs to categories for database posts that don't have it explicitly stored
  const slugToCategory = new Map(blogPosts.map(p => [p.slug, p.category]));

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });

    if (data && !error && data.length > 0) {
      type BlogRow = { id: string; title: string; slug: string; excerpt: string; content: string; image: string; date: string; category?: string };
      posts = data.map((d: BlogRow) => ({
        id: String(d.id),
        title: d.title || '',
        slug: d.slug || '',
        excerpt: d.excerpt || '',
        content: d.content || '',
        image: d.image || '/blog-banner.png',
        date: d.date || '',
        category: d.category || slugToCategory.get(d.slug) || 'SEO',
      }));
    } else if (error) {
      console.error("Supabase query failed, using static posts fallback:", error.message);
    }
  } catch {
    console.error("Failed to fetch from Supabase database, using local fallback");
  }

  // Ensure dates are parsed correctly for sorting
  posts = posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });

  return (
    <div className="content-container animate-fade-in" style={{ padding: '60px 24px' }}>
      {/* Blog Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'rgba(41, 151, 255, 0.08)', 
          padding: '8px 16px', 
          borderRadius: '100px', 
          marginBottom: '24px', 
          border: '1px solid rgba(41, 151, 255, 0.15)',
          boxShadow: '0 4px 12px rgba(41, 151, 255, 0.05)'
        }}>
          <BookOpen size={16} color="var(--accent)" />
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)', letterSpacing: '0.02em' }}>Actionable Insights & Tutorials</span>
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>
          The ToolSnappy Blog
        </h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Master digital growth, SEO optimization, design strategies, and crypto finance with our high-fidelity, professional guides.
        </p>
      </div>

      <AdSensePlaceholder type="header" />

      {/* Interactive dynamic blogs hub */}
      <BlogListClient posts={posts} />

      <div style={{ marginTop: '80px' }}>
        <AdSensePlaceholder type="footer" />
      </div>
    </div>
  );
}
