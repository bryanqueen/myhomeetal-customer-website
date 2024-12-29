import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Don't use NEXT_PUBLIC_ prefix for secrets
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const expBuffer = 5 * 60 * 1000;

export async function middleware(req: NextRequest) {
  try {
    const tokenCookie = req.cookies.get('AUTH_TOKEN');
    const token = tokenCookie?.value;
    const url = req.nextUrl.clone();

    if (!token) {
      console.log('No token found');
      return redirectToLogin(url, req.nextUrl.pathname);
    }

    const { payload } = await jwtVerify(token, secret);
    const exp = payload.exp as number;
    const currentTime = new Date().getTime();
    const expirationTime = exp * 1000 - expBuffer;

    // Add debug logging
    console.log({
      currentTime,
      expirationTime,
      diff: expirationTime - currentTime
    });

    if (currentTime >= expirationTime) {
      console.log('Token expired');
      return redirectToLogin(url, req.nextUrl.pathname, true);
    }

    return NextResponse.next();
  } catch (error) {
    console.log('Middleware error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    const url = req.nextUrl.clone();
    return redirectToLogin(url, req.nextUrl.pathname, true);
  }
}

// Helper function to handle redirects
function redirectToLogin(url: URL, callbackPath: string, shouldDeleteCookie = false) {
  url.pathname = '/login';
  url.searchParams.set('callbackUrl', callbackPath);

  const response = NextResponse.redirect(url);

  if (shouldDeleteCookie) {
    response.cookies.delete('AUTH_TOKEN');
  }

  return response;
}

export const config = {
  matcher: ['/account/:path*', '/checkout', '/cart'],
};