import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "@/lib/prisma";
import { getUserById } from "@/data";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma), // Usa Prisma como adaptador para guardar usuarios/sesiones
  session: { strategy: "jwt" }, // La session se guarda en un JWT (JSON Web Token) en vez de una db
  ...authConfig, // Añade los proveedores definidos en `auth.config.ts`

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // La función linkAccount dentro del objeto events se usa en el flujo de autenticación con NextAuth.js 
  // y se ejecuta automáticamente cuando un usuario vincula una cuenta de autenticación externa (como Google, GitHub, etc.) a su perfil existente.
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // Función que se ejecuta cuando un usuario intenta iniciar sesión
    // async signIn({ user }) {
    //   if (!user?.id) return false;

    //   const existingUser = await getUserById(user.id);

    //   //  // Si el usuario no tiene el email verificado, no permitimos el inicio de
    //   if (!existingUser || !existingUser.emailVerified) return false;
    //   return true;
    // },

    // Este callback se ejecuta cuando se crea o actualiza una sesión
    async session({ token, session }) {
      // Si existe token.sub (id del usuario) y session.user, se asigna el id
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // Si el token tiene un role y hay un session.user, lo agrega a la sesión
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      // Este bloque asegura que los campos esenciales estén siempre disponibles
      if (session.user) {
        session.user.id = token.sub!; // Forzamos que `sub` existe con "!"
        session.user.name = token.name ?? ""; // Si `token.name` es null/undefined, usamos ""
        session.user.email = token.email ?? "";
        session.user.role = token.role as UserRole; // Convertimos role del token al tipo de Prisma
      }

      return session; // Retornamos la sesión modificada
    },

    // Este callback se ejecuta cuando se crea o actualiza el JWT
    async jwt({ token }) {
      // Si no hay token.sub (el id del usuario), retornamos el token sin modificar
      if (!token.sub) return token;

      // Buscamos el usuario real en la base de datos usando el ID
      const existingUser = await getUserById(token.sub);

      // Si no se encuentra el usuario, no modificamos el token
      if (!existingUser) return token;

      // Añadimos al token los campos personalizados para usarlos luego en la sesión
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token; // Retornamos el token modificado
    },
  },
});
