import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Content Humanizer Tool',
  description: 'Humanize AI text to bypass AI detectors. Free AI humanizer for ChatGPT, Claude, and Gemini content. Undetectable AI rewriting tool.',
  alternates: {
    canonical: 'https://toolsnappy.com/ai-humanizer',
  },
  openGraph: {
    title: 'Free AI Content Humanizer | ToolSnappy',
    description: 'Humanize AI text to bypass AI detectors. Free AI humanizer for ChatGPT, Claude, and Gemini content. Undetectable AI rewriting tool.',
    url: 'https://toolsnappy.com/ai-humanizer',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Content Humanizer | ToolSnappy',
    description: 'Humanize AI text to bypass AI detectors. Free AI humanizer for ChatGPT, Claude, and Gemini content.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
