import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free TikTok Hashtag Generator',
  description: 'Generate high-velocity trending hashtags for TikTok virality. Free online tool that analyzes your niche and suggests the best hashtag combinations for maximum reach.',
  keywords: ['TikTok hashtag generator', 'TikTok hashtags', 'trending hashtags TikTok', 'viral hashtags', 'TikTok growth', 'hashtag strategy', 'TikTok marketing tool', 'hashtag suggestions'],
  alternates: {
    canonical: 'https://toolsnappy.com/tiktok-hashtags',
  },
  openGraph: {
    title: 'Free TikTok Hashtag Generator | ToolSnappy',
    description: 'Generate high-velocity trending hashtags for TikTok virality. Free TikTok hashtag tool.',
    url: 'https://toolsnappy.com/tiktok-hashtags',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free TikTok Hashtag Generator | ToolSnappy',
    description: 'Generate high-velocity trending hashtags for TikTok virality. Free TikTok hashtag tool.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
