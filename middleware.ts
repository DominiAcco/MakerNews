import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthService } from './lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log(`🛡️ Middleware executando para: ${pathname}`);
  
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = [
    '/login', 
    '/register', 
    '/api/auth/login', 
    '/api/register',
    '/api/test',
    '/debug-auth',
    '/test-cookies'
  ];
  
  // Se for uma rota pública, permita o acesso
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    console.log(`✅ Rota pública: ${pathname}`);
    return NextResponse.next();
  }

  // Verificar autenticação para rotas protegidas
  const token = request.cookies.get('token')?.value;

  console.log(`🔐 Token presente: ${!!token}`);
  if (token) {
    console.log(`🔐 Token length: ${token.length}`);
  }

  if (!token) {
    console.log(`❌ Token não encontrado para: ${pathname}`);
    
    // Se for API, retorne JSON error
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    // Se for página, redirecione para login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = await AuthService.verifyToken(token); // Agora é async
    console.log(`✅ Token válido para: ${pathname}, usuário: ${payload.email}`);
    return NextResponse.next();
  } catch (error: any) {
    console.log(`❌ Token inválido para: ${pathname}, erro: ${error.message}`);
    
    // Se for API, retorne JSON error
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    
    // Se for página, redirecione para login
    const response = NextResponse.redirect(new URL('/login', request.url));
    // Limpar cookie inválido
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/publications/:path*',
    '/api/auth/me'
  ]
}