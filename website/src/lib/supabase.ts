import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Ensure .env.local is configured and the dev server is restarted.");
}

/**
 * Browser-side Supabase client.
 * Uses createBrowserClient from @supabase/ssr so that the auth session
 * is stored in cookies (not just localStorage), making it visible to the
 * server-side proxy/middleware that protects admin routes.
 */
export const supabase = createBrowserClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
