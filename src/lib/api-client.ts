export const api = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    ...options,
    method: options.method || "GET", // Define o método HTTP (GET por padrão)
    headers: {
      ...defaultHeaders,
      ...options.headers, // Mescla cabeçalhos passados
    },
    credentials: "include", // Envia cookies com a requisição
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
    throw error;
  }
};
