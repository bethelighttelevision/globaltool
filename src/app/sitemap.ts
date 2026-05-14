import { MetadataRoute } from 'next'
import { blogPosts } from '../data/posts'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolsnappy.com'
  
  const staticPages = [
    '',
    '/seo-analyzer',
    '/bg-remover',
    '/crypto',
    '/ai-hook',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/youtube-seo',
    '/instagram-caption',
    '/tiktok-hashtags',
    '/word-counter',
    '/password-gen',
    '/json-formatter',
    '/base64-converter',
    '/pdf-converter',
    '/meta-tags',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as any,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as any,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
