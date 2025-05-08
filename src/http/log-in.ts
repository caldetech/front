export async function LogIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string }> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/log-in`;

  const requestBody = JSON.stringify({
    email,
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
      throw new Error(errorData.message || "Erro ao realizar login");
    }

    const data = await response.json();
    return data as { token: string };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}
