// Utilizando fetch diretamente
export const api = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>), // Preserva os headers existentes (caso haja algum)
  };

  // Se o token existir, adiciona o Authorization header
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: options.method || "GET", // Define o método HTTP (GET por padrão)
    headers,
    credentials: "include", // Envia os cookies com a requisição
    body: options.body || undefined, // Adiciona o corpo da requisição (caso exista)
  });

  // Verifica se a resposta foi bem-sucedida
  if (!response.ok) {
    throw new Error(`Erro ao fazer a requisição: ${response.statusText}`);
  }

  const data: T = await response.json();
  return data;
};
