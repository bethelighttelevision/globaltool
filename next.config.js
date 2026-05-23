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
    ];
  },
};

module.exports = nextConfig;
