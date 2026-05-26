export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  authorName: string;
  authorBio: string;
}

export const blogPosts: BlogPost[] = [];
