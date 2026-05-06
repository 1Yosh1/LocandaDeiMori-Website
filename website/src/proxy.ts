import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/auth-proxy';

export async function proxy(request: NextRequest) {
  // 1. Update Supabase session and handle auth-based redirects
  const response = await updateSession(request);
  
  // 2. Apply Security Headers
  // We only apply strict CSP to standard page requests to avoid breaking Next.js internals (RSC, HMR, etc.)
  const isHtml = request.headers.get('accept')?.includes('text/html');
  const isNextInternal = request.nextUrl.pathname.startsWith('/_next') || request.headers.has('x-nextjs-data');
  
  if (isHtml && !isNextInternal) {
    const securityHeaders = {
      'X-DNS-Prefetch-Control': 'on',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      'Content-Security-Policy': 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' blob: data: https://*.supabase.co https://images.unsplash.com; " +
        "font-src 'self' data:; " +
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co localhost:* 127.0.0.1:*; " +
        "frame-ancestors 'none'; " +
        "upgrade-insecure-requests;",
    };

    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
