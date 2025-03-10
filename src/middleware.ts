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
  'pv-montage',
  'entkernung',
  'sanierung',
  'leiharbeit',
  'temporary-staffing',
  'blog',
  'blog/reinigung',
  'blog/security',
  'blog/winterdienst',
  'blog/streumittel',
  'blog/StreumittelCalculator',
  'blog/RaeumpflichtGuide2025',
  'blog/ReinigungsplanGenerator',
  'blog/NachhaltigeReinigung',
  'blog/WinterdienstKostenrechner',
  'blog/WetterDatenWinterdienst',
  'blog/EntruemplungsKostenRechner',
  'blog/SmartBuildingSicherheit',
  'blog/EntkernungsGuide',
  'blog/SanierungPraevention',
  'blog/PVAnlagenAufbau',
  'blog/Sachkunde34a',
  'blog/Sachkunde34a/PruefungsSimulator',
  'blog/Sachkunde34a/Recht',
  'blog/Sachkunde34a/Gewerberecht',
  'blog/Sachkunde34a/Datenschutz',
  'blog/Sachkunde34a/BGB',
  'blog/Sachkunde34a/Strafrecht',
  'blog/Sachkunde34a/Waffen',
  'blog/Sachkunde34a/UVV',
  'blog/Sachkunde34a/Deeskalation',
  'blog/Sachkunde34a/Sicherheitstechnik',
  'blog/Sachkunde34a/Glossar',
  'blog/Sachkunde34a/Pruefungsablauf'
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