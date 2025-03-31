import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from './auth/auth';
 
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const storedCookies = await isAuthenticated()

  if (storedCookies.get('token')?.value) {
    if (['/sign-in', '/entrar', '/sign-up', '/cadastrar', '/'].includes(path)) {
      return NextResponse.redirect(new URL('/ordens', request.url))
    }
  } 

  if (!storedCookies.get('token')?.value) {
    if (['/sign-in', '/entrar', '/sign-up', '/cadastrar'].includes(path)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/entrar', request.url))
    }
  } 

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
