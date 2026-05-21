import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free YouTube Tag Extractor',
  description: 'Extract video tags, hashtags, and keywords from any YouTube video.',
  alternates: {
    canonical: 'https://toolsnappy.com/youtube-tag-extractor',
  },
  openGraph: {
    title: 'Free YouTube Tag Extractor | ToolSnappy',
    description: 'Extract video tags, hashtags, and keywords from any YouTube video.',
    url: 'https://toolsnappy.com/youtube-tag-extractor',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Tag Extractor | ToolSnappy',
    description: 'Extract video tags, hashtags, and keywords from any YouTube video.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
