import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Viral Hook Generator',
  description: 'Generate viral content hooks for social media using AI. Free hook generator for TikTok, Instagram, and YouTube. Use proven psychological frameworks to boost retention and engagement.',
  keywords: ['hook generator', 'viral hook', 'content hook', 'AI hook generator', 'TikTok hook ideas', 'Instagram hook', 'YouTube hook', 'viral content', 'engagement booster'],
  alternates: {
    canonical: 'https://toolsnappy.com/ai-hook',
  },
  openGraph: {
    title: 'Free AI Viral Hook Generator | ToolSnappy',
    description: 'Generate viral content hooks for social media using AI. Free hook generator for TikTok, Instagram, YouTube.',
    url: 'https://toolsnappy.com/ai-hook',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Viral Hook Generator | ToolSnappy',
    description: 'Generate viral content hooks for social media using AI. Free hook generator for TikTok, Instagram, YouTube.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
