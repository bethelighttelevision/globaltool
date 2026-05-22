import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newPosts = [
  {
    id: '33',
    title: "Crypto Tax Loopholes 2026: What US Investors Need to Know",
    slug: 'crypto-tax-loopholes-2026',
    date: 'May 22, 2026',
    category: 'US Tax & Finance',
    excerpt: "The crypto wash sale rule still doesn't apply in 2026. Here's how to use tax loss harvesting, long-term holds, and charitable donations to slash your IRS bill.",
    image: '/blog/crypto-tax-loopholes-2026.svg',
  },
  {
    id: '34',
    title: "FHA vs Conventional Loans: Which Is Right for You in 2026?",
    slug: 'fha-vs-conventional-loans-2026',
    date: 'May 22, 2026',
    category: 'US Tax & Finance',
    excerpt: 'FHA or conventional? Compare down payments, mortgage insurance, credit score rules, and 2026 loan limits to pick the right mortgage.',
    image: '/blog/fha-vs-conventional-loans-2026.svg',
  },
  {
    id: '35',
    title: "Best High-Yield Savings Accounts for US Creators and Freelancers 2026",
    slug: 'best-high-yield-savings-accounts-creators-2026',
    date: 'May 22, 2026',
    category: 'US Tax & Finance',
    excerpt: 'Top HYSA picks for US creators and freelancers in 2026, with rates up to 5.00% APY. Learn where to park your cash, tax tips, and how savings compare to crypto.',
    image: '/blog/best-high-yield-savings-accounts-creators-2026.svg',
  },
  {
    id: '36',
    title: "401(k) vs Roth IRA: The Complete 2026 Guide for Small Business Owners",
    slug: '401k-vs-roth-ira-small-business-2026',
    date: 'May 22, 2026',
    category: 'US Tax & Finance',
    excerpt: '2026 401(k) vs Roth IRA breakdown for small business owners: contribution limits, tax rules, Solo 401(k), SEP IRA, and the combo strategy that saves thousands.',
    image: '/blog/401k-vs-roth-ira-small-business-2026.svg',
  },
  {
    id: '37',
    title: "Side Hustle Taxes 2026: What Every US Creator Must Know",
    slug: 'side-hustle-taxes-2026',
    date: 'May 22, 2026',
    category: 'US Tax & Finance',
    excerpt: 'Your 2026 guide to side hustle taxes: 1099-K rules, self-employment tax, quarterly deadlines, deductions, and tools to stay compliant.',
    image: '/blog/side-hustle-taxes-2026.svg',
  },
];

async function main() {
  for (const post of newPosts) {
    const { error } = await supabase.from('blogs').insert({
      title: post.title,
      slug: post.slug,
      date: post.date,
      excerpt: post.excerpt,
      image: post.image,
      created_at: new Date().toISOString(),
    });
    if (error) {
      console.error(`Error inserting ${post.slug}:`, error.message);
    } else {
      console.log(`✅ Inserted: ${post.slug}`);
    }
  }
}

main().catch(console.error);
