import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write for Us | ToolSnappy',
  description: 'Contribute guest posts and reach a growing audience of creators, marketers, and professionals.',
  alternates: {
    canonical: 'https://toolsnappy.com/write-for-us',
  },
};

export default function WriteForUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
