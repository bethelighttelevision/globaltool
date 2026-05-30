import { NextResponse } from 'next/server';

const PH_API = 'https://api.producthunt.com/v2/api/graphql';
const PRODUCT_SLUG = 'toolsnappy';

export async function GET() {
  const token = process.env.PH_DEV_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'PH_DEV_TOKEN not configured' }, { status: 500 });
  }

  const query = `
    query {
      post(slug: "${PRODUCT_SLUG}") {
        id
        name
        votesCount
        reviewsCount
        reviewsRating
        tagline
        url
        website
      }
    }
  `;

  try {
    const res = await fetch(PH_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('PH API error:', res.status, text);
      return NextResponse.json({ error: 'Product Hunt API error' }, { status: 502 });
    }

    const json = await res.json();
    const post = json?.data?.post;

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: post.id,
      name: post.name,
      upvotes: post.votesCount ?? 0,
      reviewsCount: post.reviewsCount ?? 0,
      reviewsRating: post.reviewsRating ?? 0,
      tagline: post.tagline,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 502 });
  }
}
