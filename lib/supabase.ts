import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ktegduanokmhlhtcbmza.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZWdkdWFub2ttaGxodGNibXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTUyNTAsImV4cCI6MjA5MDQzMTI1MH0.22cg9MJXAsN-E4ZnX9QFMTdtAE98x5RzXAmH8bY8fy0'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
