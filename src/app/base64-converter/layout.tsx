import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Image to Base64 Converter',
  description: 'Convert images to Base64 encoded strings instantly. Free online developer tool.',
  alternates: {
    canonical: 'https://toolsnappy.com/base64-converter',
  },
  openGraph: {
    title: 'Free Image to Base64 Converter | ToolSnappy',
    description: 'Convert images to Base64 encoded strings instantly. Free online developer tool.',
    url: 'https://toolsnappy.com/base64-converter',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image to Base64 Converter | ToolSnappy',
    description: 'Convert images to Base64 encoded strings instantly. Free online developer tool.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
