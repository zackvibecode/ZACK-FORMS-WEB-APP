import { createServerClient } from '@supabase/ssr'
import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

function getSafeNext(next: string | null) {
  if (!next || !next.startsWith('/')) return '/dashboard'
  return next
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const tokenHash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const next = getSafeNext(requestUrl.searchParams.get('next'))

  let response = NextResponse.redirect(new URL(next, requestUrl.origin))
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ktegduanokmhlhtcbmza.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZWdkdWFub2ttaGxodGNibXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTUyNTAsImV4cCI6MjA5MDQzMTI1MH0.22cg9MJXAsN-E4ZnX9QFMTdtAE98x5RzXAmH8bY8fy0',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.redirect(new URL(next, requestUrl.origin))
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return response
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) return response
  }

  return NextResponse.redirect(new URL('/login?error=auth_confirm_failed', requestUrl.origin))
}
