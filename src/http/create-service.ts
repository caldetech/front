"use server";

export async function createService({
  slug,
  title,
  description,
  price,
}: {
  slug: string;
  title: string;
  description?: string;
  price: number;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/services/create`;

  const requestBody = JSON.stringify({
    slug,
    title,
    description,
    price,
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
      return errorData; // Retorna a resposta de erro, se houver
    }

    const data = await response.json();

    return {
      success: true,
      message: "Serviço criado com sucesso!",
      data,
    };
  } catch (error) {
    console.error("Erro ao criar serviço:", error);

    return {
      success: false,
      message: "Erro ao criar o serviço.",
    };
  }
}
