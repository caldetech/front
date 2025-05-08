import type { Product } from "@/schemas/products";

export async function searchProduct({
  slug,
  query,
}: {
  slug: string;
  query: string;
}): Promise<Product[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/bling/search`;

  const requestBody = JSON.stringify({
    slug,
    query,
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
      throw new Error(errorData.message || "Erro ao buscar produtos");
    }

    const data = await response.json();
    return data as Product[];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}
