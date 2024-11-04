import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Creates a Supabase client for Server Components, Server Actions, and Route Handlers
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Gets all cookies from the Next.js cookie store
        getAll() {
          return cookieStore.getAll()
        },
        // Sets cookies in the Next.js cookie store
        // Cookie errors in Server Components can be ignored with middleware
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}