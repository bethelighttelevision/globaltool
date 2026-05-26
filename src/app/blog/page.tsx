import React from 'react';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Blog | ToolSnappy',
  description: 'Coming soon — tutorials and guides on SEO, AI tools, digital marketing, and more.',
};

export default function BlogPage() {
  return (
    <div className="content-container animate-fade-in" style={{ padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '80px auto' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'rgba(41, 151, 255, 0.08)', 
          padding: '8px 16px', 
          borderRadius: '100px', 
          marginBottom: '24px', 
          border: '1px solid rgba(41, 151, 255, 0.15)',
        }}>
          <BookOpen size={16} color="var(--accent)" />
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)' }}>Blog</span>
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl font-bold" style={{ marginBottom: '16px' }}>
          Coming Soon
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
          We are working on fresh, practical guides to help you master SEO, AI tools, 
          digital marketing, and more. Check back soon for new articles.
        </p>
      </div>
    </div>
  );
}
