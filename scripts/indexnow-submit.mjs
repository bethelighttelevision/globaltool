const INDEXNOW_URL = 'https://api.indexnow.org/IndexNow';
const KEY = '2fffdaccce45494f9404c24501a16910';

const urls = [
  'https://toolsnappy.com',
  'https://toolsnappy.com/site-audit',
  'https://toolsnappy.com/bg-remover',
  'https://toolsnappy.com/crypto-profit',
  'https://toolsnappy.com/ai-hook',
  'https://toolsnappy.com/blog',
  'https://toolsnappy.com/about',
  'https://toolsnappy.com/contact',
  'https://toolsnappy.com/free-online-tools-for-creators',
  'https://toolsnappy.com/privacy-policy',
  'https://toolsnappy.com/terms',
  'https://toolsnappy.com/youtube-seo',
  'https://toolsnappy.com/instagram-caption',
  'https://toolsnappy.com/tiktok-hashtags',
  'https://toolsnappy.com/word-counter',
  'https://toolsnappy.com/password-gen',
  'https://toolsnappy.com/json-formatter',
  'https://toolsnappy.com/base64-converter',
  'https://toolsnappy.com/pdf-converter',
  'https://toolsnappy.com/meta-tags',
  'https://toolsnappy.com/car-loan-calculator',
  'https://toolsnappy.com/mortgage-calculator',
  'https://toolsnappy.com/image-upscaler',
  'https://toolsnappy.com/lucky-number',
  'https://toolsnappy.com/cv-maker',
  'https://toolsnappy.com/youtube-tag-extractor',
  'https://toolsnappy.com/youtube-thumbnail-analyzer',
  'https://toolsnappy.com/youtube-thumbnail-tester',
  'https://toolsnappy.com/youtube-thumbnail-downloader',
  'https://toolsnappy.com/ai-humanizer',
  'https://toolsnappy.com/keyword-clustering',
  'https://toolsnappy.com/blog-to-social',
  'https://toolsnappy.com/tax-calculator',
  'https://toolsnappy.com/salary-calculator',
  'https://toolsnappy.com/retirement-calculator',
  'https://toolsnappy.com/write-for-us',
];

async function submitAll() {
  const body = {
    host: 'toolsnappy.com',
    key: KEY,
    keyLocation: `https://toolsnappy.com/${KEY}.txt`,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const response = await fetch(INDEXNOW_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    console.log('IndexNow submission successful!');
  } else {
    const text = await response.text();
    console.error('IndexNow error:', response.status, text);
  }
}

submitAll().catch(console.error);
