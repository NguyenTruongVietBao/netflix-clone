// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Define paths that you want to protect
const protectedPaths = ["/*",];

export async function middleware(req) {
    // Extract the token from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if the request path is protected and if the token is missing
    const { pathname } = req.nextUrl;

    if (protectedPaths.some(path => pathname.startsWith(path))) {
        if (!token) {
            // If the user is not authenticated, redirect to the login page
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // Proceed if the user is authenticated or the route is not protected
    return NextResponse.next();
}

// Apply middleware to the protected paths
export const config = {
    matcher: ['/'],  // Match routes to apply middleware
};



// import { auth } from "@/auth"
//
// export default auth((req) => {
//     // req.auth
// })
//
// // Optionally, don't invoke Middleware on some paths
// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }
