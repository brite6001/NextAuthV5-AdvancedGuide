"use server";

import { LoginSchema } from "@/schemas";

interface LoginResponse {
  error?: string;
  success?: string;
  twoFactor?: boolean;
}

export const login = async (
  formData: FormData,
  callbackUrl?: string | null
): Promise<LoginResponse> => {
  try {
    const values = Object.fromEntries(formData.entries());
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid credentials" };
    }

    const { email, password, code } = validatedFields.data;

    return {success: "Login exitoso"};
  } catch (error) {
    return { error: "Invalid credentials" };
  }
};
