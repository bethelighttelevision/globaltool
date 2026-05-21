import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ToolSnappy privacy policy. Learn how we collect, use, and protect your personal data. We respect your privacy and comply with Google AdSense policies.',
  alternates: {
    canonical: 'https://toolsnappy.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | ToolSnappy',
    description: 'ToolSnappy privacy policy. Learn how we collect, use, and protect your personal data. We respect your privacy and comply with Google AdSense policies.',
    url: 'https://toolsnappy.com/privacy-policy',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | ToolSnappy',
    description: 'ToolSnappy privacy policy. Learn how we collect, use, and protect your personal data. We respect your privacy and comply with Google AdSense policies.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
