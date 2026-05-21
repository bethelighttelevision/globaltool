import React from 'react';
import Link from 'next/link';
import SEO from './SEO';
import AdSensePlaceholder from './AdSensePlaceholder';
import RelatedTools from './RelatedTools';
import { ArrowLeft } from 'lucide-react';

interface ToolLayoutProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  description: string;
  seo: {
    toolName: string;
    description: string;
    url: string;
  };
  contentSection?: React.ReactNode;
  currentPath: string;
  results?: React.ReactNode;
  simple?: boolean;
}

export default function ToolLayout({
  children,
  icon,
  title,
  description,
  seo,
  contentSection,
  currentPath,
  results,
  simple,
}: ToolLayoutProps) {
  if (simple) {
    return (
      <div className="content-container" style={{ padding: '32px 24px' }}>
        <SEO toolName={seo.toolName} description={seo.description} url={seo.url} />

        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: 'var(--muted)', textDecoration: 'none', marginBottom: '24px',
          fontSize: '13px',
        }}>
          <ArrowLeft size={14} /> Back
        </Link>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ color: 'var(--accent)' }}>{icon}</div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: 0 }}>{title}</h1>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>{description}</p>

          {children}
          {results && <div style={{ marginTop: '24px' }}>{results}</div>}
        </div>

        {contentSection && <div className="tool-content-section" style={{ maxWidth: '720px', margin: '0 auto', marginTop: '48px' }}>{contentSection}</div>}

        <div style={{ marginTop: '60px' }}>
          <AdSensePlaceholder type="mid-content" />
        </div>
        <RelatedTools currentPath={currentPath} />
      </div>
    );
  }

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO toolName={seo.toolName} description={seo.description} url={seo.url} />

      <Link
        href="/"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px',
          fontSize: '14px', transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
      >
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />

      <div className="glass-panel" style={{
        padding: '48px 32px', textAlign: 'center', marginBottom: '40px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
          background: 'radial-gradient(circle at 50% 50%, rgba(41,151,255,0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '80px', height: '80px',
          background: 'linear-gradient(135deg, rgba(41,151,255,0.15), rgba(41,151,255,0.05))',
          borderRadius: '24px', marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(41,151,255,0.15)',
          color: 'var(--accent)',
        }}>
          {icon}
        </div>

        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>
          {title}
        </h1>

        <p className="text-base sm:text-lg"
          style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          {description}
        </p>

        {children}
      </div>

      {results && (
        <div className="animate-slide-up" style={{ marginBottom: '40px' }}>
          {results}
        </div>
      )}

      {contentSection && (
        <div className="tool-content-section">
          {contentSection}
        </div>
      )}

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath={currentPath} />
    </div>
  );
}
