import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// We use the service role key if available (on the server) to bypass RLS, 
// otherwise we fall back to the anon key (on the client).
export const supabase = createClient(supabaseUrl, supabaseKey);
