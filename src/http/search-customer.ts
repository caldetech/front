import { Customer } from "@/schemas/customer";

export async function searchCustomer({
  slug,
  query,
}: {
  slug: string;
  query: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/customers/search`;

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
      throw new Error(errorData.message || "Erro ao buscar clientes");
    }

    const data = await response.json();
    return data as Customer[];
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return [];
  }
}
