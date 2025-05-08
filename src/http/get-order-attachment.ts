export async function getOrderAttachmentById(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/attachments/get-by-id`;

  const requestBody = JSON.stringify({ id });

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
      throw new Error(errorData.message || "Erro ao obter o anexo da ordem");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter o anexo da ordem:", error);
    throw error;
  }
}
