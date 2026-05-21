import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Secure Password Generator',
  description: 'Generate strong, secure random passwords online. Free password maker with customizable options.',
  alternates: {
    canonical: 'https://toolsnappy.com/password-gen',
  },
  openGraph: {
    title: 'Free Secure Password Generator | ToolSnappy',
    description: 'Generate strong, secure random passwords online. Free password maker with customizable options.',
    url: 'https://toolsnappy.com/password-gen',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Secure Password Generator | ToolSnappy',
    description: 'Generate strong, secure random passwords online. Free password maker with customizable options.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
