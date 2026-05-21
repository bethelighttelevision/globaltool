import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free YouTube Thumbnail Tester',
  description: 'Preview your thumbnail in search results, suggested videos, and home page mockups.',
  alternates: {
    canonical: 'https://toolsnappy.com/youtube-thumbnail-tester',
  },
  openGraph: {
    title: 'Free YouTube Thumbnail Tester | ToolSnappy',
    description: 'Preview your thumbnail in search results, suggested videos, and home page mockups.',
    url: 'https://toolsnappy.com/youtube-thumbnail-tester',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Thumbnail Tester | ToolSnappy',
    description: 'Preview your thumbnail in search results, suggested videos, and home page mockups.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
