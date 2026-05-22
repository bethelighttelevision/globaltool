import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Image from "next/image";
import Link from 'next/link';
import AdSensePlaceholder from "../components/AdSensePlaceholder";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://toolsnappy.com'),
  title: {
    default: "ToolSnappy | #1 Free SEO & Social Media Suite 2026",
    template: "%s | ToolSnappy"
  },
  description: "Access 12+ professional, high-performance utility tools for SEO, Social Media, Crypto, and Developer productivity. Engineered for speed and precision.",
  keywords: ["SEO Tools", "Social Media Tools", "Crypto Calculator", "AI Hook Generator", "ToolSnappy"],
  authors: [{ name: "ToolSnappy Team" }],
  verification: {
    google: "SLVPBBxmjf4OTG8ool0m5oHhotoFZiK5K_16cpautYs",
  },
  openGraph: {
    title: "ToolSnappy | #1 Free SEO & Social Media Suite 2026",
    description: "Access 12+ professional, high-performance utility tools for SEO, Social Media, Crypto, and Developer productivity. Engineered for speed and precision.",
    url: "https://toolsnappy.com",
    siteName: "ToolSnappy",
    images: [{ url: "https://toolsnappy.com/logo.svg", width: 256, height: 256 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolSnappy | #1 Free SEO & Social Media Suite 2026",
    description: "Access 12+ professional, high-performance utility tools for SEO, Social Media, Crypto, and Developer productivity. Engineered for speed and precision.",
    images: ["https://toolsnappy.com/logo.svg"],
  },
  other: {
    "p:domain_verify": "5e08b56cf09560f4433892fbd07ddf1e",
    "msvalidate.01": "7E8B39598044C49710F7E7557E96FF46",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="alternate" href="https://toolsnappy.com" hrefLang="x-default" />
        <link rel="alternate" href="https://toolsnappy.com" hrefLang="en" />
        <link rel="alternate" href="https://toolsnappy.com" hrefLang="en-US" />
        <link rel="alternate" href="https://toolsnappy.com" hrefLang="en-GB" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://toolsnappy.com/#website",
              "url": "https://toolsnappy.com",
              "name": "ToolSnappy",
              "description": "Free SEO, social media, crypto & developer tools. 100% free, no sign-up required.",
              "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://toolsnappy.com/?s={search_term_string}" }, "query-input": "required name=search_term_string" }
            },
            {
              "@type": "Organization",
              "@id": "https://toolsnappy.com/#organization",
              "url": "https://toolsnappy.com",
              "name": "ToolSnappy",
              "logo": "https://toolsnappy.com/logo.svg",
              "description": "Engineered for speed, privacy, and digital dominance."
            },
            {
              "@type": "WebApplication",
              "@id": "https://toolsnappy.com/#webapp",
              "url": "https://toolsnappy.com",
              "name": "ToolSnappy",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            }
          ]
        }) }} />
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
                  <Image src="/logo-icon.svg" alt="ToolSnappy" width={40} height={40} style={{ objectFit: 'contain' }} />
                  <h3 style={{ fontSize: '18px', margin: 0, color: '#fff' }}>ToolSnappy</h3>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>The world&apos;s most advanced 100% free tool suite. Engineered for speed, privacy, and digital dominance in 2026.</p>
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
                  <Link href="/about" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>About Us</Link>
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
