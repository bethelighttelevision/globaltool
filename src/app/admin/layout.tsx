'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileEdit, ExternalLink, ArrowLeft } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--background)', color: 'var(--foreground)' }}>
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(41, 151, 255, 0.08) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(41, 151, 255, 0.05) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="animate-fade-in" style={{ position: 'relative', zIndex: 1, padding: '40px 48px', maxWidth: '100%', margin: 0 }}>
        <div className="admin-grid">
          <aside className="admin-sidebar">
            <div className="glass-panel p-6 sticky top-24 flex flex-col gap-5 h-fit">
              <div>
                <h2 className="text-lg font-bold m-0 tracking-tight text-white">Creator Hub</h2>
                <p className="text-xs text-muted m-0 mt-0.5">Manage site insights & articles</p>
              </div>

              <div className="w-full h-px bg-white/8" />

              <nav className="flex flex-col gap-1.5">
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all duration-200"
                  style={{
                    background: pathname === '/admin' ? 'rgba(41, 151, 255, 0.12)' : 'transparent',
                    color: pathname === '/admin' ? 'var(--accent)' : 'var(--muted)',
                    border: pathname === '/admin' ? '1px solid rgba(41, 151, 255, 0.2)' : '1px solid transparent',
                  }}
                >
                  <LayoutDashboard size={16} />
                  Overview
                </Link>

                <Link
                  href="/admin/new"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all duration-200"
                  style={{
                    background: pathname === '/admin/new' ? 'rgba(41, 151, 255, 0.12)' : 'transparent',
                    color: pathname === '/admin/new' ? 'var(--accent)' : 'var(--muted)',
                    border: pathname === '/admin/new' ? '1px solid rgba(41, 151, 255, 0.2)' : '1px solid transparent',
                  }}
                >
                  <FileEdit size={16} />
                  New Article
                </Link>

                {(pathname.startsWith('/admin/edit/')) && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all duration-200"
                    style={{
                      background: 'rgba(41, 151, 255, 0.12)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(41, 151, 255, 0.2)',
                    }}
                  >
                    <FileEdit size={16} />
                    Editing Mode
                  </Link>
                )}
              </nav>

              <div className="w-full h-px bg-white/8" />

              <nav className="flex flex-col gap-1">
                <Link
                  href="/blog"
                  target="_blank"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground no-underline hover:text-accent transition-colors"
                >
                  <ExternalLink size={15} className="opacity-60" />
                  View Live Blog
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground no-underline hover:text-red-400 transition-colors"
                >
                  <ArrowLeft size={15} className="opacity-60" />
                  Back to Tools
                </Link>
              </nav>
            </div>
          </aside>

          <main className="admin-main">
            {children}
          </main>
        </div>
      </div>

      <style jsx global>{`
        .admin-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
        }

        .admin-sidebar {
          position: sticky;
          top: 24px;
          height: fit-content;
        }

        @media (max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .admin-sidebar {
            position: static !important;
          }
          .admin-sidebar > .glass-panel {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .admin-sidebar > .glass-panel > :first-child,
          .admin-sidebar > .glass-panel > .w-full {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 500px) {
          .admin-sidebar > .glass-panel {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
