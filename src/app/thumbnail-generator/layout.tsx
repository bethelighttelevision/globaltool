import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI YouTube Thumbnail Generator',
  description: 'Create professional YouTube thumbnails with AI. Free online tool with text overlay, color editing, and one-click download. No sign-up required.',
  keywords: ['YouTube thumbnail generator', 'AI thumbnail maker', 'free thumbnail creator', 'YouTube thumbnail editor', 'thumbnail maker online', 'AI thumbnail generator', 'custom YouTube thumbnail', 'video thumbnail creator'],
  alternates: {
    canonical: 'https://toolsnappy.com/thumbnail-generator',
  },
  openGraph: {
    title: 'Free AI YouTube Thumbnail Generator | ToolSnappy',
    description: 'Create professional YouTube thumbnails with AI. Free online tool with text overlay, color editing, and one-click download.',
    url: 'https://toolsnappy.com/thumbnail-generator',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI YouTube Thumbnail Generator | ToolSnappy',
    description: 'Create professional YouTube thumbnails with AI. Free online tool with text overlay and color editing.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
