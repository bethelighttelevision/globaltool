import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Instagram Caption Generator',
  description: 'Generate AI-powered captions for Instagram reels and posts. Free Instagram caption generator.',
  alternates: {
    canonical: 'https://toolsnappy.com/instagram-caption',
  },
  openGraph: {
    title: 'Free Instagram Caption Generator | ToolSnappy',
    description: 'Generate AI-powered captions for Instagram reels and posts. Free Instagram caption generator.',
    url: 'https://toolsnappy.com/instagram-caption',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Instagram Caption Generator | ToolSnappy',
    description: 'Generate AI-powered captions for Instagram reels and posts. Free Instagram caption generator.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
