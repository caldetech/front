export async function getBlingAuthorizeUrl({
  slug,
}: {
  slug: string;
}): Promise<{ url: string }> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/bling/get-authorize-url`;

  const requestBody = JSON.stringify({ slug });

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
      throw new Error(
        errorData.message || "Erro ao obter a URL de autorização"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter a URL de autorização:", error);
    throw error;
  }
}
