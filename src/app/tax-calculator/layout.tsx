import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free 2026 US Tax Calculator',
  description: 'Free 2026 US income tax calculator. Estimate your federal tax refund, effective rate, and take-home pay.',
  alternates: {
    canonical: 'https://toolsnappy.com/tax-calculator',
  },
  openGraph: {
    title: 'Free 2026 US Tax Calculator | ToolSnappy',
    description: 'Free 2026 US income tax calculator. Estimate your federal tax refund, effective rate, and take-home pay.',
    url: 'https://toolsnappy.com/tax-calculator',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 2026 US Tax Calculator | ToolSnappy',
    description: 'Free 2026 US income tax calculator. Estimate your federal tax refund, effective rate, and take-home pay.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
