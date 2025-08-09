import { NextResponse } from 'next/server';

export function middleware(request) {
  // 获取请求路径
  const path = request.nextUrl.pathname;
  
  // 检查是否是管理员路径
  if (path.startsWith('/admin')) {
    // 这里应该添加真正的认证逻辑
    // 例如，检查用户是否已登录并且是管理员
    // 现在我们只是简单地允许所有访问，但在生产环境中应该更严格
    
    // 如果需要重定向到登录页面，可以使用以下代码：
    // return NextResponse.redirect(new URL('/login', request.url));
    
    // 现在我们只是允许访问
    return NextResponse.next();
  }
  
  // 对于非管理员路径，直接允许访问
  return NextResponse.next();
}

// 配置中间件应该匹配的路径
export const config = {
  matcher: ['/admin/:path*'],
};