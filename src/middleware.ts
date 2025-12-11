import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === '/admin/login'
    const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth')

    // Allow API auth routes
    if (isApiAuthRoute) {
        return NextResponse.next()
    }

    // Redirect to login if accessing admin routes without auth
    if (isAdminRoute && !isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }

    // Redirect to admin dashboard if logged in and accessing login page
    if (isLoginPage && isLoggedIn) {
        return NextResponse.redirect(new URL('/admin', req.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
}
