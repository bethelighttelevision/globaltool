'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="content-container" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{
          fontSize: '96px', fontWeight: 800, lineHeight: 1,
          background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
        }}>500</div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Something went wrong</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
          An unexpected error occurred. Please try again later.
        </p>
        <button onClick={reset} className="premium-button" style={{ padding: '12px 28px', fontSize: '14px', border: 'none', cursor: 'pointer' }}>
          Try Again
        </button>
      </div>
    </div>
  );
}
