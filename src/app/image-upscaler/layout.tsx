import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Image Upscaler',
  description: 'Enhance and upscale low-resolution images using AI. Free online image quality booster.',
  alternates: {
    canonical: 'https://toolsnappy.com/image-upscaler',
  },
  openGraph: {
    title: 'Free AI Image Upscaler | ToolSnappy',
    description: 'Enhance and upscale low-resolution images using AI. Free online image quality booster.',
    url: 'https://toolsnappy.com/image-upscaler',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Image Upscaler | ToolSnappy',
    description: 'Enhance and upscale low-resolution images using AI. Free online image quality booster.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
