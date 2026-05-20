import React from 'react';
import { getAdminBlogs } from '../actions/blog';
import AdminBlogList from '../../components/AdminBlogList';
import { blogPosts } from '../../data/posts';
import { BookOpen, Tag, Calendar, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const result = await getAdminBlogs();
  
  // Format posts correctly with safe defaults and mapping categories from static fallback if missing
  const slugToCategory = new Map(blogPosts.map(p => [p.slug, p.category]));
  const blogs = (result.data || []).map((d: any) => ({
    id: String(d.id),
    title: d.title || '',
    slug: d.slug || '',
    excerpt: d.excerpt || '',
    image: d.image || '/blog-banner.png',
    date: d.date || '',
    category: d.category || slugToCategory.get(d.slug) || 'SEO',
  }));

  // Aggregated analytics metrics
  const totalArticles = blogs.length;
  
  const uniqueCategories = Array.from(
    new Set(blogs.map(b => b.category || 'SEO'))
  );
  const totalCategories = uniqueCategories.length;

  const latestPostDate = blogs.length > 0 
    ? blogs.reduce((latest, current) => {
        const latestTime = new Date(latest.date).getTime() || 0;
        const currentTime = new Date(current.date).getTime() || 0;
        return currentTime > latestTime ? current : latest;
      }, blogs[0]).date
    : 'No Posts';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Title & Security Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="gradient-text text-3xl font-bold" style={{ margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            System Dashboard
          </h1>
          <p style={{ color: 'var(--muted)', margin: 0, fontSize: '15px' }}>
            Monitor public guides, tutorials, and digital analytics.
          </p>
        </div>

        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'rgba(50, 215, 75, 0.08)', 
          padding: '8px 16px', 
          borderRadius: '100px', 
          border: '1px solid rgba(50, 215, 75, 0.15)',
          boxShadow: '0 4px 12px rgba(50, 215, 75, 0.05)'
        }}>
          <ShieldCheck size={16} color="var(--success)" />
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--success)' }}>Supabase Secure Session</span>
        </div>
      </div>

      {/* Analytics Counter Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* Metric 1: Total Articles */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(41, 151, 255, 0.08)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            border: '1px solid rgba(41, 151, 255, 0.15)'
          }}>
            <BookOpen size={20} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Articles
            </span>
            <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-heading)' }}>
              {totalArticles}
            </span>
          </div>
        </div>

        {/* Metric 2: Categories */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(255, 214, 10, 0.08)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffd60a',
            border: '1px solid rgba(255, 214, 10, 0.15)'
          }}>
            <Tag size={20} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Categories
            </span>
            <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-heading)' }}>
              {totalCategories}
            </span>
          </div>
        </div>

        {/* Metric 3: Latest Published */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(50, 215, 75, 0.08)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)',
            border: '1px solid rgba(50, 215, 75, 0.15)'
          }}>
            <Calendar size={20} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Latest Publish
            </span>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-heading)', display: 'block', marginTop: '4px' }}>
              {latestPostDate}
            </span>
          </div>
        </div>

      </div>

      {/* Blogs Listing Section */}
      <AdminBlogList initialBlogs={blogs} />
      
    </div>
  );
}
