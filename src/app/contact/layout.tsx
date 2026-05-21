import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have a suggestion, bug report, or question? Reach out to the ToolSnappy team. We respond within 24 hours.',
  alternates: {
    canonical: 'https://toolsnappy.com/contact',
  },
  openGraph: {
    title: 'Contact Us | ToolSnappy',
    description: 'Have a suggestion, bug report, or question? Reach out to the ToolSnappy team. We respond within 24 hours.',
    url: 'https://toolsnappy.com/contact',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | ToolSnappy',
    description: 'Have a suggestion, bug report, or question? Reach out to the ToolSnappy team. We respond within 24 hours.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
