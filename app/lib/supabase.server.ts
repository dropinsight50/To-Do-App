import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/supabase';

// These should be stored in .env file
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseKey);

// Utility to create a Supabase client for client-side usage if needed,
// or for server-side with user's access token.
export const createSupabaseClient = (accessToken?: string)
 => createClient<Database>(
  supabaseUrl,
  supabaseKey,
  accessToken ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } } : {}
);
