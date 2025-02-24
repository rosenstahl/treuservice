import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const locales = ['de', 'en']
 
const validPaths = [
  '',  // homepage
  'about',
  'imprint',
  'privacy',
  'terms',
  'contact',
  'services',
  'reinigung',
  'security',
  'winterdienst',
  'entruempelung',
  'blog',
  'blog/reinigung',
  'blog/security',
  'blog/winterdienst',
  'blog/streumittel'
]
function getLocale(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return pathname.split('/')[1]

  return 'de' // default locale
}
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (!pathnameHasLocale) {
    // Redirect to default locale if none specified
    return NextResponse.redirect(
      new URL(`/de${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  // Get the path without locale
  const pathWithoutLocale = pathname.split('/').slice(2).join('/')
  
  // Check if path is valid (optional)
  if (pathWithoutLocale && !validPaths.includes(pathWithoutLocale)) {
    // Handle 404 by redirecting to homepage of current locale
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}`, request.url)
    )
  }
 
  return NextResponse.next()
}
 
// In middleware.ts

export const config = {
  matcher: [
    // Skip all internal paths and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|pdfs/.*\\.pdf).*)',
  ],
}