import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free TikTok Video Downloader',
  description: 'Download TikTok videos without watermark. Paste any TikTok URL and save videos directly.',
  alternates: {
    canonical: 'https://toolsnappy.com/tiktok-video-downloader',
  },
  openGraph: {
    title: 'Free TikTok Video Downloader | ToolSnappy',
    description: 'Download TikTok videos without watermark. Paste any TikTok URL and save videos directly.',
    url: 'https://toolsnappy.com/tiktok-video-downloader',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free TikTok Video Downloader | ToolSnappy',
    description: 'Download TikTok videos without watermark. Paste any TikTok URL and save videos directly.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
