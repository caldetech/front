"use server";

import { z } from "zod";
import { LogIn } from "@/http/log-in";
import { HTTPError } from "ky";

const signInSchema = z.object({
  email: z.string().email({
    message: "Please, provide a valid e-mail address.",
  }),
  password: z.string().min(1, {
    message: "Please, provide your password.",
  }),
});

export async function LogInAction(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      success: false,
      message: null,
      errors,
    };
  }

  const { email, password } = result.data;

  try {
    const { message, tokens } = await LogIn({
      email,
      password,
    });

    console.log(tokens);

    return {
      success: true,
      message: message ?? "Login realizado com sucesso!",
      errors: null,
    };
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return {
        success: false,
        message,
        errors: null,
      };
    }

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    };
  }
}
