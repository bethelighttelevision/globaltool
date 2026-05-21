import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free PDF to SVG Converter',
  description: 'Convert PDF files to SVG format instantly. Free online PDF conversion tool.',
  alternates: {
    canonical: 'https://toolsnappy.com/pdf-converter',
  },
  openGraph: {
    title: 'Free PDF to SVG Converter | ToolSnappy',
    description: 'Convert PDF files to SVG format instantly. Free online PDF conversion tool.',
    url: 'https://toolsnappy.com/pdf-converter',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF to SVG Converter | ToolSnappy',
    description: 'Convert PDF files to SVG format instantly. Free online PDF conversion tool.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
