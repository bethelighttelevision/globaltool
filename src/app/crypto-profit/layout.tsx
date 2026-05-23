import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Crypto Profit Calculator USA - Stock ROI Tracker',
  description: 'Advanced crypto and stock profit calculator with US tax bracket estimation. Track your ROI and estimate capital gains tax accurately.',
  alternates: {
    canonical: 'https://toolsnappy.com/crypto-profit',
  },
  openGraph: {
    title: 'Crypto Profit Calculator USA - Stock ROI Tracker | ToolSnappy',
    description: 'Advanced crypto and stock profit calculator with US tax bracket estimation. Track your ROI and estimate capital gains tax accurately.',
    url: 'https://toolsnappy.com/crypto-profit',
    siteName: 'ToolSnappy',
    images: [{ url: 'https://toolsnappy.com/logo.svg', width: 256, height: 256 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Profit Calculator USA - Stock ROI Tracker | ToolSnappy',
    description: 'Advanced crypto and stock profit calculator with US tax bracket estimation. Track your ROI and estimate capital gains tax accurately.',
    images: ['https://toolsnappy.com/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Does this include trading fees?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "While exchange fees vary (typically 0.1% to 0.5%), we recommend subtracting your platform specific fee from the Net Profit for the most accurate result."
              }
            },
            {
              "@type": "Question",
              "name": "Why is ROI important for small investors?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Small gains compounded over time lead to significant wealth. Tracking ROI helps you compare if your crypto performs better than traditional stocks or gold."
              }
            }
          ]
        })
      }} />
      {children}
    </>
  );
}
