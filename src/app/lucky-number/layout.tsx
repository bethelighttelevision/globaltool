import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Lucky Number Generator',
  description: 'Generate personalized lucky numbers based on name analysis. Free AI number prediction tool.',
  alternates: {
    canonical: 'https://toolsnappy.com/lucky-number',
  },
  openGraph: {
    title: 'Free AI Lucky Number Generator | ToolSnappy',
    description: 'Generate personalized lucky numbers based on name analysis. Free AI number prediction tool.',
    url: 'https://toolsnappy.com/lucky-number',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Lucky Number Generator | ToolSnappy',
    description: 'Generate personalized lucky numbers based on name analysis. Free AI number prediction tool.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
