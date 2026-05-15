import React from 'react';
import Script from 'next/script';

interface SEOProps {
  toolName: string;
  description: string;
  url?: string;
}

export default function SEO({ toolName, description, url }: SEOProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "description": description,
    "url": url,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Global Utility Toolbox"
    }
  };

  return (
    <Script
      id={`json-ld-${toolName.replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
