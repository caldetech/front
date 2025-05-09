"use server";

import type { Role } from "@/schemas/role";
import { api } from "../lib/api-client";

export async function createInvite({
  email,
  role,
  slug,
  token,
}: {
  email: string;
  role: Role;
  slug: string;
  token: string | null;
}) {
  try {
    await api.post("invite/create", {
      json: {
        email,
        role,
        slug,
      },
      hooks: {
        beforeRequest: [
          (request) => {
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          },
        ],
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
