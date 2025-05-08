import type { BlingTokensSchema } from "@/schemas/bling-tokens";

export async function getBlingTokens({
  code,
  state,
}: {
  code: string;
  state: string;
}): Promise<BlingTokensSchema> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/bling/get-tokens`;

  const requestBody = JSON.stringify({ code, state });

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
      throw new Error(errorData.message || "Erro ao obter os tokens do Bling");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter os tokens do Bling:", error);
    throw error;
  }
}
