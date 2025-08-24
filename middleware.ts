import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  console.log('Middleware executado!')
  console.log('Path:', request.nextUrl.pathname)
  console.log('Token:', token)

  if (!token && request.nextUrl.pathname.startsWith('/administrative')) {
    console.log('Redirecionando para login-page')
    return NextResponse.redirect(new URL('/login-page', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/administrative/:path*'],
}
