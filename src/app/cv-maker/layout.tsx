import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online CV Maker - Professional Resume Builder 2026',
  description: 'Create a professional CV in minutes with our free online CV maker.',
  alternates: {
    canonical: 'https://toolsnappy.com/cv-maker',
  },
  openGraph: {
    title: 'Free Online CV Maker - Professional Resume Builder 2026 | ToolSnappy',
    description: 'Create a professional CV in minutes with our free online CV maker.',
    url: 'https://toolsnappy.com/cv-maker',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online CV Maker - Professional Resume Builder 2026 | ToolSnappy',
    description: 'Create a professional CV in minutes with our free online CV maker.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
