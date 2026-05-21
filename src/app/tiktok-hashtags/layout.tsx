import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free TikTok Hashtag Generator',
  description: 'Generate high-velocity trending hashtags for TikTok virality. Free TikTok hashtag tool.',
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
