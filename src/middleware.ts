import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const isPublicRoute = createRouteMatcher(['/:locale/auth/sign-in(.*)', '/:locale/auth/sign-up(.*)', '/:locale/auth/verify(.*)']);

const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // Do not allow for visiting sign-in or sign-up pages when already authenticated
  const _auth = await auth();
  const isAuthenticated = _auth.userId !== null;
  if (isAuthenticated && isPublicRoute(request)) {
    return NextResponse.redirect(new URL('/en/dashboard', request.url));
  }

  // Do not localize api routes
  const path = request.nextUrl.pathname;
  if (path.includes('/api')) {
    return;
  }

  return intlMiddleware(request);
});

export const config = {
  matcher: [
    '/',

    '/(ar|en)/:path*',

    // Skip Next.js internals and all static files, unless found in search params
    // '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
