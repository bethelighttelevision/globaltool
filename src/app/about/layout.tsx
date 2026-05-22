import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ToolSnappy — our mission to provide free, professional utility tools for digital creators, small businesses, and online entrepreneurs worldwide.',
  alternates: {
    canonical: 'https://toolsnappy.com/about',
  },
  openGraph: {
    title: 'About Us | ToolSnappy',
    description: 'Learn about ToolSnappy — our mission to provide free, professional utility tools for digital creators, small businesses, and online entrepreneurs worldwide.',
    url: 'https://toolsnappy.com/about',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | ToolSnappy',
    description: 'Learn about ToolSnappy — our mission to provide free, professional utility tools for digital creators, small businesses, and online entrepreneurs worldwide.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
