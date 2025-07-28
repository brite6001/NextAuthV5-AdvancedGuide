"use server";

import { RegisterSchema } from "@/schemas";

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

    const { email, password } = validatedFields.data;

    return {success: "Registro exitoso"};
  } catch (error) {
    return { error: "Invalid credentials" };
  }
};
