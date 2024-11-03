// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

// Creates a Supabase client for use in Client Components (browser)
// Uses singleton pattern - only one instance is created regardless of how many times this is called
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}