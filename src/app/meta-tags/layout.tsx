import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Meta Tags Generator',
  description: 'Generate perfect HTML meta tags and Open Graph tags for SEO. Free meta tag builder tool.',
  alternates: {
    canonical: 'https://toolsnappy.com/meta-tags',
  },
  openGraph: {
    title: 'Free Meta Tags Generator | ToolSnappy',
    description: 'Generate perfect HTML meta tags and Open Graph tags for SEO. Free meta tag builder tool.',
    url: 'https://toolsnappy.com/meta-tags',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Meta Tags Generator | ToolSnappy',
    description: 'Generate perfect HTML meta tags and Open Graph tags for SEO. Free meta tag builder tool.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
