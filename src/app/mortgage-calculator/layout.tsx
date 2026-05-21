import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Mortgage Calculator',
  description: 'Calculate monthly mortgage payments, amortization, and interest. Free home loan calculator.',
  alternates: {
    canonical: 'https://toolsnappy.com/mortgage-calculator',
  },
  openGraph: {
    title: 'Free Mortgage Calculator | ToolSnappy',
    description: 'Calculate monthly mortgage payments, amortization, and interest. Free home loan calculator.',
    url: 'https://toolsnappy.com/mortgage-calculator',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mortgage Calculator | ToolSnappy',
    description: 'Calculate monthly mortgage payments, amortization, and interest. Free home loan calculator.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
