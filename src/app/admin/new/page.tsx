'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createAdminBlog } from '../../actions/blog';
import RichTextEditor from '../../../components/RichTextEditor';
import { ArrowLeft, Save, AlertCircle, Sparkles, Eye, EyeOff, Globe } from 'lucide-react';

export default function NewBlogPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('SEO');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('/blog-banner.png');
  const [date, setDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const excerptCount = excerpt.length;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    const generated = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generated);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) { setErrorMsg('Please enter an article title.'); return; }
    if (!slug.trim()) { setErrorMsg('Please enter an article slug.'); return; }
    if (!excerpt.trim()) { setErrorMsg('Please enter a short excerpt summary.'); return; }
    if (!content.trim() || content === '<p></p>') { setErrorMsg('Please write some content inside the editor.'); return; }

    startTransition(async () => {
      const result = await createAdminBlog({ title, slug, excerpt, content, image: image || '/blog-banner.png', date, category });
      if (result.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMsg(result.error || 'An unexpected error occurred while saving the post.');
      }
    });
  };

  const blockContent = useMemo(() => {
    if (!content || content === '<p></p>') return <p className="text-white/30 italic">No content yet.</p>;
    return <div className="prose prose-invert text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content.slice(0, 600) }} />;
  }, [content]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center justify-center w-10 h-10 bg-white/[0.03] border border-white/10 rounded-xl text-foreground hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="gradient-text text-2xl sm:text-3xl font-bold m-0 tracking-tight">Write New Guide</h1>
            <p className="text-muted text-sm m-0">Publish beautiful educational articles instantly.</p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="flex gap-3 items-center p-4 bg-red-500/8 border border-red-500/20 rounded-xl text-red-500 text-sm">
          <AlertCircle size={20} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* SEO Preview Card */}
      <div className="glass-panel p-4 flex items-start gap-4">
        <Globe size={18} className="text-accent mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted mb-1 font-medium uppercase tracking-wider">Search Preview</p>
          <p className="text-sm text-green-400 truncate">ToolSnappy.com/blog/{slug || 'your-article-slug'}</p>
          <p className="text-base text-accent font-semibold truncate">{title || 'Your Article Title'}</p>
          <p className="text-sm text-muted line-clamp-2">{excerpt || 'Your SEO summary will appear here...'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-panel p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text">Article Title</label>
              <input type="text" placeholder="e.g. Master Social Media Monetization in 2026" value={title} onChange={handleTitleChange} className="premium-input" required />
            </div>
            <div>
              <label className="label-text flex items-center gap-1.5">
                SEO URL Slug
                <span className="text-xs text-accent inline-flex items-center gap-1"><Sparkles size={10} /> Auto-Syncing</span>
              </label>
              <input type="text" placeholder="e.g. social-media-monetization-guide" value={slug} onChange={handleSlugChange} className="premium-input font-mono text-sm" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="label-text">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="premium-input" style={{ appearance: 'none', background: 'rgba(255,255,255,0.03)', color: 'var(--foreground)' }}>
                {['SEO', 'Marketing', 'AI Content', 'Crypto', 'Tech', 'Design'].map(c => (
                  <option key={c} value={c} style={{ background: '#1c1c1e' }}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Publishing Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="premium-input" required />
            </div>
            <div>
              <label className="label-text">Cover Image URL</label>
              <input type="text" placeholder="/blog-banner.png" value={image} onChange={(e) => setImage(e.target.value)} className="premium-input" />
            </div>
          </div>

          <div>
            <label className="label-text flex items-center justify-between">
              <span>Excerpt (SEO Summary)</span>
              <span className={`text-xs ${excerptCount > 160 ? 'text-amber-400' : 'text-muted'}`}>{excerptCount}/160</span>
            </label>
            <textarea placeholder="Provide a compelling 2-3 sentence overview that appears on the blog list cards..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="premium-input" rows={3} style={{ resize: 'vertical' }} required />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <label className="label-text m-0">Content Body</label>
            <button type="button" onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors">
              {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPreview ? 'Hide Preview' : 'Live Preview'}
            </button>
          </div>
          {showPreview ? (
            <div className="glass-panel p-6 min-h-[200px] prose prose-invert max-w-none">
              {blockContent}
              {content.length > 600 && <p className="text-xs text-muted mt-4 border-t border-white/10 pt-3">Showing first 600 characters...</p>}
            </div>
          ) : (
            <RichTextEditor content={content} onChange={(html) => setContent(html)} />
          )}
        </div>

        <div className="flex gap-4 justify-end items-center">
          <Link href="/admin" className="px-7 py-3.5 rounded-full font-semibold no-underline text-muted border border-white/10 bg-transparent text-sm hover:text-white transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={isPending} className="premium-button px-8 py-3.5 min-w-[160px] flex items-center gap-2 justify-center" style={{ opacity: isPending ? 0.7 : 1 }}>
            <Save size={16} />
            {isPending ? 'Publishing...' : 'Publish Guide'}
          </button>
        </div>
      </form>
    </div>
  );
}
