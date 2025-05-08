import { CreateUserProps } from "@/types/create-user";

export async function createUser({
  name,
  email,
  tokenId,
  password,
  inviteId,
}: CreateUserProps) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/register`;

  const requestBody = JSON.stringify({
    name,
    email,
    password,
    inviteId,
    tokenId,
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
      throw new Error(errorData.message || "Erro ao criar o usuário");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error; // Relança o erro para ser tratado em outra parte do código
  }
}
