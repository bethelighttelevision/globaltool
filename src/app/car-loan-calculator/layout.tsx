import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Car Loan Calculator',
  description: 'Calculate monthly car loan payments, EMI, and total interest. Free auto loan calculator online.',
  alternates: {
    canonical: 'https://toolsnappy.com/car-loan-calculator',
  },
  openGraph: {
    title: 'Free Car Loan Calculator | ToolSnappy',
    description: 'Calculate monthly car loan payments, EMI, and total interest. Free auto loan calculator online.',
    url: 'https://toolsnappy.com/car-loan-calculator',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Car Loan Calculator | ToolSnappy',
    description: 'Calculate monthly car loan payments, EMI, and total interest. Free auto loan calculator online.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
