import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Retirement Calculator 2026',
  description: 'Free retirement calculator. Estimate your retirement savings growth, monthly income, and plan your financial future.',
  alternates: {
    canonical: 'https://toolsnappy.com/retirement-calculator',
  },
  openGraph: {
    title: 'Free Retirement Calculator | ToolSnappy',
    description: 'Free retirement calculator. Estimate your retirement savings growth, monthly income, and plan your financial future.',
    url: 'https://toolsnappy.com/retirement-calculator',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Retirement Calculator | ToolSnappy',
    description: 'Free retirement calculator. Estimate your retirement savings growth, monthly income, and plan your financial future.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
