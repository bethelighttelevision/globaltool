import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Amazon Keyword Researcher',
  description: 'Generate Amazon keyword ideas with AI. Free tool for high-intent, long-tail, feature, and benefit keyword research organized by category.',
  alternates: {
    canonical: 'https://toolsnappy.com/amazon-keyword-tool',
  },
  openGraph: {
    title: 'Free Amazon Keyword Researcher | ToolSnappy',
    description: 'Generate Amazon keyword ideas with AI. Free tool for high-intent, long-tail, feature, and benefit keyword research organized by category.',
    url: 'https://toolsnappy.com/amazon-keyword-tool',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Amazon Keyword Researcher | ToolSnappy',
    description: 'Generate Amazon keyword ideas with AI. Free tool for high-intent, long-tail, feature, and benefit keyword research organized by category.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
