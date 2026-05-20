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

// Fetch all articles for the admin dashboard
export async function getAdminBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (err: any) {
    console.error("Error getting admin blogs:", err.message);
    return { success: false, error: err.message, data: [] };
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
  } catch (err: any) {
    console.error("Error getting admin blog by id:", err.message);
    return { success: false, error: err.message };
  }
}

// Create a new blog post
export async function createAdminBlog(input: BlogInput) {
  try {
    // Generate an ID if it's serial/incremental, but typically Supabase generates ID.
    // Let's insert the columns we have:
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt,
          content: input.content, // HTML content from editor
          image: input.image || '/blog-banner.png',
          date: input.date,
          category: input.category
        }
      ])
      .select();

    if (error) throw error;
    
    // Clear Next.js cache so the new blog shows up on the frontend immediately
    revalidatePath('/blog');
    revalidatePath(`/blog/${input.slug}`);

    return { success: true, data: data?.[0] };
  } catch (err: any) {
    console.error("Error creating blog:", err.message);
    return { success: false, error: err.message };
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

    return { success: true, data: data?.[0] };
  } catch (err: any) {
    console.error("Error updating blog:", err.message);
    return { success: false, error: err.message };
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
  } catch (err: any) {
    console.error("Error deleting blog:", err.message);
    return { success: false, error: err.message };
  }
}
