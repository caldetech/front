import type { BlingTokensSchema } from "@/schemas/bling-tokens";
import { api } from "../lib/api-client";

export async function getValidAccessToken({ slug }: { slug: string }): Promise<
  | BlingTokensSchema
  | {
      message: string;
      success: boolean;
    }
  | undefined
> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/bling/get-valid-access-token`;

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
      return {
        success: false,
        message: errorData.message || "Erro ao obter token de acesso válido",
      };
    }

    const data = await response.json();
    return data as BlingTokensSchema;
  } catch (error) {
    console.error("Erro ao obter o token de acesso válido:", error);
    return undefined;
  }
}
