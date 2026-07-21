import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Bộ nhớ cache đơn giản trong bộ nhớ cho Rate Limiting (In-Memory Sliding Window)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Cấu hình Rate Limit: Tối đa 60 request mỗi 1 phút cho mỗi IP
const LIMIT = 60;
const WINDOW_MS = 60 * 1000; // 1 phút

export function middleware(request: NextRequest) {
  const ip = (request as any).ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();

  const userRate = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userRate.lastReset > WINDOW_MS) {
    userRate.count = 1;
    userRate.lastReset = now;
  } else {
    userRate.count += 1;
  }

  rateLimitMap.set(ip, userRate);

  // Nếu vượt quá giới hạn request
  if (userRate.count > LIMIT) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.'
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        }
      }
    );
  }

  const response = NextResponse.next();

  // Đính kèm các Security Headers tự động cho tất cả các response
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    /*
     * Áp dụng middleware cho tất cả các route ngoại trừ static files và images
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
