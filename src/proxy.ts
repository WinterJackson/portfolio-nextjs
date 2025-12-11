import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Next.js 16+ convention: 'proxy.ts' instead of 'middleware.ts'
export async function proxy(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    const pathname = request.nextUrl.pathname
    const isAdminRoute = pathname.startsWith('/admin')
    const isLoginPage = pathname === '/admin/login'
    const isApiAuthRoute = pathname.startsWith('/api/auth')

    // Allow API auth routes
    if (isApiAuthRoute) {
        return NextResponse.next()
    }

    // Redirect to login if accessing protected admin routes without token
    if (isAdminRoute && !token && !isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Redirect to admin dashboard if logged in and trying to access login page
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}

// Ensure default export is also provided if supported/required
export default proxy

export const config = {
    matcher: ['/admin/:path*'],
}
