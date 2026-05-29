import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Writing Improver & Content Refinement Tool',
  description: 'Polish and refine AI-generated text to sound more natural. Free writing assistant for ChatGPT, Claude, and Gemini content. Bypass AI detection and improve readability.',
  keywords: ['AI humanizer', 'AI writing improver', 'content refinement', 'bypass AI detection', 'humanize AI text', 'ChatGPT humanizer', 'Claude text polish', 'AI content editor'],
  alternates: {
    canonical: 'https://toolsnappy.com/ai-humanizer',
  },
  openGraph: {
    title: 'Free AI Writing Improver | ToolSnappy',
    description: 'Polish and refine AI-generated text to sound more natural. Free writing assistant for ChatGPT, Claude, and Gemini content.',
    url: 'https://toolsnappy.com/ai-humanizer',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Writing Improver | ToolSnappy',
    description: 'Polish and refine AI-generated text to sound more natural. Free writing assistant for ChatGPT, Claude, and Gemini content.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
