"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Search, Copy, CheckCircle2 } from 'lucide-react';
export default function MetaTagsPage() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [copied, setCopied] = useState(false);

  const generatedTags = `<!-- Basic HTML Meta Tags -->
<title>${title || 'Your Page Title'}</title>
<meta name="description" content="${description || 'Description of your page content.'}">
<meta name="keywords" content="${keywords || 'keyword1, keyword2, keyword3'}">
<meta name="author" content="${author || 'Author Name'}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title || 'Your Page Title'}">
<meta property="og:description" content="${description || 'Description of your page content.'}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title || 'Your Page Title'}">
<meta property="twitter:description" content="${description || 'Description of your page content.'}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      icon={<Search size={44} />}
      title="SEO Meta Tag Generator"
      description="Instantly generate perfectly formatted HTML meta tags, Open Graph (Facebook), and Twitter Cards to boost your 2026 SEO ranking."
      seo={{
        toolName: "SEO Meta Tag Generator",
        description: "Generate professional meta tags, OpenGraph tags, and Twitter cards to improve your website&apos;s search engine ranking.",
        url: "https://globalutilitytoolbox.com/meta-tags"
      }}
      currentPath="/meta-tags"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Definitive Guide to SEO Meta Tags and Open Graph</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Meta tags are the silent communicators between your website and search engines. They tell Google, Bing, and other crawlers what your page is about before a single human visitor arrives. Our <strong>Free Meta Tags Generator</strong> helps you create perfectly optimized meta tags for every page of your website. In an era where search engine algorithms are more sophisticated than ever, understanding and correctly implementing meta tags remains one of the foundational skills of effective search engine optimization. These small snippets of HTML code may not be visible to your website visitors, but they exert an outsized influence on how your content is indexed, categorized, and displayed across the web.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Meta Descriptions Still Matter for Traffic</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Although meta descriptions are not a direct ranking factor for Google, they are the &quot;Ad Copy&quot; that appears in search results. A compelling meta description can increase your click-through rate (CTR) by 5-10%, which indirectly signals to Google that your page is valuable. Use our generator to craft descriptions under 160 characters that include your primary keyword and a clear call to action. Think of the meta description as the headline of a newspaper articleâ€”it needs to grab attention, convey value, and compel the user to click through to your site rather than your competitor&apos;s. Descriptions that include numbers, emotional triggers, and direct answers to search queries consistently outperform generic descriptions in click-through rate testing.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Essential Meta Tags for Modern SEO</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Beyond the title tag and meta description, several other meta tags play a role in how your site appears in search results. The <code>viewport</code> tag is critical for mobile responsiveness and directly impacts your mobile search rankings following Google&apos;s mobile-first indexing update. The <code>robots</code> tag controls how crawlers index your content, allowing you to prevent duplicate pages from appearing in search results or to block entire sections of your site from being crawled. The <code>canonical</code> tag prevents duplicate content issues by specifying which version of a page is the authoritative source. The <code>author</code> tag, while less influential than in the past, still provides useful metadata about content ownership, and the <code>revisit-after</code> tag can suggest how frequently search engines should crawl your page. Our tool generates all of these essential tags in one click, saving you hours of manual coding and reducing the risk of syntax errors that could undermine your SEO efforts.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #a8c7fa' }}>
            <h4 style={{ marginTop: 0, color: '#a8c7fa' }}>Social Media Optimization (Open Graph)</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              When you share a link on Facebook, Twitter, or LinkedIn, the platform looks for Open Graph (OG) tags. Without OG tags, social platforms guess your title and image, often getting it wrong. Our generator creates OG:title, OG:description, OG:image, and OG:url tags that ensure your links look professional everywhere they are shared. Properly configured OG tags can increase social engagement by ensuring that your content is presented with the correct headline, description, and thumbnail image. This is especially important for e-commerce sites, news publications, and content-driven businesses where social sharing drives a significant portion of referral traffic. The OG:image tag deserves particular attention because visual content receives substantially more engagement on social platforms than text-only posts.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Twitter Card Tags: A Must for Social Sharing</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Twitter uses its own set of meta tags called Twitter Cards. A <code>summary_large_image</code> card displays your page image prominently in tweets, dramatically increasing engagement. Our tool generates both OG tags and Twitter Card tags simultaneously so your content looks great everywhere. Twitter Card tags operate independently from OG tags, which means you need to include both sets of markup in your HTML head section for full social media optimization. The <code>twitter:site</code> and <code>twitter:creator</code> tags allow you to attribute content to specific Twitter accounts, which can help build brand recognition and drive followers when your content is shared across the platform. Failing to implement Twitter Cards means your tweeted links will appear as plain text URLs, missing a significant opportunity to capture attention in fast-moving social media feeds.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Best Practices for 2026</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            In 2026, Google places increasing emphasis on structured data alongside meta tags. Use our generator to create a solid meta foundation, then add JSON-LD schema markup for enhanced search result features like rich snippets and knowledge panels. Always keep your title tags under 60 characters and meta descriptions under 160 characters for optimal display on both desktop and mobile search results. Beyond character counts, focus on creating unique meta tags for every page on your siteâ€”duplicate title tags and descriptions are one of the most common SEO mistakes and can lead to significant ranking penalties. Use actionable language in your title tags, include your primary keyword near the beginning, and ensure that every meta description provides a clear value proposition that distinguishes your page from the competition in the search results.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Common Meta Tag Mistakes to Avoid</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Even experienced web developers sometimes fall into common meta tag traps that hurt their SEO performance. One of the most frequent mistakes is using the same meta description across multiple pages, which fails to differentiate your content and can trigger Google to ignore your descriptions entirely in favor of auto-generated snippets. Another common error is keyword stuffing in meta tags, which not only looks unprofessional in search results but can also trigger spam penalties from search engines. Missing or incorrect OG:image dimensions can cause social platforms to crop or distort your shared images, and forgetting to include the <code>lang</code> attribute in your HTML tag can prevent search engines from properly serving your content to the right regional audience. Our Meta Tags Generator helps you avoid all of these pitfalls by following current best practices and SEO guidelines.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Integrating Meta Tags with Your Broader SEO Strategy</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Meta tags are just one component of a comprehensive SEO strategy, but they are foundational to everything else. Before you invest time in content marketing, backlink building, or technical SEO audits, ensure that every page on your site has properly optimized meta tags. Think of meta tags as the storefront of your websiteâ€”they are the first thing potential visitors see when your page appears in search results or social media feeds. Without compelling, well-structured meta tags, even the most valuable content may struggle to attract the traffic it deserves. Use our generator as part of your regular SEO workflow, generating and testing different meta tag variations to optimize your click-through rates and improve your search visibility over time.
          </p>
        </article>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', textAlign: 'left' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--foreground)' }}>Input Details</h3>

          <label className="label-text">Site Title ({title.length}/60)</label>
          <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Best Crypto Tools 2026" style={{ marginBottom: '16px' }} />

          <label className="label-text">Description ({description.length}/160)</label>
          <textarea className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a compelling description to increase CTR..." rows={3} style={{ marginBottom: '16px', resize: 'vertical' }} />

          <label className="label-text">Keywords (Comma separated)</label>
          <input type="text" className="input-field" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="crypto, tools, calculator, SEO" style={{ marginBottom: '16px' }} />

          <label className="label-text">Author</label>
          <input type="text" className="input-field" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="John Doe" />
        </div>

        <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', position: 'relative', minWidth: 0, maxWidth: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--foreground)' }}>Generated Code</h3>
            <button
              onClick={handleCopy}
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--foreground)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
            >
              {copied ? <CheckCircle2 size={16} color="var(--success)" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          <pre style={{ background: '#000', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#a8c7fa', lineHeight: 1.6, maxWidth: '100%' }}>
            <code>{generatedTags}</code>
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}

