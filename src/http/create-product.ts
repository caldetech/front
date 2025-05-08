"use server";

interface createProductProps {
  slug?: string;
  title: string;
  description?: string;
  costPrice: number;
  salesPrice: number;
  stock: number;
}

export async function createProduct({
  slug = "caldetech",
  title,
  description,
  costPrice,
  salesPrice,
  stock,
}: createProductProps) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${slug}/products`;

  const requestBody = JSON.stringify({
    title,
    description,
    costPrice,
    salesPrice,
    stock,
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

    return {
      success: true,
      message: "Produto criado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    return {
      success: false,
      message: "Erro ao criar o produto.",
    };
  }
}
