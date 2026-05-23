import React from 'react';
import { getAdminBlogs, getPendingGuestRequestsCount } from '../actions/blog';
import AdminBlogList from '../../components/AdminBlogList';
import { blogPosts } from '../../data/posts';
import { BookOpen, Tag, Calendar, ShieldCheck, TrendingUp, Clock, PenLine, MessageSquare } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const result = await getAdminBlogs();
  const pendingResult = await getPendingGuestRequestsCount();
  
  const slugToCategory = new Map(blogPosts.map(p => [p.slug, p.category]));
  type DbRow = { id: string | number; title: string; slug: string; excerpt: string; image: string; date: string; category?: string };
  const dbBlogs = (result.data || []).map((d: DbRow) => ({
    id: String(d.id),
    title: d.title || '',
    slug: d.slug || '',
    excerpt: d.excerpt || '',
    image: d.image || '/blog-banner.png',
    date: d.date || '',
    category: d.category || slugToCategory.get(d.slug) || 'SEO',
  }));

  const dbSlugs = new Set(dbBlogs.map(b => b.slug));
  const staticBlogs = blogPosts
    .filter(p => !dbSlugs.has(p.slug))
    .map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      image: p.image || '/blog-banner.png',
      date: p.date,
      category: p.category || slugToCategory.get(p.slug) || 'SEO',
    }));

  const blogs = [...dbBlogs, ...staticBlogs];

  const totalArticles = blogs.length;
  const totalCategories = Array.from(new Set(blogs.map(b => b.category || 'SEO'))).length;

  const latestPost = blogs.length > 0
    ? blogs.reduce((latest, current) => {
        const latestTime = new Date(latest.date).getTime() || 0;
        const currentTime = new Date(current.date).getTime() || 0;
        return currentTime > latestTime ? current : latest;
      }, blogs[0])
    : null;

  const recentPosts = blogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1 className="admin-title gradient-text">System Dashboard</h1>
          <p className="text-muted m-0 text-sm">Monitor public guides, tutorials, and digital analytics.</p>
        </div>
        <div className="admin-badge">
          <ShieldCheck size={16} className="text-green-400" />
          <span className="text-xs font-semibold text-green-400">Supabase Connected</span>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="glass-panel admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(41, 151, 255, 0.1)', color: 'var(--accent)', borderColor: 'rgba(41, 151, 255, 0.15)' }}>
            <BookOpen size={18} />
          </div>
          <div className="min-w-0">
            <span className="admin-stat-label">Total Articles</span>
            <span className="admin-stat-value">{totalArticles}</span>
          </div>
        </div>

        <div className="glass-panel admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(255, 204, 0, 0.1)', color: '#ffcc00', borderColor: 'rgba(255, 204, 0, 0.15)' }}>
            <Tag size={18} />
          </div>
          <div className="min-w-0">
            <span className="admin-stat-label">Categories</span>
            <span className="admin-stat-value">{totalCategories}</span>
          </div>
        </div>

        <div className="glass-panel admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(50, 215, 75, 0.1)', color: '#32d74b', borderColor: 'rgba(50, 215, 75, 0.15)' }}>
            <TrendingUp size={18} />
          </div>
          <div className="min-w-0">
            <span className="admin-stat-label">Latest Publish</span>
            <span className="admin-stat-value-small">{latestPost?.date || 'No Posts'}</span>
          </div>
        </div>

        <div className="glass-panel admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(255, 204, 0, 0.1)', color: '#ffcc00', borderColor: 'rgba(255, 204, 0, 0.15)' }}>
            <MessageSquare size={18} />
          </div>
          <div className="min-w-0">
            <span className="admin-stat-label">Guest Requests</span>
            <span className="admin-stat-value">{pendingResult.success ? pendingResult.count : 0}</span>
          </div>
        </div>

        <div className="glass-panel admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(191, 90, 242, 0.1)', color: '#bf5af2', borderColor: 'rgba(191, 90, 242, 0.15)' }}>
            <PenLine size={18} />
          </div>
          <div className="min-w-0">
            <span className="admin-stat-label">Quick Action</span>
            <a href="/admin/new" className="text-sm font-semibold text-accent no-underline hover:underline">Write Article</a>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {recentPosts.length > 0 && (
        <div className="glass-panel admin-recent-section">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-muted flex-shrink-0" />
            <h2 className="text-base font-semibold text-white m-0">Recently Published</h2>
          </div>
          <div className="divide-y divide-white/5">
            {recentPosts.map((post, i) => (
              <div key={post.id} className="admin-recent-item">
                <span className="admin-recent-num">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="admin-recent-title">{post.title}</p>
                  <p className="admin-recent-excerpt">{post.excerpt}</p>
                </div>
                <div className="admin-recent-meta">
                  <span className="admin-recent-date">
                    <Calendar size={11} />
                    {post.date}
                  </span>
                  <span className="admin-recent-cat">{post.category || 'SEO'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AdminBlogList initialBlogs={blogs} />
    </div>
  );
}
