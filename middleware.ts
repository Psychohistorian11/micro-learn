// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
    const session = await auth();
    const { pathname } = request.nextUrl;

    const protectedRoutes: string[] = ['/dashboard', '/profile', '/settings', '/home'];

    const publicRoutes: string[] = ['/login', '/register', '/forgot-password'];

    if (session && publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};