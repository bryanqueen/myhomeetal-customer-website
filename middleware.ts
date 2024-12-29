import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('AUTH_TOKEN');
  const token = tokenCookie ? tokenCookie.value : null;
  console.log('Token:', token); // Debug token
  console.log('URL:', req.nextUrl.pathname); // Debug requested URL

  const url = req.nextUrl.clone();

  if (!token) {
    console.log('Redirecting to login due to missing token');
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const exp = payload.exp as number;

    if (Date.now() >= exp * 1000) {
      console.log('Redirecting to login due to expired token');
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    console.log('Token is valid');
    return NextResponse.next();
  } catch (error) {
    console.log('Redirecting to login due to verification error:', error);
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}


export const config = {
  matcher: ['/account/:path*', '/checkout', '/referral-page', '/cart'], // Apply to specific routes
};
