import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token && request.nextUrl.pathname.startsWith('/administrative')) {
    return NextResponse.redirect(new URL('/login-page', request.url))
  }

  return NextResponse.next()
}
