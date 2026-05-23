import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Blog to Social Media Repurposer',
  description: 'Convert blog posts into social media content. Free content repurposing tool for Twitter, LinkedIn, Instagram, and email newsletters.',
  alternates: {
    canonical: 'https://toolsnappy.com/blog-to-social',
  },
  openGraph: {
    title: 'Free Blog to Social Media Repurposer | ToolSnappy',
    description: 'Convert blog posts into social media content. Free content repurposing tool for Twitter, LinkedIn, Instagram, and email newsletters.',
    url: 'https://toolsnappy.com/blog-to-social',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Blog to Social Media Repurposer | ToolSnappy',
    description: 'Convert blog posts into social media content. Free content repurposing tool for Twitter, LinkedIn, Instagram, and email newsletters.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
