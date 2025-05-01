import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token; // O token já está disponível no req.nextauth.token
    const pathname = req.nextUrl.pathname;

    // Permitir acesso às páginas de login
    if (
      pathname.startsWith("/auth/signin") ||
      pathname.startsWith("/adm/signin")
    ) {
      return NextResponse.next();
    }

    // Se o token existir e o usuário for ADMIN, permite o acesso
    if (token && token.role === "ADMIN") {
      return NextResponse.next();
    }

    // Se a rota for "/adm" e o usuário não for ADMIN, redireciona para /unauthorized
    if (pathname.startsWith("/adm") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Se não houver token ou role, redireciona para login
    return NextResponse.redirect(new URL("/adm/signin", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Garante que o token existe
    },
  }
);

export const config = {
  matcher: ["/adm/:path*"], // Protege todas as rotas que começam com "/adm"
};
