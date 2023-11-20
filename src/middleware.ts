import { NextResponse, NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    if(!token && request.nextUrl.pathname.startsWith('/games')) {
        return NextResponse.rewrite(new URL('/auth/signin', request.url));
    }

    if(!token && request.nextUrl.pathname.startsWith('/games/:id')) {
        return NextResponse.rewrite(new URL('/auth/signin', request.url));
    }

    if(!token && request.nextUrl.pathname.startsWith('/ranking')) {
        return NextResponse.rewrite(new URL('/auth/signin', request.url));
    }

    if(!token && request.nextUrl.pathname.startsWith('/historic')) {
        return NextResponse.rewrite(new URL('/auth/signin', request.url));
    }

    if(!token && request.nextUrl.pathname.startsWith('/profile')) {
        return NextResponse.rewrite(new URL('/auth/signin', request.url));
    }

    if(token && request.nextUrl.pathname.startsWith('/auth/')) {
        return NextResponse.rewrite(new URL('/games', request.url));
    }
}