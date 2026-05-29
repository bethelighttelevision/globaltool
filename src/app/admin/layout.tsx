'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileEdit, ExternalLink, ArrowLeft, Menu, X, MessageSquare } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = 'Admin Dashboard | ToolSnappy';
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');
  }, []);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const navLinks = [
    { href: '/admin', label: 'Overview', icon: <LayoutDashboard size={16} />, exact: true },
    { href: '/admin/new', label: 'New Article', icon: <FileEdit size={16} />, exact: true },
    { href: '/admin/guest-requests', label: 'Guest Requests', icon: <MessageSquare size={16} />, exact: true },
  ];

  const bottomLinks = [
    { href: '/', label: 'Back to Tools', icon: <ArrowLeft size={15} /> },
  ];

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Mobile header bar */}
      <div className="admin-mobile-header">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="admin-menu-btn" aria-label="Toggle menu">
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <h2 className="admin-mobile-title">Creator Hub</h2>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar-open' : ''}`}>
        <div className="glass-panel admin-sidebar-inner">
          <div className="admin-sidebar-header">
            <h2 className="text-lg font-bold m-0 tracking-tight text-white">Creator Hub</h2>
            <p className="text-xs text-muted m-0 mt-0.5">Manage site insights & articles</p>
          </div>
          <div className="w-full h-px bg-white/8" />
          <nav className="flex flex-col gap-1.5">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="admin-nav-link"
                style={{
                  background: isActive(l.href, l.exact) ? 'rgba(41, 151, 255, 0.12)' : 'transparent',
                  color: isActive(l.href, l.exact) ? 'var(--accent)' : 'var(--muted)',
                  border: isActive(l.href, l.exact) ? '1px solid rgba(41, 151, 255, 0.2)' : '1px solid transparent',
                }}
              >
                {l.icon} {l.label}
              </Link>
            ))}
            {pathname.startsWith('/admin/edit/') && (
              <Link href="/admin" className="admin-nav-link"
                style={{ background: 'rgba(41, 151, 255, 0.12)', color: 'var(--accent)', border: '1px solid rgba(41, 151, 255, 0.2)' }}
              >
                <FileEdit size={16} /> Editing Mode
              </Link>
            )}
          </nav>
          <div className="w-full h-px bg-white/8" />
          <nav className="flex flex-col gap-1">
            {bottomLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="admin-nav-link text-foreground hover:text-accent"
                style={{ fontWeight: 400, background: 'transparent', border: '1px solid transparent', color: 'var(--foreground)' }}
              >
                {l.icon} {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="admin-main">{children}</main>

      <style jsx global>{`
        .admin-mobile-header {
          display: none;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(12px);
          padding: 12px 16px;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .admin-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: var(--foreground);
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .admin-menu-btn:hover { background: rgba(255,255,255,0.08); }
        .admin-mobile-title {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
        .admin-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 90;
        }
        .admin-sidebar {
          position: fixed;
          top: 70px;
          left: 0;
          width: 240px;
          height: calc(100vh - 70px);
          padding: 24px 16px 24px 24px;
          overflow-y: auto;
          z-index: 50;
          transition: transform 0.3s ease;
        }
        .admin-sidebar-inner {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .admin-sidebar-header { padding: 0; }
        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .admin-main {
          margin-left: 256px;
          padding: 32px 40px 80px;
          min-height: calc(100vh - 70px);
          position: relative;
          z-index: 1;
        }
        .admin-dashboard { display: flex; flex-direction: column; gap: 24px; }
        .admin-dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }
        .admin-title {
          font-size: 28px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 100px;
          background: rgba(50, 215, 75, 0.08);
          border: 1px solid rgba(50, 215, 75, 0.15);
          white-space: nowrap;
        }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .admin-stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
        }
        .admin-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid;
        }
        .admin-stat-label {
          display: block;
          font-size: 11px;
          color: var(--muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .admin-stat-value {
          display: block;
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          font-family: var(--font-heading, sans-serif);
        }
        .admin-stat-value-small {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          margin-top: 2px;
        }
        .admin-recent-section { padding: 24px; }
        .admin-recent-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
        }
        .admin-recent-num {
          font-size: 12px;
          color: var(--muted);
          width: 20px;
          text-align: right;
          font-family: monospace;
          flex-shrink: 0;
        }
        .admin-recent-title {
          font-size: 14px;
          color: #fff;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .admin-recent-excerpt {
          font-size: 12px;
          color: var(--muted);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .admin-recent-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .admin-recent-date {
          font-size: 12px;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .admin-recent-cat {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 100px;
          font-weight: 600;
          background: rgba(41, 151, 255, 0.1);
          color: #2997ff;
          border: 1px solid rgba(41, 151, 255, 0.2);
          white-space: nowrap;
        }

        .admin-list-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .admin-search-wrap {
          position: relative;
          flex: 1;
          min-width: 200px;
          max-width: 480px;
        }
        .admin-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .admin-search-input { padding-left: 48px !important; }
        .admin-write-btn {
          text-decoration: none;
          padding: 12px 20px;
          white-space: nowrap;
        }
        .admin-write-text { display: inline; }

        .admin-form-panel { padding: 32px; }
        .admin-form-actions {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
          align-items: center;
        }
        .admin-form-cancel {
          padding: 14px 28px;
          border-radius: 100px;
          font-weight: 600;
          text-decoration: none;
          color: var(--muted);
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          font-size: 14px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .admin-form-cancel:hover { color: #fff; }
        .admin-form-submit {
          padding: 14px 32px;
          min-width: 160px;
          white-space: nowrap;
        }

        @media (max-width: 1024px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 900px) {
          .admin-mobile-header { display: flex; }
          .admin-overlay { display: block; }
          .admin-sidebar {
            transform: translateX(-100%);
            top: 57px;
            height: calc(100vh - 57px);
            width: 280px;
            padding: 16px;
            background: var(--background);
          }
          .admin-sidebar-open { transform: translateX(0); }
          .admin-main {
            margin-left: 0;
            padding: 16px;
          }
          .admin-title { font-size: 22px; }
          .admin-badge { padding: 6px 12px; font-size: 11px; }
          .admin-recent-meta { flex-direction: column; align-items: flex-end; gap: 6px; }
          .admin-recent-item { gap: 12px; }
        }

        @media (max-width: 600px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .admin-stat-card { padding: 14px; gap: 12px; }
          .admin-stat-icon { width: 36px; height: 36px; }
          .admin-stat-icon svg { width: 16px; height: 16px; }
          .admin-stat-value { font-size: 20px; }
          .admin-recent-section { padding: 16px; }
          .admin-recent-item { flex-wrap: wrap; gap: 8px; }
          .admin-recent-meta { flex-direction: row; width: 100%; padding-left: 32px; justify-content: flex-start; gap: 8px; }
          .admin-recent-title { font-size: 13px; }
          .admin-list-bar { flex-direction: column; align-items: stretch; }
          .admin-search-wrap { max-width: 100%; min-width: 0; }
          .admin-write-btn { justify-content: center; }
          .admin-form-panel { padding: 16px !important; }
          .admin-form-actions { flex-direction: column-reverse; gap: 10px; }
          .admin-form-cancel, .admin-form-submit {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .admin-mobile-header { padding: 10px 12px; }
          .admin-sidebar { width: 100%; padding: 12px; }
          .admin-main { padding: 12px; }
          .admin-dashboard-header { flex-direction: column; }
          .admin-title { font-size: 18px; }
          .admin-badge { align-self: flex-start; }
          .admin-stats-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .admin-stat-card { padding: 12px; gap: 10px; }
          .admin-recent-item { flex-direction: column; align-items: flex-start; gap: 4px; }
          .admin-recent-num { display: none; }
          .admin-recent-meta { padding-left: 0; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
