import type { Employee } from "@/schemas/employee";

export async function searchEmployee({
  slug,
  query,
}: {
  slug: string;
  query: string;
}): Promise<Employee[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/members/search`;

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
      throw new Error(errorData.message || "Erro ao buscar funcionários");
    }

    const data = await response.json();
    return data as Employee[];
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    return [];
  }
}
