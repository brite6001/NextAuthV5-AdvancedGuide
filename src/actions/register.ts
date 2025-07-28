"use server";

import * as argon2 from "argon2";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data";
import prisma from "@/lib/prisma";

interface RegisterResponse {
  error?: string;
  success?: string;
}

export const register = async (
  formData: FormData
): Promise<RegisterResponse> => {
  try {
    const values = Object.fromEntries(formData.entries());
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid credentials" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await argon2.hash(password);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "El usuario ya existe" };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: Send verification token email

    return { success: "Registro exitoso" };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Error al registrar el usuario",
    };
  }
};
