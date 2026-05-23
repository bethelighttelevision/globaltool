import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Salary Take-Home Calculator',
  description: 'Free salary take-home calculator. Estimate your net pay after federal and state taxes, FICA, and deductions.',
  alternates: {
    canonical: 'https://toolsnappy.com/salary-calculator',
  },
  openGraph: {
    title: 'Free Salary Take-Home Calculator | ToolSnappy',
    description: 'Free salary take-home calculator. Estimate your net pay after federal and state taxes, FICA, and deductions.',
    url: 'https://toolsnappy.com/salary-calculator',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Salary Take-Home Calculator | ToolSnappy',
    description: 'Free salary take-home calculator. Estimate your net pay after federal and state taxes, FICA, and deductions.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
