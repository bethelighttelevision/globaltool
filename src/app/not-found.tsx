import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="content-container" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{
          fontSize: '96px', fontWeight: 800, lineHeight: 1,
          background: 'linear-gradient(135deg, #2997ff 0%, #6366f1 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
        }}>404</div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="premium-button" style={{ padding: '12px 28px', fontSize: '14px', textDecoration: 'none' }}>
            Back to Home
          </Link>
          <Link href="/blog" className="modern-button" style={{ padding: '12px 28px', fontSize: '14px', textDecoration: 'none', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
            Browse Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
