import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req; // Obtiene la URL de la solicitud
  const isLoggedIn = !!req.auth; // Verifica si el usuario está autenticado

  // Detecta si la ruta es una API de autenticación (por ejemplo, /api/auth/*)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Detecta si la ruta es pública (p.ej. /, /about, /contact)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Detecta si la ruta es una página de login o registro
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Si es una ruta de API de autenticación, no hacemos nada (permitir acceso)
  if (isApiAuthRoute) return null;

  // Si la ruta actual es una página de autenticación (por ejemplo: /login, /register)
  if (isAuthRoute) {
    // Y el usuario ya está autenticado...
    if (isLoggedIn) {
      // ...redirigilo al dashboard (o ruta protegida por defecto)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    // Si el usuario no está logueado, permitile acceder a la página de autenticación
    return null;
  }

  // Si el usuario NO está logueado y la ruta actual NO es pública
  if (!isLoggedIn && !isPublicRoute) {
    // Guardamos la URL original que intentaba visitar el usuario (para volver luego del login)
    let callbackUrl = nextUrl.pathname;

    // Si hay parámetros en la URL (query string), los incluimos también
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    // Codificamos la URL de retorno para evitar errores en el query param
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    // Redirigimos al login, incluyendo en el query param `callbackUrl` la página original
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
