export async function newPassword({
  tokenId,
  password,
}: {
  tokenId: string;
  password: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/new-password`;

  const requestBody = JSON.stringify({
    tokenId,
    password,
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
      throw new Error(errorData.message || "Erro ao atualizar a senha");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar a senha:", error);
    throw error;
  }
}
