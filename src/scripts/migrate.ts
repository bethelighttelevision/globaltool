import { marked } from 'marked';
import { createClient } from '@supabase/supabase-js';
import { blogPosts } from '../data/posts';
import fs from 'fs';
import path from 'path';

// Load environment variables manually since we are running via tsx outside Next.js
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("Using key starting with:", supabaseKey.substring(0, 15));

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log(`Starting migration of ${blogPosts.length} posts...`);
  
  for (const post of blogPosts) {
    console.log(`Migrating: ${post.title}`);
    
    const htmlContent = await marked.parse(post.content);
    
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: htmlContent,
          image: post.image,
          date: post.date,
        }
      ]);
      
    if (error) {
      console.error(`Failed to migrate ${post.title}:`, error.message);
    } else {
      console.log(`Successfully migrated ${post.title}`);
    }
  }
  
  console.log("Migration complete!");
}

migrate();
