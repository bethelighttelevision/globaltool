import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free YouTube Thumbnail Downloader',
  description: 'Download YouTube thumbnails in all resolutions from HD to default.',
  alternates: {
    canonical: 'https://toolsnappy.com/youtube-thumbnail-downloader',
  },
  openGraph: {
    title: 'Free YouTube Thumbnail Downloader | ToolSnappy',
    description: 'Download YouTube thumbnails in all resolutions from HD to default.',
    url: 'https://toolsnappy.com/youtube-thumbnail-downloader',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Thumbnail Downloader | ToolSnappy',
    description: 'Download YouTube thumbnails in all resolutions from HD to default.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
