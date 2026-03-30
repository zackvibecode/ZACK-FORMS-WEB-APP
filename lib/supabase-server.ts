import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabase() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ktegduanokmhlhtcbmza.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZWdkdWFub2ttaGxodGNibXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTUyNTAsImV4cCI6MjA5MDQzMTI1MH0.22cg9MJXAsN-E4ZnX9QFMTdtAE98x5RzXAmH8bY8fy0',
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
