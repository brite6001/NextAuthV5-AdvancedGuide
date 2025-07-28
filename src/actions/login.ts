"use server";

import * as argon2 from "argon2";
import { getUserByEmail } from "@/data";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@root/routes";
import { signIn } from "@root/auth";
import { AuthError } from "next-auth";

interface LoginResponse {
  error?: string;
  success?: string;
  twoFactor?: boolean;
}

export const login = async (
  formData: FormData,
  callbackUrl?: string | null
): Promise<LoginResponse> => {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Credenciales invalidas" };
  }

  const { email, password } = validatedFields.data;
  // const existingUser = await getUserByEmail(email);

  // if (!existingUser || !existingUser.email || !existingUser.password) {
  //   return { error: "Email no existe!" };
  // }

  // const passwordMatch = await argon2.verify(existingUser.password, password);

  // if (!passwordMatch) {
  //   return { error: "Contraseña incorrecta" };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login Sucess!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
