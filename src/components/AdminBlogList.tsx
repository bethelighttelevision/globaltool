'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Edit3, Trash2, Calendar, FileText, FolderPlus, Tag } from 'lucide-react';
import { deleteAdminBlog } from '../app/actions/blog';

interface Blog {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category?: string;
}

interface AdminBlogListProps {
  initialBlogs: Blog[];
}

export default function AdminBlogList({ initialBlogs }: AdminBlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [, startTransition] = useTransition();

  // Search filter
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (blog.category || 'SEO').toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string | number, slug: string) => {
    if (!window.confirm(`Are you sure you want to delete the article: "${blogs.find(b => b.id === id)?.title}"?`)) {
      return;
    }

    setDeletingId(id);
    
    startTransition(async () => {
      const result = await deleteAdminBlog(String(id), slug);
      if (result.success) {
        setBlogs(prev => prev.filter(blog => blog.id !== id));
      } else {
        alert(`Failed to delete post: ${result.error}`);
      }
      setDeletingId(null);
    });
  };

  const getCategoryColor = (category: string = 'SEO') => {
    switch (category.toUpperCase()) {
      case 'SEO': return { bg: 'rgba(41, 151, 255, 0.1)', text: '#2997ff', border: '1px solid rgba(41, 151, 255, 0.2)' };
      case 'MARKETING': return { bg: 'rgba(50, 215, 75, 0.1)', text: '#32d74b', border: '1px solid rgba(50, 215, 75, 0.2)' };
      case 'AI CONTENT': return { bg: 'rgba(255, 69, 58, 0.1)', text: '#ff453a', border: '1px solid rgba(255, 69, 58, 0.2)' };
      case 'CRYPTO': return { bg: 'rgba(255, 214, 10, 0.1)', text: '#ffd60a', border: '1px solid rgba(255, 214, 10, 0.2)' };
      default: return { bg: 'rgba(163, 163, 163, 0.1)', text: '#a3a3a3', border: '1px solid rgba(163, 163, 163, 0.2)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Search and Action Bar */}
      <div className="admin-list-bar">
        <div className="admin-search-wrap">
          <Search size={18} color="var(--muted)" className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field admin-search-input"
          />
        </div>
        
        <Link href="/admin/new" className="premium-button admin-write-btn">
          <FolderPlus size={16} />
          <span className="admin-write-text">Write Article</span>
        </Link>
      </div>

      {/* Blogs Listing Container */}
      <div className="glass-panel" style={{ padding: '0px', overflow: 'hidden' }}>
        {filteredBlogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--muted)' }}>
            <FileText size={48} style={{ marginBottom: '16px', opacity: 0.3, display: 'inline-block' }} />
            <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>No Articles Found</h3>
            <p style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
              {searchQuery ? 'Try adjusting your search filters or queries.' : 'Get started by publishing your very first article.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.02)' }}>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase' }}>Article</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => {
                  const colors = getCategoryColor(blog.category);
                  const isCurrentDeleting = deletingId === blog.id;

                  return (
                    <tr 
                      key={blog.id} 
                      style={{ 
                        borderBottom: '1px solid var(--card-border)',
                        transition: 'background-color 0.2s',
                        opacity: isCurrentDeleting ? 0.4 : 1
                      }}
                      className="hover:bg-white/3"
                    >
                      {/* Cover Image & Metadata */}
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <Image 
                            src={blog.image || '/blog-banner.png'} 
                            alt={blog.title} 
                            width={56}
                            height={42}
                            style={{ 
                              borderRadius: '8px', 
                              objectFit: 'cover',
                              border: '1px solid var(--card-border)'
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <h4 style={{ fontSize: '15px', color: '#fff', margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '380px' }}>
                              {blog.title}
                            </h4>
                            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '380px' }}>
                              {blog.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category Pill */}
                      <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: colors.bg,
                          color: colors.text,
                          border: colors.border
                        }}>
                          <Tag size={10} />
                          {blog.category || 'SEO'}
                        </span>
                      </td>

                      {/* Date */}
                      <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: 'var(--muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={14} />
                          {blog.date}
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td style={{ padding: '16px 24px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end' }}>
                          
                          {/* Edit button */}
                          <Link 
                            href={`/admin/edit/${blog.id}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--card-border)',
                              color: 'var(--foreground)',
                              transition: 'all 0.2s',
                              cursor: 'pointer'
                            }}
                            className="hover:border-[#2997ff] hover:text-[#2997ff]"
                            title="Edit Article"
                          >
                            <Edit3 size={15} />
                          </Link>

                          {/* Delete button */}
                          <button
                            onClick={() => handleDelete(blog.id, blog.slug)}
                            disabled={isCurrentDeleting}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              background: 'rgba(255, 69, 58, 0.08)',
                              border: '1px solid rgba(255, 69, 58, 0.15)',
                              color: '#ff453a',
                              transition: 'all 0.2s',
                              cursor: 'pointer'
                            }}
                            className="hover:bg-[#ff453a]/20 disabled:opacity-40"
                            title="Delete Article"
                          >
                            <Trash2 size={15} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
