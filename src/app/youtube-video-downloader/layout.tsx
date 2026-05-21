import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free YouTube Video Downloader',
  description: 'Download YouTube videos in HD quality. Paste any YouTube URL and save videos directly.',
  alternates: {
    canonical: 'https://toolsnappy.com/youtube-video-downloader',
  },
  openGraph: {
    title: 'Free YouTube Video Downloader | ToolSnappy',
    description: 'Download YouTube videos in HD quality. Paste any YouTube URL and save videos directly.',
    url: 'https://toolsnappy.com/youtube-video-downloader',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Video Downloader | ToolSnappy',
    description: 'Download YouTube videos in HD quality. Paste any YouTube URL and save videos directly.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
