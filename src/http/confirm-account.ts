"use server";

export async function confirmAccount({ tokenId }: { tokenId: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/confirm-account`;

  const requestBody = JSON.stringify({ tokenId });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Garantindo que as credenciais sejam enviadas
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`Erro ao confirmar o usuário: ${response.statusText}`);
    }

    return {
      success: true,
      message: "Usuário confirmado com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao confirmar usuário:", error);

    return {
      success: false,
      message: "Erro ao confirmar o usuário.",
    };
  }
}
