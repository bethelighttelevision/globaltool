import React from 'react';
import { getGuestRequests } from '../../actions/blog';
import { MessageSquare, Mail, Globe, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string; icon: React.ReactNode; label: string }> = {
    pending: { bg: 'rgba(255, 204, 0, 0.1)', color: '#ffcc00', icon: <Clock size={12} />, label: 'Pending' },
    approved: { bg: 'rgba(50, 215, 75, 0.1)', color: '#32d74b', icon: <CheckCircle size={12} />, label: 'Approved' },
    rejected: { bg: 'rgba(255, 69, 58, 0.1)', color: '#ff453a', icon: <XCircle size={12} />, label: 'Rejected' },
  };
  const s = styles[status] || styles.pending;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.color}20` }}>
      {s.icon} {s.label}
    </span>
  );
}

export default async function GuestRequestsPage() {
  const result = await getGuestRequests();
  const requests = result.success ? result.data : [];

  const pendingCount = requests.filter((r: any) => r.status === 'pending').length;

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1 className="admin-title gradient-text">Guest Requests</h1>
          <p className="text-muted m-0 text-sm">Manage guest post submissions from write-for-us page.</p>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', background: 'rgba(255, 204, 0, 0.08)', border: '1px solid rgba(255, 204, 0, 0.15)', whiteSpace: 'nowrap' }}>
          <AlertCircle size={16} style={{ color: '#ffcc00' }} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffcc00' }}>{pendingCount} Pending</span>
        </div>
      </div>

      {!result.success && (
        <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 69, 58, 0.08)', border: '1px solid rgba(255, 69, 58, 0.15)', color: '#ff453a', fontSize: '14px' }}>
          Error loading requests: {result.error}
        </div>
      )}

      {requests.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(41, 151, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--accent)' }}>
            <MessageSquare size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>No Guest Requests Yet</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Submissions from <Link href="/write-for-us" style={{ color: 'var(--accent)' }}>write-for-us</Link> page will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {requests.map((req: any) => (
            <div key={req.id} className="glass-panel" style={{ padding: '24px', borderLeft: `4px solid ${req.status === 'pending' ? '#ffcc00' : req.status === 'approved' ? '#32d74b' : '#ff453a'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(41, 151, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '16px', fontWeight: 700 }}>
                    {req.author_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>{req.author_name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <Mail size={11} style={{ color: 'var(--muted)' }} />
                      <a href={`mailto:${req.author_email}`} style={{ color: 'var(--accent)', fontSize: '13px', textDecoration: 'none' }}>{req.author_email}</a>
                      {req.website && (
                        <>
                          <Globe size={11} style={{ color: 'var(--muted)' }} />
                          <a href={req.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontSize: '13px', textDecoration: 'none' }}>{new URL(req.website).hostname}</a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <StatusBadge status={req.status} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FileText size={14} style={{ color: 'var(--accent)' }} />
                  <h5 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>{req.topic}</h5>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{req.outline}</p>
              </div>

              {req.message && (
                <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', marginBottom: '12px' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '12px', fontStyle: 'italic', margin: 0 }}>{req.message}</p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'var(--muted)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={11} /> {req.created_at ? new Date(req.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Unknown'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
