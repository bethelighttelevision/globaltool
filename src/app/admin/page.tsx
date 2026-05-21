import React from 'react';
import { getAdminBlogs } from '../actions/blog';
import AdminBlogList from '../../components/AdminBlogList';
import { blogPosts } from '../../data/posts';
import { BookOpen, Tag, Calendar, ShieldCheck, TrendingUp, Clock, PenLine } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const result = await getAdminBlogs();
  
  const slugToCategory = new Map(blogPosts.map(p => [p.slug, p.category]));
  type DbRow = { id: string | number; title: string; slug: string; excerpt: string; image: string; date: string; category?: string };
  const blogs = (result.data || []).map((d: DbRow) => ({
    id: String(d.id),
    title: d.title || '',
    slug: d.slug || '',
    excerpt: d.excerpt || '',
    image: d.image || '/blog-banner.png',
    date: d.date || '',
    category: d.category || slugToCategory.get(d.slug) || 'SEO',
  }));

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
    <div className="space-y-8">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="gradient-text text-3xl font-bold m-0 tracking-tight">System Dashboard</h1>
          <p className="text-muted m-0 text-sm">Monitor public guides, tutorials, and digital analytics.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-green-500/8 px-4 py-2 rounded-full border border-green-500/15 shadow-sm shadow-green-500/5">
          <ShieldCheck size={16} className="text-green-400" />
          <span className="text-xs font-semibold text-green-400">Supabase Secure Session</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 flex gap-4 items-center">
          <div className="w-11 h-11 bg-blue-500/8 rounded-xl flex items-center justify-center text-accent border border-blue-500/15 flex-shrink-0">
            <BookOpen size={18} />
          </div>
          <div className="min-w-0">
            <span className="block text-xs text-muted font-medium uppercase tracking-wider">Total Articles</span>
            <span className="text-2xl font-bold text-white font-heading">{totalArticles}</span>
          </div>
        </div>

        <div className="glass-panel p-5 flex gap-4 items-center">
          <div className="w-11 h-11 bg-yellow-500/8 rounded-xl flex items-center justify-center text-yellow-400 border border-yellow-500/15 flex-shrink-0">
            <Tag size={18} />
          </div>
          <div className="min-w-0">
            <span className="block text-xs text-muted font-medium uppercase tracking-wider">Categories</span>
            <span className="text-2xl font-bold text-white font-heading">{totalCategories}</span>
          </div>
        </div>

        <div className="glass-panel p-5 flex gap-4 items-center">
          <div className="w-11 h-11 bg-green-500/8 rounded-xl flex items-center justify-center text-green-400 border border-green-500/15 flex-shrink-0">
            <TrendingUp size={18} />
          </div>
          <div className="min-w-0">
            <span className="block text-xs text-muted font-medium uppercase tracking-wider">Latest Publish</span>
            <span className="text-sm font-bold text-white font-heading block truncate mt-0.5">{latestPost?.date || 'No Posts'}</span>
          </div>
        </div>

        <div className="glass-panel p-5 flex gap-4 items-center">
          <div className="w-11 h-11 bg-purple-500/8 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/15 flex-shrink-0">
            <PenLine size={18} />
          </div>
          <div className="min-w-0">
            <span className="block text-xs text-muted font-medium uppercase tracking-wider">Quick Action</span>
            <a href="/admin/new" className="text-sm font-semibold text-accent no-underline hover:underline">Write Article</a>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {recentPosts.length > 0 && (
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted" />
            <h2 className="text-base font-semibold text-white m-0">Recently Published</h2>
          </div>
          <div className="divide-y divide-white/5">
            {recentPosts.map((post, i) => (
              <div key={post.id} className="flex items-center gap-4 py-3">
                <span className="text-xs text-muted w-5 text-right font-mono">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate m-0">{post.title}</p>
                  <p className="text-xs text-muted truncate m-0">{post.excerpt}</p>
                </div>
                <span className="text-xs text-muted whitespace-nowrap flex items-center gap-1.5">
                  <Calendar size={11} />
                  {post.date}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: 'rgba(41, 151, 255, 0.1)',
                    color: '#2997ff',
                    border: '1px solid rgba(41, 151, 255, 0.2)'
                  }}
                >
                  {post.category || 'SEO'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <AdminBlogList initialBlogs={blogs} />
    </div>
  );
}
