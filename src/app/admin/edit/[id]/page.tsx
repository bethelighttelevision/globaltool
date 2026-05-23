import React from 'react';
import { getAdminBlogById } from '../../../actions/blog';
import { blogPosts } from '../../../../data/posts';
import EditBlogForm from './EditBlogForm';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getAdminBlogById(id);

  if (result.success && result.data) {
    const blog = {
      id: String(result.data.id),
      title: result.data.title || '',
      slug: result.data.slug || '',
      excerpt: result.data.excerpt || '',
      image: result.data.image || '/blog-banner.png',
      date: result.data.date || '',
      category: result.data.category || 'SEO',
      content: result.data.content || '',
    };
    return <EditBlogForm initialBlog={blog} id={id} />;
  }

  const staticPost = blogPosts.find(p => p.id === id);
  if (staticPost) {
    return (
      <div className="space-y-6">
        <div className="glass-panel p-4 flex items-start gap-3" style={{ borderLeft: '4px solid #ffcc00' }}>
          <FileText size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-400 m-0">Static Article — Save to Database</p>
            <p className="text-xs text-muted m-0 mt-1">
              This article exists in the static file. Editing and saving will create a database copy.
            </p>
          </div>
        </div>
        <EditBlogForm
          initialBlog={{
            id: staticPost.id,
            title: staticPost.title,
            slug: staticPost.slug,
            excerpt: staticPost.excerpt,
            image: staticPost.image || '/blog-banner.png',
            date: staticPost.date,
            category: staticPost.category || 'SEO',
            content: staticPost.content,
          }}
          id={id}
          isStatic={true}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
      <div className="glass-panel" style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'rgba(255, 69, 58, 0.08)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff453a',
          border: '1px solid rgba(255, 69, 58, 0.15)'
        }}>
          <AlertTriangle size={32} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', color: '#fff', fontWeight: '700', marginBottom: '8px' }}>
            Article Not Found
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
            The blog article with ID &ldquo;{id}&rdquo; could not be retrieved from the database. It may have been deleted or the link is invalid.
          </p>
        </div>
        <Link 
          href="/admin" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '980px',
            background: 'var(--accent)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none'
          }}
          className="hover:scale-105 transition-transform"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
