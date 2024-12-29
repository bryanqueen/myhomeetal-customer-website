import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
const expBuffer = 5 * 60 * 1000; // 5-minute buffer for token expiry

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('AUTH_TOKEN');
  const token = tokenCookie ? tokenCookie.value : null;
  const url = req.nextUrl.clone();

  // Redirect to login if token is missing
  if (!token) {
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const exp = payload.exp as number;

    // Check if the token is expired with a buffer
    if (Date.now() >= exp * 1000 - expBuffer) {
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);

      // Delete the expired token cookie
      const response = NextResponse.redirect(url);
      response.cookies.delete('AUTH_TOKEN'); // Delete the AUTH_TOKEN cookie
      return response;
    }

    // Token is valid, proceed with the request
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);

    // Delete the invalid token cookie
    const response = NextResponse.redirect(url);
    response.cookies.delete('AUTH_TOKEN'); // Delete the invalid token cookie
    return response;
  }
}

export const config = {
  matcher: ['/account/:path*', '/checkout', '/referral-page', '/cart'], // Apply to specific routes
};