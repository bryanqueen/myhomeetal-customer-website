import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('AUTH_TOKEN');
  const token = tokenCookie ? tokenCookie.value : null;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const exp = payload.exp as number;

    if (Date.now() >= exp * 1000) {
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/account/:path*', '/checkout', '/referral-page', '/cart'], // Apply to specific routes
};
