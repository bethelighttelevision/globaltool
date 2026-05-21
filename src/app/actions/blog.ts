'use server';

import { supabase } from '../../lib/supabase';
import { revalidatePath } from 'next/cache';

export interface BlogInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

interface BlogRecord {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// Fetch all articles for the admin dashboard
export async function getAdminBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (err) {
    const message = getErrorMessage(err);
    console.error("Error getting admin blogs:", message);
    return { success: false, error: message, data: [] };
  }
}

// Get a single article by ID
export async function getAdminBlogById(id: string) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    const message = getErrorMessage(err);
    console.error("Error getting admin blog by id:", message);
    return { success: false, error: message };
  }
}

// Create a new blog post
export async function createAdminBlog(input: BlogInput) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt,
          content: input.content,
          image: input.image || '/blog-banner.png',
          date: input.date,
          category: input.category
        }
      ])
      .select();

    if (error) throw error;
    
    revalidatePath('/blog');
    revalidatePath(`/blog/${input.slug}`);

    return { success: true, data: data?.[0] as BlogRecord | undefined };
  } catch (err) {
    const message = getErrorMessage(err);
    console.error("Error creating blog:", message);
    return { success: false, error: message };
  }
}

// Update an existing blog post
export async function updateAdminBlog(id: string, input: BlogInput) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update({
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: input.content,
        image: input.image,
        date: input.date,
        category: input.category
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    revalidatePath('/blog');
    revalidatePath(`/blog/${input.slug}`);

    return { success: true, data: data?.[0] as BlogRecord | undefined };
  } catch (err) {
    const message = getErrorMessage(err);
    console.error("Error updating blog:", message);
    return { success: false, error: message };
  }
}

// Delete a blog post
export async function deleteAdminBlog(id: string, slug?: string) {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/blog');
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    return { success: true };
  } catch (err) {
    const message = getErrorMessage(err);
    console.error("Error deleting blog:", message);
    return { success: false, error: message };
  }
}
