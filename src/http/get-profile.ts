import type { UserProfileProps } from "@/types/user-profile";
import { api } from "../lib/api-client";
import type { User } from "@/utils/casl/user";

export async function getProfile(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`;

  const requestBody = JSON.stringify({
    slug,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Envia as credenciais (cookies) com a requisição
      body: requestBody,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao obter perfil");
    }

    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("Erro ao obter o perfil:", error);
    throw error;
  }
}
