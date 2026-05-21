import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Background Remover',
  description: 'Remove image backgrounds instantly with AI. Free online background removal tool with HD-quality output.',
  alternates: {
    canonical: 'https://toolsnappy.com/bg-remover',
  },
  openGraph: {
    title: 'Free AI Background Remover | ToolSnappy',
    description: 'Remove image backgrounds instantly with AI. Free online background removal tool with HD-quality output.',
    url: 'https://toolsnappy.com/bg-remover',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Background Remover | ToolSnappy',
    description: 'Remove image backgrounds instantly with AI. Free online background removal tool with HD-quality output.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
