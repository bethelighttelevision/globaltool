import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SEO Analyzer & Website Audit Tool',
  description: 'Audit any website instantly for SEO issues: missing meta tags, headings, image alt text, and more. Free real-time SEO analysis tool.',
  alternates: {
    canonical: 'https://toolsnappy.com/site-audit',
  },
  openGraph: {
    title: 'Free SEO Analyzer & Website Audit Tool | ToolSnappy',
    description: 'Audit any website instantly for SEO issues: missing meta tags, headings, image alt text, and more. Free real-time SEO analysis tool.',
    url: 'https://toolsnappy.com/site-audit',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Analyzer & Website Audit Tool | ToolSnappy',
    description: 'Audit any website instantly for SEO issues: missing meta tags, headings, image alt text, and more. Free real-time SEO analysis tool.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
