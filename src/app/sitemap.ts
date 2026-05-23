import { MetadataRoute } from 'next'
import { blogPosts } from '../data/posts'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolsnappy.com'
  
  const staticPages = [
    '',
    '/site-audit',
    '/bg-remover',
    '/crypto-profit',
    '/ai-hook',
    '/blog',
    '/about',
    '/contact',
    '/free-online-tools-for-creators',
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
    '/car-loan-calculator',
    '/mortgage-calculator',
    '/image-upscaler',
    '/lucky-number',
    '/cv-maker',
    '/youtube-tag-extractor',
    '/youtube-thumbnail-analyzer',
    '/youtube-thumbnail-tester',
    '/youtube-thumbnail-downloader',
    '/youtube-video-downloader',
    '/facebook-video-downloader',
    '/instagram-video-downloader',
    '/tiktok-video-downloader',
    '/ai-humanizer',
    '/keyword-clustering',
    '/blog-to-social',
    '/tax-calculator',
    '/salary-calculator',
    '/retirement-calculator',
    '/write-for-us',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
