import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, type Locale } from './i18n/config';

function detectLocale(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  
  // Check last segment (new format: /path/locale)
  const lastSegment = segments[segments.length - 1];
  if (lastSegment && locales.includes(lastSegment as Locale)) {
    return lastSegment as Locale;
  }
  
  // Check first segment (standard format: /locale/path)
  const firstSegment = segments[0];
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return null;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const firstSegment = segments[0];
  
  // Check if URL has locale suffix (new format: /path/locale)
  if (lastSegment && locales.includes(lastSegment as Locale)) {
    // Add header with pathname for server-side locale detection
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }
  
  // Check if URL has locale prefix (old format: /locale/path)
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    const locale = firstSegment;
    
    if (segments.length === 1) {
      // Just /en or /ua - this is the homepage, keep as is
      const response = NextResponse.next();
      response.headers.set('x-pathname', pathname);
      return response;
    }
    
    // Redirect /en/problems to /problems/en
    const restPath = '/' + segments.slice(1).join('/');
    const newUrl = new URL(`${restPath}/${locale}`, request.url);
    return NextResponse.redirect(newUrl, 301);
  }
  
  // No locale found - redirect to path with default locale suffix
  if (pathname === '/') {
    // Root path - redirect to /{defaultLocale}
    const newUrl = new URL(`/${defaultLocale}`, request.url);
    return NextResponse.redirect(newUrl, 307);
  }
  
  // Other paths without locale - add default locale suffix
  const newUrl = new URL(`${pathname}/${defaultLocale}`, request.url);
  return NextResponse.redirect(newUrl, 307);
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - API routes
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - Static files (those containing a dot)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
