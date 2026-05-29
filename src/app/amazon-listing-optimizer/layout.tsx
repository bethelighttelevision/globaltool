import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Amazon Listing Optimizer',
  description: 'Generate optimized Amazon product listings with AI. Free tool for creating titles, bullet points, descriptions, and backend search terms.',
  alternates: {
    canonical: 'https://toolsnappy.com/amazon-listing-optimizer',
  },
  openGraph: {
    title: 'Free Amazon Listing Optimizer | ToolSnappy',
    description: 'Generate optimized Amazon product listings with AI. Free tool for creating titles, bullet points, descriptions, and backend search terms.',
    url: 'https://toolsnappy.com/amazon-listing-optimizer',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Amazon Listing Optimizer | ToolSnappy',
    description: 'Generate optimized Amazon product listings with AI. Free tool for creating titles, bullet points, descriptions, and backend search terms.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
