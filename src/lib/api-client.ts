export const api = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  // Cabeçalhos padrão, incluindo o "Authorization" se o token for encontrado
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Ajustando as opções, utilizando "GET" como método padrão
  const fetchOptions: RequestInit = {
    ...options,
    method: options.method || "GET", // Define o método HTTP (GET por padrão)
    headers: {
      ...defaultHeaders,
      ...options.headers, // Mescla os cabeçalhos passados
    },
    credentials: "include", // Envia cookies com a requisição
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    // Só tenta fazer .json() se o método for GET ou o corpo da resposta existir
    if (fetchOptions.method === "GET") {
      const data: T = await response.json();
      return data;
    }

    // Caso o método não seja GET (POST, PUT, etc.), retornamos uma resposta em formato JSON
    return (await response.json()) as T;
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
    throw error;
  }
};
