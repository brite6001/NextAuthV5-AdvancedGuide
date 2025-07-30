"use server";

import { getUserByEmail, getVerificationTokenByToken } from "@/data";
import prisma from "@/lib/prisma";

// Función que recibe un token y realiza la verificación del email
export const newVerification = async (token: string) => {
  // 1. Busca el token de verificación en la base de datos
  const existingToken = await getVerificationTokenByToken(token);

  // 2. Si el token no existe, retornamos un error
  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  // 3. Verifica si el token ha expirado comparando la fecha de expiración con la fecha actual
  const hasExpired = new Date(existingToken.expires) < new Date();

  // 4. Si el token ya expiró, retornamos un error
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // 5. Busca al usuario en la base de datos usando el email que estaba asociado al token
  const existingUser = await getUserByEmail(existingToken.email);

  // 6. Si no existe un usuario con ese email, retornamos un error
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  // 7. Si todo está bien, actualizamos el usuario:
  // - Marcamos su email como verificado (emailVerified = ahora)
  // - (Opcional) También actualizamos su email por el del token, por si cambió
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  // 8. Eliminamos el token de verificación para que no pueda reutilizarse
  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  // 9. Finalmente, retornamos un mensaje de éxito
  return { success: "Email verificado!" };
};
