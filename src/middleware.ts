import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import axios from 'axios';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup' || path === '/'
  const accessToken = request.cookies.get('at')?.value || ''

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/application'
  ],
}