import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define routes directly in the middleware file
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  NEWSLETTER: '/newsletter',
  PRODUCT: (id: string) => `/item/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMED: '/order-confirmed',
  SEARCH: '/search',
  ACCOUNT: '/account',
  PURCHASING_HISTORY: '/account/purchasing-history',
  WALLET: '/account/my-wallet',
  NOTIFICATIONS: '/account/notifications',
  SAVED_ITEMS: '/account/saved-items',
  SECURITY: '/account/security',
  ADDRESS_BOOK: '/account/address-book',
  CLOSE_ACCOUNT: '/account/close-account',
};

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
