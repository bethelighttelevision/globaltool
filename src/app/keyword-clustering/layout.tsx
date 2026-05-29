import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Keyword Clustering Tool',
  description: 'Free keyword clustering tool. Group keywords by topic and search intent for SEO content planning. Analyze and organize hundreds of keywords into actionable clusters instantly.',
  keywords: ['keyword clustering', 'keyword grouping', 'SEO keyword clusters', 'topic clustering', 'search intent grouping', 'keyword organization', 'content planning tool', 'SEO content strategy'],
  alternates: {
    canonical: 'https://toolsnappy.com/keyword-clustering',
  },
  openGraph: {
    title: 'Free Keyword Clustering Tool | ToolSnappy',
    description: 'Free keyword clustering tool. Group keywords by topic and search intent for SEO content planning.',
    url: 'https://toolsnappy.com/keyword-clustering',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Keyword Clustering Tool | ToolSnappy',
    description: 'Group keywords by topic and search intent for SEO content planning.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
