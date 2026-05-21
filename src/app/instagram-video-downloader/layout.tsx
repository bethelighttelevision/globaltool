import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Instagram Video Downloader',
  description: 'Download Instagram videos and reels. Paste any Instagram URL and save videos directly.',
  alternates: {
    canonical: 'https://toolsnappy.com/instagram-video-downloader',
  },
  openGraph: {
    title: 'Free Instagram Video Downloader | ToolSnappy',
    description: 'Download Instagram videos and reels. Paste any Instagram URL and save videos directly.',
    url: 'https://toolsnappy.com/instagram-video-downloader',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Instagram Video Downloader | ToolSnappy',
    description: 'Download Instagram videos and reels. Paste any Instagram URL and save videos directly.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
