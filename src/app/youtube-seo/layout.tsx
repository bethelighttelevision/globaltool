import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free YouTube SEO Optimization Tool',
  description: 'Optimize your YouTube titles, descriptions, and tags for higher rankings. Free YouTube SEO tool with real-time scoring, keyword suggestions, and AI-powered title generation.',
  keywords: ['YouTube SEO', 'YouTube optimization', 'YouTube title generator', 'YouTube tags', 'video SEO', 'YouTube description', 'YouTube ranking', 'YouTube keyword tool'],
  alternates: {
    canonical: 'https://toolsnappy.com/youtube-seo',
  },
  openGraph: {
    title: 'Free YouTube SEO Optimization Tool | ToolSnappy',
    description: 'Optimize your YouTube titles, descriptions, and tags for higher rankings. Free YouTube SEO tool.',
    url: 'https://toolsnappy.com/youtube-seo',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube SEO Optimization Tool | ToolSnappy',
    description: 'Optimize your YouTube titles, descriptions, and tags for higher rankings. Free YouTube SEO tool.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
