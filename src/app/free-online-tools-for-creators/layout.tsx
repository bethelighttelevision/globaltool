import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '50 Free Online Tools for Creators (2026)',
  description: 'The ultimate curated list of 50 free online tools every creator needs in 2026. SEO, social media, video, design, finance, and developer tools — all free, no sign-up required.',
  alternates: {
    canonical: 'https://toolsnappy.com/free-online-tools-for-creators',
  },
  openGraph: {
    title: '50 Free Online Tools for Creators (2026) | ToolSnappy',
    description: 'The ultimate curated list — SEO, social media, video, design, finance, and developer tools. All free, no sign-up.',
    url: 'https://toolsnappy.com/free-online-tools-for-creators',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '50 Free Online Tools for Creators (2026) | ToolSnappy',
    description: 'The ultimate curated list — SEO, social media, video, design, finance, and developer tools. All free, no sign-up.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
