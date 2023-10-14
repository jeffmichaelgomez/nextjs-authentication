import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "./helpers/jose-verify"

// This function can be marked 'async' if using 'await' inside
export async function middleware(request: NextRequest){

    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(path);
    const adminOnlyPaths = ['/products', '/addproduct'].includes(path);

    const token = request.cookies.get('token')?.value || '';
    let isAdmin = false;
    if(token){
        const payload = await verify(token, process.env.TOKEN_SECRET!);
        isAdmin = payload.isAdmin;
    }
    console.log(`ISADMIN ${isAdmin}`)
    console.log(`Current path: ${path}`);
    console.log(`Token value: ${token}`);

    // If they're on a public path and have a valid token:
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    // If they're trying to access non-public pages without a token:
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // If they're trying to access admin-only paths and are not admin:
    if (adminOnlyPaths && token && !isAdmin) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile/:path*',
        '/verifyemail',
        '/profile',
        '/products', 
        '/addproduct'
    ]
}
