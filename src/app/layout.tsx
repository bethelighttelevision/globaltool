import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Link from 'next/link';
import AdSensePlaceholder from "../components/AdSensePlaceholder";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "ToolSnappy | #1 Free SEO & Social Media Suite 2026",
    template: "%s | ToolSnappy"
  },
  description: "Access 12+ professional, high-performance utility tools for SEO, Social Media, Crypto, and Developer productivity. Engineered for speed and precision.",
  keywords: ["SEO Tools", "Social Media Tools", "Crypto Calculator", "AI Hook Generator", "ToolSnappy"],
  authors: [{ name: "ToolSnappy Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WHHDYWK3F5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WHHDYWK3F5');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-background text-foreground" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <main style={{ flex: 1 }}>{children}</main>
        <footer style={{ marginTop: 'auto', padding: '60px 24px 40px', borderTop: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="content-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="/logo.png" alt="ToolSnappy" style={{ height: '32px', borderRadius: '50%' }} />
                  <h3 style={{ fontSize: '18px', margin: 0, color: '#fff' }}>ToolSnappy</h3>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>The world's most advanced 100% free tool suite. Engineered for speed, privacy, and digital dominance in 2026.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '16px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Popular Tools</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link href="/seo-analyzer" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>SEO Analyzer</Link>
                  <Link href="/crypto" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>Crypto Calculator</Link>
                  <Link href="/ai-hook" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>Viral Hook Gen</Link>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '16px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link href="/privacy-policy" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</Link>
                  <Link href="/terms" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</Link>
                  <Link href="/contact" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>Contact Us</Link>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ color: 'var(--muted)', fontSize: '12px' }}>&copy; 2026 ToolSnappy. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <AdSensePlaceholder type="footer" />
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
