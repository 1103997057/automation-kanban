import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  return NextResponse.next(); // 直接放行所有请求，不加身份校验
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};