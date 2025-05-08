export async function passwordRecover({ email }: { email: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/password-recover`;

  const requestBody = JSON.stringify({
    email,
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
      throw new Error(errorData.message || "Erro ao recuperar a senha");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao recuperar a senha:", error);
    throw error;
  }
}
