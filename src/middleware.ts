import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * 权限中间件
 * 
 * 功能：
 * - 保护管理后台路由 (/admin/*)
 * - 保护编辑路由 (/editor/*)
 * - 保护API端点 (/api/admin/*)
 */
export async function middleware(request: NextRequest) {
  // NextAuth JWT 密钥
  const secret = process.env.NEXTAUTH_SECRET;

  // 获取当前会话令牌
  const token = await getToken({ req: request, secret });
  
  // 获取当前请求路径
  const { pathname } = request.nextUrl;
  
  // 检查是否为管理后台路由
  if (pathname.startsWith('/admin')) {
    // 如果没有登录或不是管理员，重定向到登录页
    if (!token || token.role !== 'admin') {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      url.searchParams.set('error', 'AccessDenied');
      return NextResponse.redirect(url);
    }
  }
  
  // 检查是否为编辑器路由
  if (pathname.startsWith('/editor')) {
    // 如果没有登录或不是编辑者或管理员，重定向到登录页
    if (!token || (token.role !== 'editor' && token.role !== 'admin')) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      url.searchParams.set('error', 'AccessDenied');
      return NextResponse.redirect(url);
    }
  }

  // 检查是否为管理API端点
  if (pathname.startsWith('/api/admin')) {
    // 如果不是管理员，返回权限不足错误
    if (!token || token.role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ success: false, message: '权限不足' }),
        { 
          status: 403,
          headers: { 'content-type': 'application/json' }
        }
      );
    }
  }

  return NextResponse.next();
}

/**
 * 配置中间件匹配的路由
 */
export const config = {
  matcher: [
    '/admin/:path*',
    '/editor/:path*',
    '/api/admin/:path*'
  ],
}; 