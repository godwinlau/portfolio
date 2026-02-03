import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get('site-auth')?.value === 'authenticated';
  const isPasswordPage = request.nextUrl.pathname === '/password';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Allow API routes and password page
  if (isApiRoute || isPasswordPage) {
    return NextResponse.next();
  }

  // Redirect to password page if not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/password', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)$).*)',
  ],
};
