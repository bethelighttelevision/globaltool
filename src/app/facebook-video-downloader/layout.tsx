import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Facebook Video Downloader',
  description: 'Download Facebook videos in HD. Paste any Facebook video URL and save directly.',
  alternates: {
    canonical: 'https://toolsnappy.com/facebook-video-downloader',
  },
  openGraph: {
    title: 'Free Facebook Video Downloader | ToolSnappy',
    description: 'Download Facebook videos in HD. Paste any Facebook video URL and save directly.',
    url: 'https://toolsnappy.com/facebook-video-downloader',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Facebook Video Downloader | ToolSnappy',
    description: 'Download Facebook videos in HD. Paste any Facebook video URL and save directly.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
