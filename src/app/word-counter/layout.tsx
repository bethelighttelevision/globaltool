import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Word Counter and Character Count',
  description: 'Count words, characters, sentences, and paragraphs online. Free word counter with readability analysis.',
  alternates: {
    canonical: 'https://toolsnappy.com/word-counter',
  },
  openGraph: {
    title: 'Free Word Counter and Character Count | ToolSnappy',
    description: 'Count words, characters, sentences, and paragraphs online. Free word counter with readability analysis.',
    url: 'https://toolsnappy.com/word-counter',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Word Counter and Character Count | ToolSnappy',
    description: 'Count words, characters, sentences, and paragraphs online. Free word counter with readability analysis.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
