import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free JSON Formatter and Validator',
  description: 'Format, validate, and beautify JSON strings online. Free JSON formatter tool for developers.',
  alternates: {
    canonical: 'https://toolsnappy.com/json-formatter',
  },
  openGraph: {
    title: 'Free JSON Formatter and Validator | ToolSnappy',
    description: 'Format, validate, and beautify JSON strings online. Free JSON formatter tool for developers.',
    url: 'https://toolsnappy.com/json-formatter',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter and Validator | ToolSnappy',
    description: 'Format, validate, and beautify JSON strings online. Free JSON formatter tool for developers.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
