"use server";

import { z } from "zod";
import { passwordRecover } from "@/http/password-recover";

const PasswordRecoverSchema = z.object({
  email: z.string().email({
    message: "Endereço de e-mail inválido.",
  }),
});

export async function passwordRecoverAction(data: FormData) {
  const result = PasswordRecoverSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      success: false,
      message: null,
      errors,
    };
  }

  const { email } = result.data;

  await passwordRecover({ email });

  return {
    success: true,
    message: null,
    errors: null,
  };
}
