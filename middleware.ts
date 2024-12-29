import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/verify-otp'];

export async function middleware(req: NextRequest) {
  // Debug logging (temporary)
  console.log('Middleware executing on path:', req.nextUrl.pathname);
  console.log('Cookies present:', req.cookies.getAll());

  // Early return for public routes
  if (PUBLIC_ROUTES.some(route => req.nextUrl.pathname.startsWith(route))) {
    console.log('Public route accessed:', req.nextUrl.pathname);
    return NextResponse.next();
  }

  const tokenCookie = req.cookies.get('AUTH_TOKEN');
  
  // Strict cookie check
  if (!tokenCookie || !tokenCookie.value) {
    console.log('No AUTH_TOKEN cookie found, redirecting to login');
    
    // Create absolute URL for redirect
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    
    // Force redirect with 307 status
    return NextResponse.redirect(redirectUrl.toString(), {
      status: 307,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(tokenCookie.value, secret);

    if (Date.now() >= (payload.exp as number) * 1000) {
      console.log('Token expired, redirecting to login');
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      
      const response = NextResponse.redirect(redirectUrl.toString(), {
        status: 307
      });
      response.cookies.delete('AUTH_TOKEN');
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl.toString(), {
      status: 307
    });
  }
}

export const config = {
  matcher: [
    // Match all paths except static files and public routes
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    '/account/:path*',
    '/checkout',
    '/referral-page',
    '/cart'
  ],
};