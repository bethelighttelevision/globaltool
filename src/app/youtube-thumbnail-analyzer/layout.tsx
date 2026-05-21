import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free YouTube Thumbnail Analyzer',
  description: 'AI-powered thumbnail analysis with scores for composition, colors, text, and CTR.',
  alternates: {
    canonical: 'https://toolsnappy.com/youtube-thumbnail-analyzer',
  },
  openGraph: {
    title: 'Free YouTube Thumbnail Analyzer | ToolSnappy',
    description: 'AI-powered thumbnail analysis with scores for composition, colors, text, and CTR.',
    url: 'https://toolsnappy.com/youtube-thumbnail-analyzer',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Thumbnail Analyzer | ToolSnappy',
    description: 'AI-powered thumbnail analysis with scores for composition, colors, text, and CTR.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
