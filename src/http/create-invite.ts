"use server";

import { api } from "../lib/api-client";

interface createInviteProps {
  slug?: string;
  email: string;
  role: string;
}

export async function createInvite({
  slug = "caldetech",
  email,
  role,
}: createInviteProps) {
  try {
    await api.post(`organizations/${slug}/invites`, {
      json: {
        email,
        role,
      },
    });

    return {
      success: true,
      message: "Convite criado com sucesso!",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Erro ao criar o convite.",
    };
  }
}
