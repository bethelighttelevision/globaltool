/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lzvufzxaetdsekougqgu.supabase.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: '/crypto',
        destination: '/crypto-profit',
        permanent: true,
      },
      {
        source: '/seo-analyzer',
        destination: '/site-audit',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/blog',
        permanent: false,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@tiptap/react',
      '@tiptap/core',
      '@tiptap/starter-kit',
      '@supabase/supabase-js',
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
