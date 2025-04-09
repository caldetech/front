"use server";

import { newPassword } from "@/http/new-password";
import { z } from "zod";

const passwordRecoverSchema = z
  .object({
    tokenId: z.string(),
    password: z.string().min(6, {
      message: "A senha deve ter pelo menos 6 caracteres.",
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não correspondem",
    path: ["password_confirmation"],
  });

export async function newPasswordAction(data: FormData) {
  const result = passwordRecoverSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      success: false,
      message: null,
      errors,
    };
  }

  const { tokenId, password } = result.data;

  await newPassword({
    tokenId,
    password,
  });

  return {
    success: true,
    message: null,
    errors: null,
  };
}
