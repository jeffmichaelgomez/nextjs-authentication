import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
interface MyJwtPayload extends jwt.JwtPayload {
    isAdmin: boolean;
    // any other fields you might have
}

// This function can be marked 'async' if using 'await' inside
export function middleware(request: NextRequest){

    let isAdmin = false;
    const path = request.nextUrl.pathname
    const isPublicPath = ['/login','/signup', '/verifyemail'].includes(path)
    const adminOnlyPaths = ['/products', '/addproduct'].includes(path);

    const token = request.cookies.get('token')?.value || ''
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload;
    
            if (typeof decodedToken !== 'string' && decodedToken.hasOwnProperty('isAdmin')) {
                isAdmin = (decodedToken as MyJwtPayload).isAdmin;
            }
    
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (adminOnlyPaths && !isAdmin) {
        // Redirect non-admin users somewhere else, e.g., the profile page or an error page
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
