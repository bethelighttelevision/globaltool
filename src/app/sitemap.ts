import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://globalutilitytoolbox.com'; // Replace with actual domain when ready
  
  const tools = [
    '',
    '/crypto',
    '/ai-hook',
    '/youtube-seo',
    '/pdf-converter',
    '/meta-tags',
    '/password-gen',
    '/json-formatter',
    '/instagram-caption',
    '/tiktok-hashtags',
    '/word-counter',
    '/base64-converter',
    '/seo-analyzer',
    '/bg-remover',
    '/privacy-policy',
    '/terms',
    '/contact'
  ];

  return tools.map((tool) => ({
    url: `${baseUrl}${tool}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: tool === '' ? 1 : 0.8,
  }));
}
