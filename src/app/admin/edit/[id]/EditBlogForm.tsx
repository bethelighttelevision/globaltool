'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateAdminBlog } from '../../../actions/blog';
import RichTextEditor from '../../../../components/RichTextEditor';
import { ArrowLeft, Save, AlertCircle, Trash2 } from 'lucide-react';

interface Blog {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category?: string;
  content: string;
}

interface EditBlogFormProps {
  initialBlog: Blog;
  id: string;
}

export default function EditBlogForm({ initialBlog, id }: EditBlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form Fields State
  const [title, setTitle] = useState(initialBlog.title || '');
  const [slug, setSlug] = useState(initialBlog.slug || '');
  const [category, setCategory] = useState(initialBlog.category || 'SEO');
  const [excerpt, setExcerpt] = useState(initialBlog.excerpt || '');
  const [image, setImage] = useState(initialBlog.image || '/blog-banner.png');
  const [date, setDate] = useState(initialBlog.date || '');
  const [content, setContent] = useState(initialBlog.content || '');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter an article title.');
      return;
    }
    if (!slug.trim()) {
      setErrorMsg('Please enter an article slug.');
      return;
    }
    if (!excerpt.trim()) {
      setErrorMsg('Please enter a short excerpt summary.');
      return;
    }
    if (!content.trim() || content === '<p></p>') {
      setErrorMsg('Please write some content inside the editor.');
      return;
    }

    startTransition(async () => {
      const result = await updateAdminBlog(id, {
        title,
        slug,
        excerpt,
        content,
        image: image || '/blog-banner.png',
        date,
        category,
      });

      if (result.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMsg(result.error || 'An unexpected error occurred while updating the post.');
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link 
            href="/admin" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '40px', 
              height: '40px', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--card-border)', 
              borderRadius: '12px',
              color: 'var(--foreground)'
            }}
            className="hover:bg-white/10"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="gradient-text text-2xl sm:text-3xl font-bold" style={{ margin: 0, letterSpacing: '-0.02em' }}>
              Edit Guide
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
              Update and modify article details on the fly.
            </p>
          </div>
        </div>
      </div>

      {/* Error message indicator */}
      {errorMsg && (
        <div style={{ 
          background: 'rgba(255, 69, 58, 0.08)', 
          border: '1px solid rgba(255, 69, 58, 0.2)', 
          padding: '16px 20px', 
          borderRadius: '16px', 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center',
          color: '#ff453a',
          fontSize: '14px'
        }}>
          <AlertCircle size={20} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Write Post Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Core fields panel */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="content-container [style*='grid-template-columns']">
            {/* Title */}
            <div>
              <label className="label-text">Article Title</label>
              <input
                type="text"
                placeholder="e.g. Master Social Media Monetization in 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="premium-input"
                required
              />
            </div>

            {/* SEO Slug */}
            <div>
              <label className="label-text">SEO URL Slug</label>
              <input
                type="text"
                placeholder="e.g. social-media-monetization-guide"
                value={slug}
                onChange={handleSlugChange}
                className="premium-input"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }} className="content-container [style*='grid-template-columns']">
            {/* Category Select */}
            <div>
              <label className="label-text">Category Tag</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="premium-input"
                style={{ appearance: 'none', background: 'rgba(255,255,255,0.03)', color: 'var(--foreground)' }}
              >
                <option value="SEO" style={{ background: '#1c1c1e' }}>SEO</option>
                <option value="Marketing" style={{ background: '#1c1c1e' }}>Marketing</option>
                <option value="AI Content" style={{ background: '#1c1c1e' }}>AI Content</option>
                <option value="Crypto" style={{ background: '#1c1c1e' }}>Crypto</option>
                <option value="Tech" style={{ background: '#1c1c1e' }}>Tech</option>
                <option value="Design" style={{ background: '#1c1c1e' }}>Design</option>
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="label-text">Publishing Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="premium-input"
                required
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="label-text">Cover Image URL</label>
              <input
                type="text"
                placeholder="/blog-banner.png"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="premium-input"
              />
            </div>
          </div>

          {/* Excerpt Summary */}
          <div>
            <label className="label-text">Short Excerpt (SEO Summary Card)</label>
            <textarea
              placeholder="Provide a compelling 2-3 sentence overview that appears on the blog list cards..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="premium-input"
              rows={3}
              style={{ resize: 'vertical' }}
              required
            />
          </div>

        </div>

        {/* TipTap Rich Visual Content Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label className="label-text" style={{ paddingLeft: '8px' }}>Visual Post Body Content</label>
          <RichTextEditor
            content={content}
            onChange={(html) => setContent(html)}
          />
        </div>

        {/* Form Submission Actions */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Link
            href="/admin"
            style={{
              padding: '14px 28px',
              borderRadius: '980px',
              fontWeight: '600',
              textDecoration: 'none',
              color: 'var(--muted)',
              border: '1px solid var(--card-border)',
              background: 'transparent',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            className="hover:text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="premium-button"
            style={{ padding: '14px 32px', minWidth: '160px', opacity: isPending ? 0.7 : 1 }}
          >
            <Save size={16} />
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </form>
    </div>
  );
}
