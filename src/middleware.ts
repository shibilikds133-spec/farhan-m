import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    
    // TODO: In the future, check for actual authentication token / cookie
    // const token = request.cookies.get('admin_token')?.value;
    const isMockAuthEnabled = false; // Set to TRUE when backend is ready

    if (isMockAuthEnabled) {
      // If mock auth is enabled and there is no token (or it's invalid), redirect to login
      // if (!token) {
      //   return NextResponse.redirect(new URL('/admin/login', request.url));
      // }
      
      // For now, if mock auth is active, just block it for demonstration
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Since mock auth is false, we allow the design to be tested without logging in
    return NextResponse.next();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo (logo images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo).*)',
  ],
};
