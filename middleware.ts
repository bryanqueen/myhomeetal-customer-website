import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { ROUTES } from '@utils/routes';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('AUTH_TOKEN');

  if (request.nextUrl.pathname.startsWith(ROUTES.ACCOUNT)) {
    if (!token) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  if (
    (request.nextUrl.pathname === ROUTES.LOGIN ||
      request.nextUrl.pathname === ROUTES.SIGNUP) &&
    token
  ) {
    return NextResponse.redirect(new URL(ROUTES.ACCOUNT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/login', '/register'],
};
