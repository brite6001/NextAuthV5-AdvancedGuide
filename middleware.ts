import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Detecta si la ruta es una API de autenticación
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  
  // Detecta si la ruta es pública
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  
  // Detecta si la ruta es una página de autenticación
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // 1. Permitir todas las rutas de API de autenticación
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // 2. Si está en página de auth y ya está logueado -> redirigir al dashboard
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Si no está logueado y la ruta no es pública -> redirigir al login
  if (!isLoggedIn && !isPublicRoute) {
    // Construir callback URL completa
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    // Crear URL de login con callback
    const loginUrl = new URL("/auth/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  // 4. En todos los otros casos, continuar
  return NextResponse.next();
});

// Configuración optimizada del matcher
export const config = {
  // Excluir archivos estáticos, _next, y favicon
  matcher: [
    /*
     * Coincide con todas las rutas de solicitud excepto las que comienzan con:
     * - api (rutas API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     * - archivos con extensión (imágenes, css, js, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).+)",
    // Incluir rutas específicas que necesitan middleware
    "/",
    "/(api|trpc)(.*)"
  ],
};