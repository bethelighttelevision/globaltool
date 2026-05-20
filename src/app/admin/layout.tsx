'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileEdit, ExternalLink, ArrowLeft } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Overview Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      name: 'Write New Post',
      href: '/admin/new',
      icon: FileEdit,
      active: pathname === '/admin/new',
    },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Background Glow Accents */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(41, 151, 255, 0.08) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(41, 151, 255, 0.05) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="content-container animate-fade-in" style={{ position: 'relative', zIndex: 1, padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }} className="mobile-admin-grid">
          
          {/* Dashboard Sidebar */}
          <aside>
            <div className="glass-panel" style={{ 
              padding: '24px', 
              position: 'sticky', 
              top: '94px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px',
              height: 'fit-content'
            }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0', letterSpacing: '-0.02em', color: '#fff' }}>
                  Creator Hub
                </h2>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
                  Manage site insights & articles
                </p>
              </div>

              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

              {/* Sub-Navigation Links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        background: item.active ? 'rgba(41, 151, 255, 0.12)' : 'transparent',
                        color: item.active ? 'var(--accent)' : 'var(--muted)',
                        border: item.active ? '1px solid rgba(41, 151, 255, 0.2)' : '1px solid transparent',
                      }}
                      className="admin-sidebar-link"
                    >
                      <Icon size={16} color={item.active ? 'var(--accent)' : 'var(--muted)'} />
                      {item.name}
                    </Link>
                  );
                })}

                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />

                {/* External Utility Links */}
                <Link
                  href="/blog"
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--foreground)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-[#2997ff]"
                >
                  <ExternalLink size={16} style={{ opacity: 0.6 }} />
                  View Live Blog
                </Link>

                <Link
                  href="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--foreground)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-red-400"
                >
                  <ArrowLeft size={16} style={{ opacity: 0.6 }} />
                  Back to Tools
                </Link>
              </nav>
            </div>
          </aside>

          {/* Core Content Area */}
          <main style={{ minWidth: 0 }}>
            {children}
          </main>
        </div>
      </div>

      {/* Local Responsive Style Injection */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .mobile-admin-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          
          .admin-sidebar-link {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
