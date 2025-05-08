"use server";

import type { Role } from "@/schemas/role";

interface createInviteProps {
  email: string;
  role: Role;
  slug: string;
}

export async function createInvite({ email, role, slug }: createInviteProps) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/invite/create`;

  const requestBody = JSON.stringify({
    email,
    role,
    slug,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Certificando-se de enviar as credenciais
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar convite: ${response.statusText}`);
    }

    return {
      success: true,
      message: "Convite criado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao criar convite:", error);

    return {
      success: false,
      message: "Erro ao criar o convite.",
    };
  }
}
