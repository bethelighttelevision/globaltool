import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'ToolSnappy terms of service. By using our free tools and services, you agree to these terms and conditions.',
  alternates: {
    canonical: 'https://toolsnappy.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | ToolSnappy',
    description: 'ToolSnappy terms of service. By using our free tools and services, you agree to these terms and conditions.',
    url: 'https://toolsnappy.com/terms',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | ToolSnappy',
    description: 'ToolSnappy terms of service. By using our free tools and services, you agree to these terms and conditions.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
